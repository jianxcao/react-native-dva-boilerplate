import React from 'react';
import './ls';
import country from '@/config/country';
import './axiosConfig';
import { Provider } from 'react-redux';
import { I18n } from './i18n.js';
import initStore from './dva';
import models from '@/store';
// 初始化store
const app = initStore({
  models,
});

export function getProvider(component) {
  return function WrapperApp() {
    return (
      <Provider store={app.getStore()}>
        <I18n>{component}</I18n>
      </Provider>
    );
  };
}
