import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../pages/home';
import DetailScreen from '../pages/detail';
import Login from '../pages/login';

const main = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createSwitchNavigator(
  {
    Main: {
      screen: main,
    },
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Login',
  }
);
