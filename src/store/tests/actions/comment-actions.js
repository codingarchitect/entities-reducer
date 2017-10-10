import makeActionCreators from '../../entities.reducer.actions';

export default makeActionCreators({
  entityName: {
    upperCase: 'COMMENTS',
    camelCase: 'comments',
    pascalCase: 'Comments',
  },
  idPropertyName: 'id',
});
