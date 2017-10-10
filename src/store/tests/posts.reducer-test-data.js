import makeReducer from '../entities.reducer';
import initialState from '../entities.reducer.initial-state';

const makePostsReducer = store => makeReducer({
  actions: {
    load: ['LOAD_POSTS'],
    loadCompleted: ['LOAD_POSTS_COMPLETED'],
    loadFailed: ['LOAD_POSTS_ERROR'],
    clear: ['CLEAR_POSTS'],
  },
  initialState,
  lenses: {
    main: ['entities', 'posts'],
    id: ['id'],
    actionPayload: {
      LOAD_POSTS_COMPLETED: ['payload'],
      LOAD_POSTS_ERROR: ['payload'],
    },
  },
  type: 'single-entity',
  reducerKey: 'posts',
  store,
});

export default makePostsReducer;
