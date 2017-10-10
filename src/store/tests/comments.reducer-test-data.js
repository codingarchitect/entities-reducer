import makeReducer from '../entities.reducer';
import initialState from '../entities.reducer.initial-state';

const makeCommentsReducer = store => makeReducer({
  actions: {
    load: ['LOAD_COMMENTS'],
    loadCompleted: ['LOAD_COMMENTS_COMPLETED'],
    loadFailed: ['LOAD_COMMENTS_ERROR'],
    clear: ['CLEAR_COMMENTS'],
  },
  initialState,
  lenses: {
    main: ['entities', 'comments'],
    id: ['id'],
    actionPayload: {
      LOAD_COMMENTS_COMPLETED: ['payload'],
      LOAD_COMMENTS_ERROR: ['payload'],
    },
  },
  type: 'single-entity',
  reducerKey: 'comments',
  store,
});

export default makeCommentsReducer;
