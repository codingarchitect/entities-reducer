import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './App.jsx';
import createStore from './store/store';
import { injectReducer, injectCycle } from './store/reducer';
import pingPongCycle from './ping-pong-cycle';

const store = createStore();
injectReducer(store, { key: 'dummy', reducer: (state = {}) => state });
injectCycle(store, { key: 'pingPong', cycle: pingPongCycle });

/* eslint fp/no-unused-expression: 0 */
render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
