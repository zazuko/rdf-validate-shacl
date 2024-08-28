import validators from './validators.js'
import ns from './namespaces.js'

// Constraint to validator registry
export default {
  [ns.sh.AndConstraintComponent.value]: {
    validator: {
      func: validators.validateAnd,
    },
  },
  [ns.sh.ClassConstraintComponent.value]: {
    validator: {
      func: validators.validateClass,
    },
  },
  [ns.sh.ClosedConstraintComponent.value]: {
    validator: {
      func: validators.validateClosed,
      message: 'Predicate is not allowed (closed shape)',
    },
  },
  [ns.sh.DatatypeConstraintComponent.value]: {
    validator: {
      func: validators.validateDatatype,
      message: 'Value does not have datatype {$datatype}',
    },
  },
  [ns.sh.DisjointConstraintComponent.value]: {
    validator: {
      func: validators.validateDisjoint,
      message: 'Value node must not also be one of the values of {$disjoint}',
    },
  },
  [ns.sh.EqualsConstraintComponent.value]: {
    nodeValidator: {
      func: validators.validateEqualsNode,
      message: 'Must have same values as {$equals}',
    },
    propertyValidator: {
      func: validators.validateEqualsProperty,
      message: 'Must have same values as {$equals}',
    },
  },
  [ns.sh.HasValueConstraintComponent.value]: {
    nodeValidator: {
      func: validators.validateHasValueNode,
      message: 'Value must be {$hasValue}',
    },
    propertyValidator: {
      func: validators.validateHasValueProperty,
      message: 'Missing expected value {$hasValue}',
    },
  },
  [ns.sh.InConstraintComponent.value]: {
    validator: {
      func: validators.validateIn,
      message: 'Value is not one of the allowed values: {$in}',
    },
  },
  [ns.sh.LanguageInConstraintComponent.value]: {
    validator: {
      func: validators.validateLanguageIn,
      message: 'Language does not match any of {$languageIn}',
    },
  },
  [ns.sh.LessThanConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateLessThanProperty,
      message: 'Value is not less than value of {$lessThan}',
    },
  },
  [ns.sh.LessThanOrEqualsConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateLessThanOrEqualsProperty,
      message: 'Value is not less than or equal to value of {$lessThanOrEquals}',
    },
  },
  [ns.sh.MaxCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateMaxCountProperty,
      message: 'More than {$maxCount} values',
    },
  },
  [ns.sh.MaxExclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMaxExclusive,
      message: 'Value is not less than {$maxExclusive}',
    },
  },
  [ns.sh.MaxInclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMaxInclusive,
      message: 'Value is not less than or equal to {$maxInclusive}',
    },
  },
  [ns.sh.MaxLengthConstraintComponent.value]: {
    validator: {
      func: validators.validateMaxLength,
      message: 'Value has more than {$maxLength} characters',
    },
  },
  [ns.sh.MinCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateMinCountProperty,
      message: 'Less than {$minCount} values',
    },
  },
  [ns.sh.MinExclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMinExclusive,
      message: 'Value is not greater than {$minExclusive}',
    },
  },
  [ns.sh.MinInclusiveConstraintComponent.value]: {
    validator: {
      func: validators.validateMinInclusive,
      message: 'Value is not greater than or equal to {$minInclusive}',
    },
  },
  [ns.sh.MinLengthConstraintComponent.value]: {
    validator: {
      func: validators.validateMinLength,
      message: 'Value has less than {$minLength} characters',
    },
  },
  [ns.sh.NodeConstraintComponent.value]: {
    validator: {
      func: validators.validateNode,
      message: 'Value does not have shape {$node}',
    },
  },
  [ns.sh.NodeKindConstraintComponent.value]: {
    validator: {
      func: validators.validateNodeKind,
      message: 'Value does not have node kind {$nodeKind}',
    },
  },
  [ns.sh.NotConstraintComponent.value]: {
    validator: {
      func: validators.validateNot,
      message: 'Value does have shape {$not}',
    },
  },
  [ns.sh.OrConstraintComponent.value]: {
    validator: {
      func: validators.validateOr,
    },
  },
  [ns.sh.PatternConstraintComponent.value]: {
    validator: {
      func: validators.validatePattern,
      message: 'Value does not match pattern "{$pattern}"',
    },
  },
  [ns.sh.QualifiedMaxCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateQualifiedMaxCountProperty,
      message: 'More than {$qualifiedMaxCount} values have shape {$qualifiedValueShape}',
    },
  },
  [ns.sh.QualifiedMinCountConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateQualifiedMinCountProperty,
      message: 'Less than {$qualifiedMinCount} values have shape {$qualifiedValueShape}',
    },
  },
  [ns.sh.UniqueLangConstraintComponent.value]: {
    propertyValidator: {
      func: validators.validateUniqueLangProperty,
      message: 'Language "{?lang}" used more than once',
    },
  },
  [ns.sh.XoneConstraintComponent.value]: {
    validator: {
      func: validators.validateXone,
    },
  },
  [ns.sh.SPARQLConstraintComponent.value]: {
    validator: {
      func: validators.validateSparql,
    },
  },

}
