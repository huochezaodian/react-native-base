
import React, { Component } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Util from './utils';
import { navs } from './constant';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import Day1 from './day1';
import Day2 from './day2';
import Day3 from './day3';
import Day4 from './day4';
import Day5 from './day5';

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      days: navs
    }
  }

  _jumpToDay(index) {
    this.props.navigation.push(this.state.days[index].route);
  }

  render() {
    var onThis = this;
    var boxs = this.state.days.map(function (elem, index) {
      return (
        <TouchableHighlight key={elem.key} style={[styles.touchBox, index % 3 == 2 ? styles.touchBox2 : styles.touchBox1]} underlayColor="#eee" onPress={() => onThis._jumpToDay(index)}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}>Day{index + 1}</Text>
            {elem.isFA ? <IconFA size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></IconFA> :
              <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon, { color: elem.color }]}></Icon>}
          </View>
        </TouchableHighlight>
      );
    })
    return (
      <ScrollView title={this.props.title}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.touchBoxContainer}>
          {boxs}
        </View>
      </ScrollView>
    );
  }
}

export default createStackNavigator({
  Home: {
    screen: MainView,
    navigationOptions: {
      title: `${navs.length} days of rn`
    }
  },
  Day1: {
    screen: Day1,
    navigationOptions: {
      header: null
    }
  },
  Day2: {
    screen: Day2,
    navigationOptions: {
      header: null
    }
  },
  Day3: {
    screen: Day3,
    navigationOptions: {
      title: 'sortable'
    }
  },
  Day4: {
    screen: Day4,
    navigationOptions: {
      header: null
    }
  },
  Day5: {
    screen: Day5,
    navigationOptions: {
      title: 'tinder'
    }
  }
});

const styles = StyleSheet.create({
  touchBox: {
    width: Util.size.width / 3 - 0.33334,
    height: Util.size.width / 3,
    backgroundColor: "#fff",
  },
  touchBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor: "#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor: "#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor: "#ccc",
  },
  touchBox1: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor: "#ccc",
  },
  touchBox2: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor: "#ccc",
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
  }
});
