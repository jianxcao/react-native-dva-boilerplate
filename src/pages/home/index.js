import React from 'react';
import { View, Text } from 'react-native';
import NaviBar from 'react-native-pure-navigation-bar';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <>
        <NaviBar title='Home' leftElement={null} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
        </View>
      </>
    );
  }
}

export default HomeScreen;
