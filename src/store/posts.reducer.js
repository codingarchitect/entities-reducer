import makeReducer, { initialState } from './entities.reducer';

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
  store,
});

export default makePostsReducer;
