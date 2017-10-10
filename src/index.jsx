import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './App.jsx';
import createStore from './store/store';

const store = createStore();
/* eslint fp/no-unused-expression: 0 */
render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
