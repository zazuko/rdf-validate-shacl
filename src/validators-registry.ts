import type { NamedNode } from '@rdfjs/types'
import validators from './validators.js'
import ns from './namespaces.js'
import type { Validator } from './validation-engine.js'

export default <[NamedNode, Validator][]>[
  [ns.sh.AndConstraintComponent, validators.validateAnd],
  [ns.sh.ClassConstraintComponent, validators.validateClass],
  [ns.sh.ClosedConstraintComponent, validators.validateClosed],
  [ns.sh.DatatypeConstraintComponent, validators.validateDatatype],
  [ns.sh.DisjointConstraintComponent, validators.validateDisjoint],
  [ns.sh.EqualsConstraintComponent, validators.validateEquals],
  [ns.sh.HasValueConstraintComponent, validators.validateHasValue],
  [ns.sh.InConstraintComponent, validators.validateIn],
  [ns.sh.LanguageInConstraintComponent, validators.validateLanguageIn],
  [ns.sh.LessThanConstraintComponent, validators.validateLessThan],
  [ns.sh.LessThanOrEqualsConstraintComponent, validators.validateLessThanOrEquals],
  [ns.sh.MaxCountConstraintComponent, validators.validateMaxCount],
  [ns.sh.MaxExclusiveConstraintComponent, validators.validateMaxExclusive],
  [ns.sh.MaxInclusiveConstraintComponent, validators.validateMaxInclusive],
  [ns.sh.MaxLengthConstraintComponent, validators.validateMaxLength],
  [ns.sh.MinCountConstraintComponent, validators.validateMinCount],
  [ns.sh.MinExclusiveConstraintComponent, validators.validateMinExclusive],
  [ns.sh.MinInclusiveConstraintComponent, validators.validateMinInclusive],
  [ns.sh.MinLengthConstraintComponent, validators.validateMinLength],
  [ns.sh.NodeConstraintComponent, validators.validateNode],
  [ns.sh.NodeKindConstraintComponent, validators.validateNodeKind],
  [ns.sh.NotConstraintComponent, validators.validateNot],
  [ns.sh.OrConstraintComponent, validators.validateOr],
  [ns.sh.PatternConstraintComponent, validators.validatePattern],
  [ns.sh.QualifiedMaxCountConstraintComponent, validators.validateQualifiedMaxCount],
  [ns.sh.QualifiedMinCountConstraintComponent, validators.validateQualifiedMinCount],
  [ns.sh.UniqueLangConstraintComponent, validators.validateUniqueLang],
  [ns.sh.XoneConstraintComponent, validators.validateXone],
]
