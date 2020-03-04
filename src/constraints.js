
const dash = require('./dash')
const { sh } = require('./namespaces')

module.exports = {
  [sh.AndConstraintComponent.value]: {
    validator: {
      func: dash.validateAnd
    }
  },
  [sh.ClassConstraintComponent.value]: {
    validator: {
      func: dash.validateClass
    }
  },
  [sh.ClosedConstraintComponent.value]: {
    validator: {
      func: dash.validateClosed,
      message: 'Predicate is not allowed (closed shape)'
    }
  },
  [sh.DatatypeConstraintComponent.value]: {
    message: 'Value does not have datatype {$datatype}',
    validator: {
      func: dash.validateDatatype
    }
  },
  [sh.DisjointConstraintComponent.value]: {
    validator: {
      func: dash.validateDisjoint,
      message: 'Value node must not also be one of the values of {$disjoint}'
    }
  },
  [sh.EqualsConstraintComponent.value]: {
    message: 'Must have same values as {$equals}',
    nodeValidator: {
      func: dash.validateEqualsNode
    },
    propertyValidator: {
      func: dash.validateEqualsProperty
    }
  },
  [sh.HasValueConstraintComponent.value]: {
    nodeValidator: {
      func: dash.validateHasValueNode,
      message: 'Value must be {$hasValue}'
    },
    propertyValidator: {
      func: dash.validateHasValueProperty,
      message: 'Missing expected value {$hasValue}'
    }
  },
  [sh.InConstraintComponent.value]: {
    message: 'Value is not in {$in}',
    validator: {
      func: dash.validateIn
    }
  },
  [sh.LanguageInConstraintComponent.value]: {
    message: 'Language does not match any of {$languageIn}',
    validator: {
      func: dash.validateLanguageIn
    }
  },
  [sh.LessThanConstraintComponent.value]: {
    message: 'Value is not < value of {$lessThan}',
    propertyValidator: {
      func: dash.validateLessThanProperty
    }
  },
  [sh.LessThanOrEqualsConstraintComponent.value]: {
    message: 'Value is not <= value of {$lessThanOrEquals}',
    propertyValidator: {
      func: dash.validateLessThanOrEqualsProperty
    }
  },
  [sh.MaxCountConstraintComponent.value]: {
    message: 'More than {$maxCount} values',
    propertyValidator: {
      func: dash.validateMaxCountProperty
    }
  },
  [sh.MaxExclusiveConstraintComponent.value]: {
    message: 'Value is not < {$maxExclusive}',
    validator: {
      func: dash.validateMaxExclusive
    }
  },
  [sh.MaxInclusiveConstraintComponent.value]: {
    message: 'Value is not <= {$maxInclusive}',
    validator: {
      func: dash.validateMaxInclusive
    }
  },
  [sh.MaxLengthConstraintComponent.value]: {
    message: 'Value has more than {$maxLength} characters',
    validator: {
      func: dash.validateMaxLength
    }
  },
  [sh.MinCountConstraintComponent.value]: {
    message: 'Less than {$minCount} values',
    propertyValidator: {
      func: dash.validateMinCountProperty
    }
  },
  [sh.MinExclusiveConstraintComponent.value]: {
    message: 'Value is not > {$minExclusive}',
    validator: {
      func: dash.validateMinExclusive
    }
  },
  [sh.MinInclusiveConstraintComponent.value]: {
    message: 'Value is not >= {$minInclusive}',
    validator: {
      func: dash.validateMinInclusive
    }
  },
  [sh.MinLengthConstraintComponent.value]: {
    message: 'Value has less than {$minLength} characters',
    validator: {
      func: dash.validateMinLength
    }
  },
  [sh.NodeConstraintComponent.value]: {
    message: 'Value does not have shape {$node}',
    validator: {
      func: dash.validateNode
    }
  },
  [sh.NodeKindConstraintComponent.value]: {
    message: 'Value does not have node kind {$nodeKind}',
    validator: {
      func: dash.validateNodeKind
    }
  },
  [sh.NotConstraintComponent.value]: {
    message: 'Value does have shape {$not}',
    validator: {
      func: dash.validateNot
    }
  },
  [sh.OrConstraintComponent.value]: {
    validator: {
      func: dash.validateOr
    }
  },
  [sh.PatternConstraintComponent.value]: {
    message: 'Value does not match pattern "{$pattern}"',
    validator: {
      func: dash.validatePattern
    }
  },
  [sh.QualifiedMaxCountConstraintComponent.value]: {
    message: 'More than {$qualifiedMaxCount} values have shape {$qualifiedValueShape}',
    propertyValidator: {
      func: dash.validateQualifiedMaxCountProperty
    }
  },
  [sh.QualifiedMinCountConstraintComponent.value]: {
    message: 'Less than {$qualifiedMinCount} values have shape {$qualifiedValueShape}',
    propertyValidator: {
      func: dash.validateQualifiedMinCountProperty
    }
  },
  [sh.UniqueLangConstraintComponent.value]: {
    message: 'Language "{?lang}" used more than once',
    propertyValidator: {
      func: dash.validateUniqueLangProperty
    }
  },
  [sh.XoneConstraintComponent.value]: {
    validator: {
      func: dash.validateXone
    }
  }
}
