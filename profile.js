
import React from 'react';
import { Button } from 'react-native';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'profile',
  }
  render() {
    console.log(this.props);
    const { state, navigate } = this.props.navigation;
    return (
      <Button
        title={state.params.name || 'none'}
        onPress={() => 
          navigate('Home', { name: 'Home' })
        }
      />
    );
  }
}