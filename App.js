/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { getProvider } from '@/common/js/setting';
import router from '@/router';
import { createAppContainer } from 'react-navigation';

let App = () => {
  const Router = createAppContainer(router);
  return <Router />;
};
export default getProvider(<App />);
