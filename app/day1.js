
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet, Text, View, ImageBackground, BackHandler } from 'react-native';
import Util from './utils';
import PasswordGesture from 'react-native-gesture-password';
import FadeInView from './FadeInView';

export class EnterPassword extends Component {
  static propTypes = {
    password: PropTypes.string.isRequired,
    enterPassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: this.props.password,
      message: 'Unlock with your password.',
      status: 'normal',
    };
  }

  onEnd(password) {
    if (password === this.state.password) {
      this.setState({
        status: 'right',
        message: 'Password is right, success.'
      });
      this.props.enterPassword();
    } else {
      this.setState({
        status: 'wrong',
        message: 'Password is wrong, try again.'
      });
    }
  }

  onStart() {
    this.setState({
      status: 'normal',
      message: 'Unlock your password.'
    });
  }

  render() {
    return (
      <PasswordGesture
        style={styles.setPg}
        ref='pg'
        status={this.state.status}
        message={this.state.message}
        allowCross={true}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
      />
    );
  }
}

class SetPassword extends Component {
  static propTypes = {
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: this.props.password,
      message: 'Please set your password.',
      status: 'normal',
      count: 1,
    };
  }

  onEnd(password) {
    if (this.state.password === '') {
      this.state.password = password;
      this.setState({
        status: 'normal',
        message: 'Please input your password secondly.',
        count: 2
      });
    } else {
      if (password === this.state.password) {
        this.setState({
          status: 'right',
          message: 'Your password is set',
        });
        this.props.setPassword(password);
      } else {
        this.setState({
          status: 'wrong',
          message: 'Not the same, try again.',
        });
      }
    }
  }

  onStart() {
    if (this.state.password === '') {
      this.setState({
        message: 'Please set your password.',
      });
    } else {
      this.setState({
        message: 'Please input your password secondly.',
      });
    }
  }

  render() {
    return (
      <PasswordGesture
        key={this.state.count}
        style={styles.setPg}
        ref='pg'
        status={this.state.status}
        message={this.state.message}
        allowCross={true}
        onStart={() => this.onStart()}
        onEnd={(password) => this.onEnd(password)}
      />
    );
  }
}

export default class Day1 extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      hasSet: false,
      enterApp: false,
    };
  }

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  _setPassword(password) {
    this.setState({
      password,
      hasSet: true,
    })
  }

  _enterPassword() {
    this.setState({
      enterApp: true,
    });
  }

  render() {
    const { hasSet, enterApp, password } = this.state;
    return (
      <FadeInView>
        <ImageBackground source={require('./image/bg3.png')} style={styles.container}>
          <StatusBar hidden />
          {hasSet ? <View></View> : <SetPassword setPassword={password => this._setPassword(password)} password={password} />}
          {hasSet && !enterApp ? <EnterPassword enterPassword={() => this._enterPassword()} password={password} /> : <View></View>}
          {enterApp ? <View style={styles.app}><Text style={styles.appText}>You are in the app!</Text></View> : <View></View>}
        </ImageBackground >
      </FadeInView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: Util.size.height,
    width: Util.size.width,
  },
  setPg: {
    backgroundColor: "transparent",
  },
  app: {
    backgroundColor: "transparent",
    height: Util.size.height,
    width: Util.size.width,
    alignItems: "center",
    justifyContent: "center",
  },
  appText: {
    color: "#fff",
    fontSize: 25,
  }
});

