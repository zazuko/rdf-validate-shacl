
const validators = require('./validators')
const { sh } = require('./namespaces')

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
    message: 'Value does not have datatype {$datatype}',
    validator: {
      func: validators.validateDatatype
    }
  },
  [sh.DisjointConstraintComponent.value]: {
    validator: {
      func: validators.validateDisjoint,
      message: 'Value node must not also be one of the values of {$disjoint}'
    }
  },
  [sh.EqualsConstraintComponent.value]: {
    message: 'Must have same values as {$equals}',
    nodeValidator: {
      func: validators.validateEqualsNode
    },
    propertyValidator: {
      func: validators.validateEqualsProperty
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
    message: 'Value is not in {$in}',
    validator: {
      func: validators.validateIn
    }
  },
  [sh.LanguageInConstraintComponent.value]: {
    message: 'Language does not match any of {$languageIn}',
    validator: {
      func: validators.validateLanguageIn
    }
  },
  [sh.LessThanConstraintComponent.value]: {
    message: 'Value is not < value of {$lessThan}',
    propertyValidator: {
      func: validators.validateLessThanProperty
    }
  },
  [sh.LessThanOrEqualsConstraintComponent.value]: {
    message: 'Value is not <= value of {$lessThanOrEquals}',
    propertyValidator: {
      func: validators.validateLessThanOrEqualsProperty
    }
  },
  [sh.MaxCountConstraintComponent.value]: {
    message: 'More than {$maxCount} values',
    propertyValidator: {
      func: validators.validateMaxCountProperty
    }
  },
  [sh.MaxExclusiveConstraintComponent.value]: {
    message: 'Value is not < {$maxExclusive}',
    validator: {
      func: validators.validateMaxExclusive
    }
  },
  [sh.MaxInclusiveConstraintComponent.value]: {
    message: 'Value is not <= {$maxInclusive}',
    validator: {
      func: validators.validateMaxInclusive
    }
  },
  [sh.MaxLengthConstraintComponent.value]: {
    message: 'Value has more than {$maxLength} characters',
    validator: {
      func: validators.validateMaxLength
    }
  },
  [sh.MinCountConstraintComponent.value]: {
    message: 'Less than {$minCount} values',
    propertyValidator: {
      func: validators.validateMinCountProperty
    }
  },
  [sh.MinExclusiveConstraintComponent.value]: {
    message: 'Value is not > {$minExclusive}',
    validator: {
      func: validators.validateMinExclusive
    }
  },
  [sh.MinInclusiveConstraintComponent.value]: {
    message: 'Value is not >= {$minInclusive}',
    validator: {
      func: validators.validateMinInclusive
    }
  },
  [sh.MinLengthConstraintComponent.value]: {
    message: 'Value has less than {$minLength} characters',
    validator: {
      func: validators.validateMinLength
    }
  },
  [sh.NodeConstraintComponent.value]: {
    message: 'Value does not have shape {$node}',
    validator: {
      func: validators.validateNode
    }
  },
  [sh.NodeKindConstraintComponent.value]: {
    message: 'Value does not have node kind {$nodeKind}',
    validator: {
      func: validators.validateNodeKind
    }
  },
  [sh.NotConstraintComponent.value]: {
    message: 'Value does have shape {$not}',
    validator: {
      func: validators.validateNot
    }
  },
  [sh.OrConstraintComponent.value]: {
    validator: {
      func: validators.validateOr
    }
  },
  [sh.PatternConstraintComponent.value]: {
    message: 'Value does not match pattern "{$pattern}"',
    validator: {
      func: validators.validatePattern
    }
  },
  [sh.QualifiedMaxCountConstraintComponent.value]: {
    message: 'More than {$qualifiedMaxCount} values have shape {$qualifiedValueShape}',
    propertyValidator: {
      func: validators.validateQualifiedMaxCountProperty
    }
  },
  [sh.QualifiedMinCountConstraintComponent.value]: {
    message: 'Less than {$qualifiedMinCount} values have shape {$qualifiedValueShape}',
    propertyValidator: {
      func: validators.validateQualifiedMinCountProperty
    }
  },
  [sh.UniqueLangConstraintComponent.value]: {
    message: 'Language "{?lang}" used more than once',
    propertyValidator: {
      func: validators.validateUniqueLangProperty
    }
  },
  [sh.XoneConstraintComponent.value]: {
    validator: {
      func: validators.validateXone
    }
  }
}
