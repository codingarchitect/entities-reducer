export default function main(sources) {
  const request$ = sources.ACTION
    .filter(action => action.type === 'LOAD_COMMENTS')
    .map(() => ({
      url: 'http://localhost:3000/comments',
      category: 'comments',
    }))
    .debug();

  const response$ = sources.HTTP
    .select('comments')
    .flatten()
    .map(res => ({ type: 'LOAD_COMMENTS_COMPLETED', payload: res.body }))
    .debug();

  return {
    ACTION: response$,
    HTTP: request$,
  };
}
