import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, BackHandler, StatusBar } from 'react-native';
import Util from './utils';
import Swiper from 'react-native-swiper';

export default class Day2 extends Component {
  state = {
    images: [
      {
        key: 0,
        name: 'jinmuyan1',
        source: require("./image/bg1.jpg")
      },
      {
        key: 1,
        name: 'jinmuyan2',
        source: require("./image/bg2.jpg")
      },
      {
        key: 2,
        name: 'jinmuyan3',
        source: require("./image/bg3.png")
      },
      {
        key: 3,
        name: 'jinmuyan4',
        source: require("./image/bg4.jpg")
      },
    ]
  }

  componentWillMount() {
    StatusBar.setHidden(true);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    return (
      <Swiper height={150} showsButtons={false} autoplay={true} autoplayTimeout={3} bounces={true}
        activeDot={<View style={{ backgroundColor: 'rgba(255,255,255,0.8)', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
      >
        {
          this.state.images.map(image => <View style={styles.slide} key={image.key}>
            <Image style={styles.image} source={image.source}></Image>
            <Text style={styles.slideText}>{image.name}</Text>
          </View>)
        }
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  slideText: {
    position: "absolute",
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign: "center",
    fontSize: 12
  },
  image: {
    width: Util.size.width,
    height: Util.size.height,
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
  }
});