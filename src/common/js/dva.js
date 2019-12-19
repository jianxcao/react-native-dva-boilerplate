import React from 'react';
import { create } from 'dva-core';
import { createLoading } from 'dva-loading';
import { connect } from 'react-redux';
export { connect };
export default options => {
  if (global.dvaApp) {
    return global.dvaApp;
  }
  const app = create(options);
  options.models = options.models || [];
  options.models.forEach(model => app.model(model));
  app.use(createLoading());
  app.start();
  const store = app._store;
  app.getStore = () => store;
  global.dvaApp = app;
  return app;
};
