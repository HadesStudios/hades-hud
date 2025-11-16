import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'containers/App';

import WindowListener from 'containers/WindowListener';

import configureStore from './configureStore';

const initialState = {};
const store = configureStore(initialState);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <WindowListener>
        <App />
      </WindowListener>
    </Provider>,
    MOUNT_NODE,
  );
};

// global NUI error listener to prevent unhandled promise rejections from freezing
window.addEventListener('message', (ev) => {
  try {
    const d = ev.data;
    if (d && d.type === 'NUI_ERROR') {
      // log to console and dispatch a lightweight notification if store exists
      // keep this minimal to avoid extra dependencies
      // eslint-disable-next-line no-console
      console.warn('NUI error:', d.data);
      if (store && store.dispatch) {
        store.dispatch({ type: 'NOTIFICATION_ADD', payload: { message: `NUI error: ${d.data.event}`, status: 'error', timeout: 4000 } });
      }
    }
  } catch (e) {
    // ignore listener errors
  }
});

if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
