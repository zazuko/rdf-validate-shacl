
const validators = require('./validators')
const { sh } = require('./namespaces')

// Constraint to validator registry
module.exports = {
  [sh.AndConstraintComponent.value]: {
    validator: {
      func: validators.validateAnd
    }
  },
  [sh.ClassConstraintComponent.value]: {
    validator: {
      func: validators.validateClass
    }
  },
  [sh.ClosedConstraintComponent.value]: {
    validator: {
      func: validators.validateClosed,
      message: 'Predicate is not allowed (closed shape)'
    }
  },
  [sh.DatatypeConstraintComponent.value]: {
    validator: {
      func: validators.validateDatatype,
      message: 'Value does not have datatype {$datatype}'
    }
  },
  [sh.DisjointConstraintComponent.value]: {
    validator: {
      func: validators.validateDisjoint,
      message: 'Value node must not also be one of the values of {$disjoint}'
    }
  },
  [sh.EqualsConstraintComponent.value]: {
    nodeValidator: {
      func: validators.validateEqualsNode,
      message: 'Must have same values as {$equals}'
    },
    propertyValidator: {
      func: validators.validateEqualsProperty,
      message: 'Must have same values as {$equals}'
    }
  },
  [sh.HasValueConstraintComponent.value]: {
    nodeValidator: {
      func: validators.validateHasValueNode,
      message: 'Value must be {$hasValue}'
    },
    propertyValidator: {
      func: validators.validateHasValueProperty,
      message: 'Missing expected value {$hasValue}'
    }
  },
  [sh.InConstraintComponent.value]: {
    validator: {
      func: validators.validateIn,
      message: 'Value is not in {$in}'
    }
  },
  [sh.LanguageInConstraintComponent.value]: {
    validator: {
      func: validators.validateLanguageIn,
      message: 'Language does not match any of {$languageIn}'
    }
  },
  [sh.LessThanConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateLessThanProperty,
      message: 'Value is not less than value of {$lessThan}'
    }
  },
  [sh.LessThanOrEqualsConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateLessThanOrEqualsProperty,
      message: 'Value is not less than or equal to value of {$lessThanOrEquals}'
    }
  },
  [sh.MaxCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateMaxCountProperty,
      message: 'More than {$maxCount} values'
    }
  },
  [sh.MaxExclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMaxExclusive,
      message: 'Value is not less than {$maxExclusive}'
    }
  },
  [sh.MaxInclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMaxInclusive,
      message: 'Value is not less than or equal to {$maxInclusive}'
    }
  },
  [sh.MaxLengthConstraintComponent.value]: {
    validator: {
      func: validators.validateMaxLength,
      message: 'Value has more than {$maxLength} characters'
    }
  },
  [sh.MinCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateMinCountProperty,
      message: 'Less than {$minCount} values'
    }
  },
  [sh.MinExclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMinExclusive,
      message: 'Value is not greater than {$minExclusive}'
    }
  },
  [sh.MinInclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMinInclusive,
      message: 'Value is not greater than or equal to {$minInclusive}'
    }
  },
  [sh.MinLengthConstraintComponent.value]: {
    validator: {
      func: validators.validateMinLength,
      message: 'Value has less than {$minLength} characters'
    }
  },
  [sh.NodeConstraintComponent.value]: {
    validator: {
      func: validators.validateNode,
      message: 'Value does not have shape {$node}'
    }
  },
  [sh.NodeKindConstraintComponent.value]: {
    validator: {
      func: validators.validateNodeKind,
      message: 'Value does not have node kind {$nodeKind}'
    }
  },
  [sh.NotConstraintComponent.value]: {
    validator: {
      func: validators.validateNot,
      message: 'Value does have shape {$not}'
    }
  },
  [sh.OrConstraintComponent.value]: {
    validator: {
      func: validators.validateOr
    }
  },
  [sh.PatternConstraintComponent.value]: {
    validator: {
      func: validators.validatePattern,
      message: 'Value does not match pattern "{$pattern}"'
    }
  },
  [sh.QualifiedMaxCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateQualifiedMaxCountProperty,
      message: 'More than {$qualifiedMaxCount} values have shape {$qualifiedValueShape}'
    }
  },
  [sh.QualifiedMinCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateQualifiedMinCountProperty,
      message: 'Less than {$qualifiedMinCount} values have shape {$qualifiedValueShape}'
    }
  },
  [sh.UniqueLangConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateUniqueLangProperty,
      message: 'Language "{?lang}" used more than once'
    }
  },
  [sh.XoneConstraintComponent.value]: {
    validator: {
      func: validators.validateXone
    }
  }
}
