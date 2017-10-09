import postsReducer, { initialState } from './posts.reducer';
import store from './store';

describe('makeReducer', () => {
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
  let unsubscribe, currentState;
  it('should set entities for load completed actions', (done) => {
    store.dispatch({ type: 'LOAD_POSTS', payload: 1 });
    unsubscribe = store.subscribe(() => {
      const currentState = store.getState();
      if (currentState.posts && currentState.posts.byId && currentState.posts.byId[1]) {
        expect(currentState.posts).toEqual({
          status: 'complete',
          byId: {
            1: {
              id: 1,
              title: 'json-server',
              author: 'typicode',
            },
          },
          allIds: [1],
          message: {
            type: 'success',
            text: 'Loaded',
          },
        });
        done();
      }
    });
  });
  it('should set errorMessage for failed actions', (done) => {
    store.dispatch({ type: 'LOAD_POSTS', payload: 2 });
    unsubscribe = store.subscribe(() => {
      const currentState = store.getState();
      if (currentState.posts && currentState.posts.message) {
        expect(currentState.posts).toEqual({
          status: 'error',
          byId: {},
          allIds: [],
          message: {
            type: 'error',
            text: 'cannot GET /posts/2 (404)',
          },
        });
        done();
      }
    });        
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
