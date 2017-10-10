import makeActionCreators from '../../entities.reducer.actions';

export default makeActionCreators({
  entityName: {
    upperCase: 'POSTS',
    camelCase: 'posts',
    pascalCase: 'Posts',
  },
  idPropertyName: 'id',
});
