import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Provider from './components//Provider';
import store from './store';
import ConnectedComponent from './components/ConnectedComponent';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedComponent />
  </Provider>,
  document.getElementById('root')
);
