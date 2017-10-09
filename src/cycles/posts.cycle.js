import xs from 'xstream';

export default function main(sources) {
  const request$ = sources.ACTION
    .filter(action => action.type === 'LOAD_POSTS')
    .map(action => ({
      url: `http://localhost:3000/posts/${action.payload}`,
      category: 'posts',
    }));

  const response$ = sources.HTTP
    .select('posts')
    .map(resp$ =>
      resp$.replaceError(err =>
        xs.of(err.response),
      ))
    .flatten()
    .map(res => (res.error ?
      { type: 'LOAD_POSTS_ERROR', payload: res.error.message } :
      { type: 'LOAD_POSTS_COMPLETED', payload: res.body }));

  return {
    ACTION: response$,
    HTTP: request$,
  };
}
