/* eslint fp/no-unused-expression: 1 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createCycleMiddleware } from 'redux-cycles';
import { run } from '@cycle/run';
import { makeHTTPDriver } from '@cycle/http';
import { timeDriver } from '@cycle/time';

import combinedCycle from '../cycles/cycle';
import postsReducer from './posts.reducer';

const cycleMiddleware = createCycleMiddleware();
const { makeActionDriver, makeStateDriver } = cycleMiddleware;

const store = createStore(combineReducers(
  { posts: postsReducer }),
  {},
  applyMiddleware(cycleMiddleware));

function attachCycle(cycle) {
  return run(cycle, {
    ACTION: makeActionDriver(),
    STATE: makeStateDriver(),
    Time: timeDriver,
    HTTP: makeHTTPDriver(),
  });
}


attachCycle(combinedCycle);

export default store;
