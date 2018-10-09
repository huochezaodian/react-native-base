
import React, { Component } from 'react';
import { StyleSheet, LayoutAnimation, Text, PanResponder, View } from 'react-native';
import Util from './utils';
import { navs } from './constant';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

class Sortable extends Component {
  constructor() {
    super();
    this._width = Util.size.width / 3;
    this.topIndex = 0;
    this.leftIndex = 0;
    this.index = 0;
    this.finalTopIndex = 0;
    this.finalLeftIndex = 0;
    this.finalIndex = 0;
    this.maxTopIndex = Math.floor(navs.length / 3);
    this.prev_left = 0;
    this.prev_top = 0;
    this.left = 0;
    this.top = 0;
    this.animations = {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.7,
      },
    };
    // last item to be selected as default
    this.state = {
      selected: 14,
      days: [...navs]
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dx !== 0 || gestureState.dx !== 0;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        console.log('onPanResponderGrant');
        const { pageX, pageY } = evt.nativeEvent;
        //30 to be offset
        this.topIndex = Math.floor((pageY - 30) / this._width);
        this.leftIndex = Math.floor((pageX) / this._width);
        this.index = this.topIndex * 3 + this.leftIndex;
        this.prev_left = this._width * this.leftIndex;
        this.prev_top = this._width * this.topIndex;
        this.setState({
          selected: this.index,
        });
        let box = this.refs["box" + this.index];
        box.setNativeProps({
          style: {
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowOffset: {
              height: 0,
              width: 2
            }
          },
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log('onPanResponderMove');
        this.left = this.prev_left + gestureState.dx;
        this.top = this.prev_top + gestureState.dy;
        let box = this.refs["box" + this.index];
        if (!box) return;
        box.setNativeProps({
          style: { top: this.top, left: this.left },
        });
        this._endMove(evt, gestureState)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this._release(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) => this._release(evt, gestureState),
      onShouldBlockNativeResponder: (event, gestureState) => true,
    });
  }

  _endMove(evt, gestureState) {
    this.finalTopIndex = Math.floor(this.top / this._width + 0.5);
    this.finalLeftIndex = Math.floor(this.left / this._width + 0.5);
    let maxLenth = this.finalTopIndex * 3 + this.finalLeftIndex + 1;
    if ((-1 < this.finalTopIndex) && (this.finalTopIndex <= this.maxTopIndex) && (-1 < this.finalLeftIndex) && this.finalLeftIndex < 3 && maxLenth <= this.state.days.length) {
      this.finalIndex = this.finalTopIndex * 3 + this.finalLeftIndex;

      if (this.finalIndex != this.index) {
        let days = this.state.days;
        let movedBox = days[this.index];
        days.splice(this.index, 1);
        days.splice(this.finalIndex, 0, movedBox);
        this.index = this.finalIndex;
        this.topIndex = this.finalTopIndex;
        this.leftIndex = this.finalLeftIndex;
        this.setState({
          selected: this.finalIndex,
          days
        });
      }
      LayoutAnimation.configureNext(this.animations);
    } else {
      let box = this.refs["box" + this.index];
      let top = this.topIndex * this._width;
      let left = this.leftIndex * this._width;
      LayoutAnimation.configureNext(this.animations);
    }
  }

  _release(evt, gestureState) {
    const shadowStyle = {
      shadowColor: "#000",
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
        width: 0,
      }
    };
    let maxLenth = this.finalTopIndex * 3 + this.finalLeftIndex + 1;
    if ((-1 < this.finalTopIndex) && (this.finalTopIndex <= this.maxTopIndex) && (-1 < this.finalLeftIndex) && this.finalLeftIndex < 3 && maxLenth <= this.state.days.length) {
      let box = this.refs["box" + this.finalIndex];
      let top = this.finalTopIndex * this._width;
      let left = this.finalLeftIndex * this._width;
      box.setNativeProps({
        style: { top, left, ...shadowStyle },
      });
      LayoutAnimation.configureNext(this.animations);
    } else {
      let box = this.refs["box" + this.index];
      let top = this.topIndex * this._width;
      let left = this.leftIndex * this._width;
      box.setNativeProps({
        style: { top, left, ...shadowStyle },
      });
      LayoutAnimation.configureNext(this.animations);
    }
  }

  render() {
    const boxes = this.state.days.map((elem, index) => {
      let top = Math.floor(index / 3) * this._width;
      let left = (index % 3) * this._width;
      return (
        <View ref={"box" + index} {...this._panResponder.panHandlers} key={elem.key} style={[styles.touchBox, { top, left }]}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Day{index + 1}</Text>
            {elem.isFA ? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></IconFA> :
              <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></Icon>}
          </View>
        </View>
      );
    })

    let selectedItem = boxes[this.state.selected];
    boxes.splice(this.state.selected, 1);
    boxes.push(selectedItem);

    return (
      <View style={styles.touchBoxContainer}>
        {boxes}
      </View>
    );
  }
}

export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Sortable />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchBox: {
    width: Util.size.width / 3,
    height: Util.size.width / 3,
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    top: 0,
    borderWidth: Util.pixel,
    borderColor: "#ccc",
  },
  touchBoxContainer: {
    width: Util.size.width,
  },
  boxContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: Util.size.width / 3,
    height: Util.size.width / 3,
  },
  boxIcon: {
    position: "relative",
    top: -10
  },
  boxText: {
    position: "absolute",
    bottom: 15,
    width: Util.size.width / 3,
    textAlign: "center",
    left: 0,
    backgroundColor: "transparent"
  },
});

