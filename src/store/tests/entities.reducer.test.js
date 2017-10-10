import createStore from '../store';
import { initialState } from '../entities.reducer';
import makePostsReducer from '../posts.reducer';
import testData from './blog-test-data';
import registerCycles from '../../cycles/cycle';
import mockSuperAgent from '../../utils/super-agent';
import AppConstants from '../../utils/app-constants';
import fixtures from './blog-data-mocks';

describe('makeReducer', () => {
  let unsubscribe, currentState, store, postsReducer;
  beforeAll(() => {
    mockSuperAgent([{
      pattern: `${AppConstants.service.urls.base}(.*)`,
      fixtures,
      callback: (match, data) => (data.error ? { error: data.error } : { body: data }),
    }]);
    store = createStore();
    registerCycles(store);    
    postsReducer = makePostsReducer(store);
  });
  it('should use initialState when no state is provided', () => {
    const state = postsReducer(undefined, {});
    expect(state).toEqual(initialState);
  });
  it('should set status and message for load actions', () => {
    const state = postsReducer(initialState, { type: 'LOAD_POSTS' });
    expect(state.status).toEqual('in-progress');
    expect(state.message).toEqual({
      type: 'progress',
      text: 'Loading...',
    });
  });
  it('should set state to initialState after Clear', () => {
    let state = postsReducer(initialState, { type: 'LOAD_POSTS' });
    state =  postsReducer(state, { type: 'CLEAR_POSTS' });
    expect(state).toEqual(initialState);
  });
  
  it('should set entities for load completed actions', (done) => {
    unsubscribe = store.subscribe(() => {
      const currentState = store.getState();
      if (currentState.entities && currentState.entities.posts &&
        currentState.entities.posts.byId && currentState.entities.posts.byId[1]) {
        expect(currentState.entities.posts).toEqual(testData.post1);
        done();
      }
    });
    store.dispatch({ type: 'LOAD_POSTS', payload: 1 });    
  });
  it('should set errorMessage for failed actions', (done) => {
    unsubscribe = store.subscribe(() => {
      const currentState = store.getState();
      if (currentState.entities && currentState.entities.posts &&
        currentState.entities.posts.message &&
        currentState.entities.posts.message.type === 'error') {
        expect(currentState.entities.posts).toEqual(testData.postError);
        done();
      }
    });        
    store.dispatch({ type: 'LOAD_POSTS', payload: 2 });    
  });
  afterEach(() => {
    currentState = undefined;
    if (unsubscribe && typeof unsubscribe === 'function') {
      unsubscribe();
      unsubscribe = undefined;
    }
    store.dispatch({ type: 'CLEAR_POSTS' });
  });
});
