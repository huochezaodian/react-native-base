
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ImageBackground } from 'react-native';

export default class HomeScreen extends React.Component {
  state = {
    bgSource: require('./bg3.png')
  }
  static navigationOptions = {
    title: 'Home',
  }
  render() {
    console.log(this.props);
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={this.state.bgSource}
        style={styles.backgroundImage}
      >
        <TouchableOpacity 
          onPress={() =>
            navigate('Profile', { name: 'Jane' })
          }
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go to Jane's profile</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  backgroundImage: {
    flex:1
  }
})