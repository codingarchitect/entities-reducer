// TODO: Rewrite this in a functional way
/* eslint fp/no-nil: 1 */
/* eslint fp/no-let: 1 */
/* eslint fp/no-mutation: 1 */
/* eslint fp/no-mutating-methods: 1 */
/* eslint fp/no-unused-expression: 1 */
/* eslint better/no-ifs: 1 */
/* eslint better/explicit-return: 1 */
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createCycleMiddleware } from 'redux-cycles';
import { run } from '@cycle/run';
import { makeHTTPDriver } from '@cycle/http';
import { timeDriver } from '@cycle/time';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

import makeRootReducer from './reducer'; // eslint-disable-line import/no-named-as-default

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  // THe routerMiddleware is buggy,
  // The line below cost me a 3-4 hours.
  // If the routerMiddleware is included then none of the reducers execute
  // const middleware = [loggerMiddleware, thunk, routerMiddleware];
  const middleware = [];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(immutableStateInvariantMiddleware({
      ignore: [
        'components',
      ],
    }));
  }
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  const cycleMiddleware = createCycleMiddleware();
  const { makeActionDriver, makeStateDriver } = cycleMiddleware;
  middleware.push(cycleMiddleware);

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    const composeWithDevToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
  store.asyncReducers = {};
  store.sagaMiddleware = sagaMiddleware;
  store.injectedEffects = {};

  store.attachCycle = function attachCycle(cycle) {
    if (store.disposeCurrentCycle) {
      store.disposeCurrentCycle();
    }
    store.disposeCurrentCycle = run(cycle, {
      ACTION: makeActionDriver(),
      STATE: makeStateDriver(),
      Time: timeDriver,
      HTTP: makeHTTPDriver(),
    });
  };
// add service sagas
  // sagaMiddleware.run(createMagServiceSaga);
  // createMagServiceSaga(store);
  // // Setup reducers in shared/mag-services
  // createMagServiceReducers(store);


  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const reducers = require('./reducer').default; // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
