// TODO: Rewrite this in a functional way
/* eslint fp/no-nil: 1 */
/* eslint fp/no-mutation: 1 */
/* eslint fp/no-mutating-methods: 1 */
/* eslint fp/no-unused-expression: 1 */
/* eslint better/no-ifs: 1 */
/* eslint better/explicit-return: 1 */
import { combineReducers } from 'redux';
import { combineCycles } from 'redux-cycles';

const replaceAsyncReducers = (rootReducers, keys, reducer) => {
  const key = keys.shift();
  if (keys.length === 0) {
    rootReducers[key] = reducer; // eslint-disable-line
    return;
  }
  if (!rootReducers[key]) rootReducers[key] = {}; // eslint-disable-line
  const nextRootReducers = rootReducers[key];
  replaceAsyncReducers(nextRootReducers, keys, reducer);
};

const combineAsyncReducers = (asyncReducers) => {
  if (typeof asyncReducers !== 'object') return asyncReducers;
  const combineReducerObject = {};
  Object.keys(asyncReducers).forEach((prop) => {
    const value = asyncReducers[prop];
    if (typeof value === 'object') {
      combineReducerObject[prop] = combineAsyncReducers(value);
    } else if (typeof value === 'function') {
      combineReducerObject[prop] = value;
    }
  });
  return combineReducers(combineReducerObject);
};

export const makeRootReducer = (asyncReducers) => {
  const newAsyncReducers = {};
  if (asyncReducers) {
    Object.keys(asyncReducers).forEach((key) => {
      newAsyncReducers[key] = combineAsyncReducers(asyncReducers[key]);
    });
  }
  return combineReducers({
    ...newAsyncReducers,
  });
};

export const injectReducer = (store, { key, reducer }) => {
  const keys = key.split('.');
  replaceAsyncReducers(store.asyncReducers, keys, reducer);
  store.replaceReducer(makeRootReducer(store.asyncReducers));
  return reducer;
};

function canInjectEffect(store, key) {
  if (!key) return false;
  if (Object.keys(store.injectedEffects).includes(key)) { return false; }
  return true;
}

export const injectSaga = (store, { key, saga }) => {
  if (!canInjectEffect(store, key)) return;
  store.injectedEffects[key] = saga; // eslint-disable-line no-param-reassign
  store.sagaMiddleware.run(saga);
};

export const injectCycle = (store, { key, cycle }) => {
  if (!canInjectEffect(store, key)) return;
  store.injectedEffects[key] = cycle; // eslint-disable-line no-param-reassign
  const combinedCycle = combineCycles(...Object.values(store.injectedEffects));
  store.attachCycle(combinedCycle);
};

/*
  function to inject saga or cycle.
*/
export const injectSideEffects = (store, { key, type, effect }) => {
  switch (type) {
    case 'CYCLE': {
      injectCycle(store, { key, cycle: effect });
      break;
    }
    case 'SAGA': {
      injectSaga(store, { key, saga: effect });
      break;
    }
    default:
      break;
  }
};

export default makeRootReducer;
