
import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View, Alert, Button, ImageBackground } from 'react-native';
import Util from './utils';
import TouchID from 'react-native-touch-id';

class Main extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>You are in Day4</Text>
      </View>
    );
  }
}

class RequireTouchID extends Component {
  constructor() {
    super();
    this.state = {
      enterApp: false
    }
  }

  componentDidMount() {
    this._touchID();
  }

  _enterPassword() {
    this.setState({
      enterApp: true,
    });
  }

  _touchID = () => {
    const optionalConfigObject = {
      color: "red"
    };

    TouchID.authenticate('Unlock Day4', optionalConfigObject)
      .then(success => {
        console.log(success);
        this.setState({
          enterApp: true,
        })
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
  };

  render() {
    return (
      <ImageBackground source={require('./image/bg2.jpg')}  style={styles.container}>
        {
          this.state.enterApp ?
            <Main /> :
            <Button onPress={() => this._touchID()} title="TouchID to unlock" style={styles.button}/>
        }
      </ImageBackground>
    );
  }
}

export default class Day4 extends Component {

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <RequireTouchID />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: Util.size.height,
    width: Util.size.width,
    flex:1,
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    height: Util.size.height,
    width: Util.size.width,
  },
  text: {
    fontSize: 30,
    color: "#000"
  },
  button: {
    width: Util.size.width / 2
  }
});

