import { lensPath, set, view } from 'ramda';
import { injectReducer } from './reducer';

const entityExists = (allIds, id) => allIds.indexOf(id) !== -1;

const handleById = (state, entity, lenses) => {
  const id = view(lensPath(lenses.id), entity);
  return set(lensPath(['byId', id]), entity, state);
};

const handleAllIds = (state, entity, lenses) => {
  const id = view(lensPath(lenses.id), entity);
  return entityExists(state.allIds, id)
    ? state : set(lensPath(['allIds', state.allIds.length]), id, state);
};

const completedHandler =
  (state, action, lenses) => {
    const payload = view(lensPath(lenses.actionPayload[action.type]));
    const newState = handleById(state, payload(action), lenses);
    return {
      ...handleAllIds(newState, payload(action), lenses),
      status: 'complete',
      message: {
        type: 'success',
        text: 'Loaded',
      },
    };
  };

const loadHandler = state => ({
  ...state,
  status: 'in-progress',
  message: {
    type: 'progress',
    text: 'Loading...',
  },
});

const errorHandler = (state, action, lenses) => {
  const payload = view(lensPath(lenses.actionPayload[action.type]));
  return {
    ...state,
    status: 'error',
    message: {
      type: 'error',
      text: payload(action),
    },
  };
};

const makeClearHandler = params => () => params.initialState;

const makeHandlers = (params) => {
  const loadHandlers = params.actions.load.reduce((acc, loadAction) => ({
    ...acc,
    [loadAction]: loadHandler,
  }), {});
  const loadCompletedHandlers = params.actions.loadCompleted.reduce((acc, loadCompletedAction) => ({
    ...acc,
    [loadCompletedAction]: completedHandler,
  }), loadHandlers);
  const loadCompletedAndFailedHandlers =
    params.actions.loadFailed.reduce((acc, loadFailedAction) => ({
      ...acc,
      [loadFailedAction]: errorHandler,
    }), loadCompletedHandlers);
  return params.actions.clear.reduce((acc, clearAction) => ({
    ...acc,
    [clearAction]: makeClearHandler(params),
  }), loadCompletedAndFailedHandlers);
};

export default function makeReducer(params) {
  const handlers = makeHandlers(params);
  const reducer = (state = params.initialState, action) => {
    const handler = handlers[action.type];
    return handler ? handler(state, action, params.lenses) :
      state;
  };
  return injectReducer(params.store, { key: `entities.${params.reducerKey}`, reducer });
}
