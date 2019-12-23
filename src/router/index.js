import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../pages/home';
import DetailScreen from '../pages/detail';
import Login from '../pages/login';

const main = createStackNavigator(
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

export default createBottomTabNavigator(
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
