const makeLoadAction = params => (id, validationPredicate) => ({
  type: `LOAD_${params.entityName.upperCase}`,
  payload: {
    [`${params.idPropertyName}`]: id,
    validationPredicate,
  },
});

const makeCompletedAction = params => (entity) => ({
  type: `LOAD_${params.entityName.upperCase}_COMPLETED`,
  payload: {
    [`${params.entityName.camelCase}`]: entity,
  },
});

const makeClearAction = params => () => ({
  type: `CLEAR_${params.entityName.upperCase}`,
});

const makeErrorAction = params => (message) => ({
  type: `LOAD_${params.entityName.upperCase}_ERROR`,
  payload: {
    message,
  },
});

const makeValidationWarningAction = params => (entity, message) => ({
  type: `LOAD_${params.entityName.upperCase}_VALIDATION_WARNING`,
  payload: {
    [`${params.entityName.camelCase}`]: entity,
    message,
  },
});

const makeActionCreators = params => ({
  names: {
    [`LOAD_${params.entityName.upperCase}`]: `LOAD_${params.entityName.upperCase}`,
    [`LOAD_${params.entityName.upperCase}_COMPLETED`]: `LOAD_${params.entityName.upperCase}_COMPLETED`,
    [`LOAD_${params.entityName.upperCase}_ERROR`]: `LOAD_${params.entityName.upperCase}_ERROR`,
    [`LOAD_${params.entityName.upperCase}_VALIDATION_WARNING`]: `LOAD_${params.entityName.upperCase}_VALIDATION_WARNING`,
  },
  creators: {
    [`load${params.entityName.pascalCase}`]: makeLoadAction(params),
    [`load${params.entityName.pascalCase}Completed`]: makeCompletedAction(params),
    [`load${params.entityName.pascalCase}Error`]: makeErrorAction(params),
    [`load${params.entityName.pascalCase}ValidationWarning`]: makeValidationWarningAction(params),
    [`clear${params.entityName.pascalCase}`]: makeClearAction(params),
  },
});

export default makeActionCreators;
