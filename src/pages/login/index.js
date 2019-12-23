import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import { ActivityIndicator, Button, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@/common/js/ls';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title='Sign in!' onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Home');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
