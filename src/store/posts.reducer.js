import makeReducer from './entities.reducer';

export const initialState = {
  status: 'not-started',
  byId: {},
  allIds: [],
  message: {
    type: 'none',
    text: '',
  },
};

const postsReducer = makeReducer({
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
});

export default postsReducer;
