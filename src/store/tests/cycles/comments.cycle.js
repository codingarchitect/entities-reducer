import xs from 'xstream';
import AppConstants from '../utils/app-constants';

export default function main(sources) {
  const request$ = sources.ACTION
    .filter(action => action.type === 'LOAD_COMMENTS')
    .map(action => ({
      url: `${AppConstants.service.urls.comments}${action.payload}`,
      category: 'comments',
    }));

  const response$ = sources.HTTP
    .select('comments')
    .map(resp$ =>
      resp$.replaceError(err =>
        xs.of(err.response),
      ))
    .flatten()
    .map(res => (res.error ?
      { type: 'LOAD_COMMENTS_ERROR', payload: res.error.message } :
      { type: 'LOAD_COMMENTS_COMPLETED', payload: res.body }));

  return {
    ACTION: response$,
    HTTP: request$,
  };
}
