import { validateTerm } from 'rdf-validate-datatype'
import { fromRdf } from 'rdf-literal'
import type { Literal, Term } from '@rdfjs/types'
import type SHACLValidator from '../index.js'
import NodeSet from './node-set.js'
import { getPathObjects } from './property-path.js'
import { isInstanceOf, rdfListToArray } from './dataset-utils.js'
import type { ValidationResult, Validator } from './validation-engine.js'
import type { Namespaces } from './namespaces.js'
import type { Constraint } from './shapes-graph.js'
import ns from './namespaces.js'

const validateAnd: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const andNode = constraint.getParameterValue(sh.and)
    const shapes = rdfListToArray(context.$shapes.node(andNode))

    return shapes.every((shape) => {
      if (constraint.shape.isPropertyShape) {
        return context.nodeConformsToShape(focusNode, shape, constraint.pathObject)
      }

      return context.nodeConformsToShape(valueNode, shape)
    })
  },
}

const validateClass: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const classNode = constraint.getParameterValue(ns.sh.class)

    return isInstanceOf(context.$data.node(valueNode), context.$data.node(classNode), context.ns)
  },
}

const validateClosed: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh, xsd } = context.ns
    const closedNode = constraint.getParameterValue(sh.closed)
    const ignoredPropertiesNode = constraint.getParameterValue(sh.ignoredProperties)
    const currentShape = constraint.shape.shapeNode
    const trueTerm = context.factory.literal('true', xsd.boolean)

    if (!trueTerm.equals(closedNode)) {
      return
    }

    const allowed = new NodeSet(
      context.$shapes
        .node(currentShape)
        .out(sh.property)
        .out(sh.path)
        .terms
        .filter((term) => term.termType === 'NamedNode'),
    )

    if (ignoredPropertiesNode) {
      allowed.addAll(rdfListToArray(context.$shapes.node(ignoredPropertiesNode)))
    }

    const results: ValidationResult[] = []
    const valueQuads = [...context.$data.dataset.match(valueNode, null, null)]
    valueQuads
      .filter(({ predicate }) => !allowed.has(predicate))
      .forEach(({ predicate, object }) => {
        results.push({ path: predicate, value: object })
      })

    return results
  },
  validationMessage: 'Predicate is not allowed (closed shape)',
}

const validateDatatype: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const datatypeNode = constraint.getParameterValue(sh.datatype)

    if (valueNode.termType === 'Literal') {
      return valueNode.datatype.equals(datatypeNode) && validateTerm(valueNode)
    } else {
      return false
    }
  },
  validationMessage: 'Value does not have datatype {$datatype}',
}

const validateDisjoint: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const disjointNode = constraint.getParameterValue(sh.disjoint)

    return context.$data.dataset.match(focusNode, disjointNode, valueNode).size === 0
  },
  validationMessage: 'Value node must not also be one of the values of {$disjoint}',
}

const validateEquals: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const path = constraint.shape.pathObject
    const equalsNode = constraint.getParameterValue(sh.equals)

    const results: ValidationResult[] = []
    getPathObjects(context.$data, focusNode, path).forEach(value => {
      if (context.$data.dataset.match(focusNode, equalsNode, value).size === 0) {
        results.push({ value })
      }
    })

    const equalsQuads = [...context.$data.dataset.match(focusNode, equalsNode, null)]
    equalsQuads.forEach(({ object }) => {
      const value = object
      if (!getPathObjects(context.$data, focusNode, path).some(pathValue => pathValue.equals(value))) {
        results.push({ value })
      }
    })
    return results
  },
  propertyValidationMessage: 'Must have same values as {$equals}',

  nodeValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const equalsNode = constraint.getParameterValue(sh.equals)

    const results: ValidationResult[] = []

    let solutions = 0
    getPathObjects(context.$data, focusNode, equalsNode).forEach(value => {
      solutions++
      if (!value.equals(focusNode)) {
        results.push({ value })
      }
    })

    if (results.length === 0 && solutions === 0) {
      results.push({ value: focusNode })
    }

    return results
  },
  nodeValidationMessage: 'Must have same values as {$equals}',
}

const validateHasValue: Validator = {
  nodeValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const hasValueNode = constraint.getParameterValue(sh.hasValue)

    return focusNode.equals(hasValueNode)
  },
  nodeValidationMessage: 'Value must be {$hasValue}',

  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const path = constraint.shape.pathObject
    const hasValueNode = constraint.getParameterValue(sh.hasValue)

    return getPathObjects(context.$data, focusNode, path)
      .some(value => value.equals(hasValueNode))
  },
  propertyValidationMessage: 'Missing expected value {$hasValue}',
}

const validateIn: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    return constraint.nodeSet.has(valueNode)
  },
  validationMessage: 'Value is not one of the allowed values: {$in}',
}

const validateLanguageIn: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    if (valueNode.termType !== 'Literal') {
      return false
    }

    const valueLanguage = valueNode.language
    if (!valueLanguage || valueLanguage === '') {
      return false
    }

    const languageInNode = constraint.getParameterValue(sh.languageIn)
    const allowedLanguages = rdfListToArray(context.$shapes.node(languageInNode))

    return allowedLanguages.some(allowedLanguage => valueLanguage.startsWith(allowedLanguage.value))
  },
  validationMessage: 'Language does not match any of {$languageIn}',
}

const validateLessThan: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const valuePath = constraint.shape.pathObject
    const values = getPathObjects(context.$data, focusNode, valuePath)
    const lessThanNode = constraint.getParameterValue(sh.lessThan)
    const referenceValues = context.$data.node(focusNode).out(lessThanNode).terms

    const invalidValues: ValidationResult[] = []
    for (const value of values) {
      for (const referenceValue of referenceValues) {
        const c = compareTerms(value, referenceValue, context.ns)
        if (c === null || c >= 0) {
          invalidValues.push({ value })
        }
      }
    }
    return invalidValues
  },
  propertyValidationMessage: 'Value is not less than value of {$lessThan}',
}

const validateLessThanOrEquals: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const valuePath = constraint.shape.pathObject
    const values = getPathObjects(context.$data, focusNode, valuePath)
    const lessThanOrEqualsNode = constraint.getParameterValue(sh.lessThanOrEquals)
    const referenceValues = context.$data.node(focusNode).out(lessThanOrEqualsNode).terms

    const invalidValues: ValidationResult[] = []
    for (const value of values) {
      for (const referenceValue of referenceValues) {
        const c = compareTerms(value, referenceValue, context.ns)
        if (c === null || c > 0) {
          invalidValues.push({ value })
        }
      }
    }
    return invalidValues
  },
  propertyValidationMessage: 'Value is not less than or equal to value of {$lessThanOrEquals}',
}

const validateMaxCount: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const path = constraint.shape.pathObject
    const count = getPathObjects(context.$data, focusNode, path).length
    const maxCountNode = constraint.getParameterValue(sh.maxCount)

    return maxCountNode && count <= Number(maxCountNode.value)
  },
  propertyValidationMessage: 'More than {$maxCount} values',
}

const validateMaxExclusive: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const maxExclusiveNode = constraint.getParameterValue(sh.maxExclusive)
    const comp = compareTerms(valueNode, maxExclusiveNode, context.ns)

    return (comp !== null && comp < 0)
  },
  validationMessage: 'Value is not less than {$maxExclusive}',
}

const validateMaxInclusive: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const maxInclusiveNode = constraint.getParameterValue(sh.maxInclusive)
    const comp = compareTerms(valueNode, maxInclusiveNode, context.ns)

    return (comp !== null && comp <= 0)
  },
  validationMessage: 'Value is not less than or equal to {$maxInclusive}',
}

const validateMaxLength: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    if (valueNode.termType === 'BlankNode') {
      return false
    }

    const { sh } = context.ns
    const maxLengthNode = constraint.getParameterValue(sh.maxLength)
    return valueNode.value.length <= Number(maxLengthNode.value)
  },
  validationMessage: 'Value has more than {$maxLength} characters',
}

const validateMinCount: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const path = constraint.pathObject
    const count = getPathObjects(context.$data, focusNode, path).length
    const minCountNode = constraint.getParameterValue(sh.minCount)

    return count >= Number(minCountNode.value)
  },
  propertyValidationMessage: 'Less than {$minCount} values',
}

const validateMinExclusive: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const minExclusiveNode = constraint.getParameterValue(sh.minExclusive)
    const comp = compareTerms(valueNode, minExclusiveNode, context.ns)

    return (comp !== null && comp > 0)
  },
  validationMessage: 'Value is not greater than {$minExclusive}',
}

const validateMinInclusive: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const minInclusiveNode = constraint.getParameterValue(sh.minInclusive)
    const comp = compareTerms(valueNode, minInclusiveNode, context.ns)

    return (comp !== null && comp >= 0)
  },
  validationMessage: 'Value is not greater than or equal to {$minInclusive}',
}

const validateMinLength: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    if (valueNode.termType === 'BlankNode') {
      return false
    }

    const { sh } = context.ns
    const minLengthNode = constraint.getParameterValue(sh.minLength)
    return valueNode.value.length >= Number(minLengthNode.value)
  },
  validationMessage: 'Value has less than {$minLength} characters',
}

const validateNodeKind: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const nodeKindNode = constraint.getParameterValue(sh.nodeKind)

    if (valueNode.termType === 'BlankNode') {
      return sh.BlankNode.equals(nodeKindNode) ||
          sh.BlankNodeOrIRI.equals(nodeKindNode) ||
          sh.BlankNodeOrLiteral.equals(nodeKindNode)
    } else if (valueNode.termType === 'NamedNode') {
      return sh.IRI.equals(nodeKindNode) ||
          sh.BlankNodeOrIRI.equals(nodeKindNode) ||
          sh.IRIOrLiteral.equals(nodeKindNode)
    } else if (valueNode.termType === 'Literal') {
      return sh.Literal.equals(nodeKindNode) ||
          sh.BlankNodeOrLiteral.equals(nodeKindNode) ||
          sh.IRIOrLiteral.equals(nodeKindNode)
    }
  },
  validationMessage: 'Value does not have node kind {$nodeKind}',
}

const validateNode: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const nodeNode = constraint.getParameterValue(sh.node)
    return context.validateNodeAgainstShape(valueNode, nodeNode)
  },
  validationMessage: 'Value does not have shape {$node}',
}

const validateNot: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const notNode = constraint.getParameterValue(sh.not)
    return !context.nodeConformsToShape(valueNode, notNode)
  },
  validationMessage: 'Value does have shape {$not}',
}

const validateOr: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const orNode = constraint.getParameterValue(sh.or)
    const shapes = rdfListToArray(context.$shapes.node(orNode))
    return shapes.some(shape => context.nodeConformsToShape(valueNode, shape))
  },
}

const validatePattern: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    if (valueNode.termType === 'BlankNode') {
      return false
    }

    const { sh } = context.ns
    const flagsNode = constraint.getParameterValue(sh.flags)
    const patternNode = constraint.getParameterValue(sh.pattern)
    const re = flagsNode ? new RegExp(patternNode.value, flagsNode.value) : new RegExp(patternNode.value)
    return re.test(valueNode.value)
  },
  validationMessage: 'Value does not match pattern "{$pattern}"',
}

const validateQualifiedMaxCount: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const count = validateQualifiedHelper(context, focusNode, constraint)
    const qualifiedMaxCountNode = constraint.getParameterValue(sh.qualifiedMaxCount)

    return qualifiedMaxCountNode.termType === 'Literal' && count <= Number(qualifiedMaxCountNode.value)
  },
  propertyValidationMessage: 'More than {$qualifiedMaxCount} values have shape {$qualifiedValueShape}',
}

const validateQualifiedMinCount: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const count = validateQualifiedHelper(context, focusNode, constraint)
    const qualifiedMinCountNode = constraint.getParameterValue(sh.qualifiedMinCount)

    return qualifiedMinCountNode.termType === 'Literal' && count >= Number(qualifiedMinCountNode.value)
  },
  propertyValidationMessage: 'Less than {$qualifiedMinCount} values have shape {$qualifiedValueShape}',
}

function validateQualifiedHelper(context: SHACLValidator, focusNode: Term, constraint: Constraint) {
  const { sh, xsd } = context.ns
  const currentShapeNode = constraint.shape.shapeNode
  const qualifiedValueShapesDisjointNode = constraint.getParameterValue(sh.qualifiedValueShapesDisjoint)
  const qualifiedValueShapeNode = constraint.getParameterValue(sh.qualifiedValueShape)
  const trueTerm = context.factory.literal('true', xsd.boolean)

  const siblingShapes = new NodeSet()

  if (trueTerm.equals(qualifiedValueShapesDisjointNode)) {
    const qualifiedSiblingShapes = context.$shapes
      .node(currentShapeNode)
      // Move up to parent
      .in(sh.property)
      // Move down to all siblings
      .out(sh.property)
      // Select sh:qualifiedValueShape of all siblings
      .out(sh.qualifiedValueShape)
      .filter(({ term }) => !term.equals(qualifiedValueShapeNode))
      .terms

    siblingShapes.addAll(qualifiedSiblingShapes)
  }

  const path = constraint.shape.pathObject
  return getPathObjects(context.$data, focusNode, path)
    .filter(value =>
      context.nodeConformsToShape(value, qualifiedValueShapeNode) &&
      !validateQualifiedConformsToASibling(context, value, [...siblingShapes]),
    )
    .length
}

function validateQualifiedConformsToASibling(context: SHACLValidator, value: Term, siblingShapes: Term[]) {
  for (let i = 0; i < siblingShapes.length; i++) {
    if (context.nodeConformsToShape(value, siblingShapes[i])) {
      return true
    }
  }
  return false
}

const validateUniqueLang: Validator = {
  propertyValidate(context, focusNode, valueNode, constraint) {
    const { sh, xsd } = context.ns
    const uniqueLangNode = constraint.getParameterValue(sh.uniqueLang)
    const trueTerm = context.factory.literal('true', xsd.boolean)

    if (!trueTerm.equals(uniqueLangNode)) {
      return
    }

    const path = constraint.shape.pathObject
    const map: Record<string, number> = {}
    getPathObjects(context.$data, focusNode, path).forEach(value => {
      if (value.termType === 'Literal' && value.language && value.language !== '') {
        const old = map[value.language]
        if (!old) {
          map[value.language] = 1
        } else {
          map[value.language] = old + 1
        }
      }
    })

    const results: string[] = []
    for (const lang in map) {
      if (Object.prototype.hasOwnProperty.call(map, lang)) {
        const count = map[lang]
        if (count > 1) {
          results.push('Language "' + lang + '" has been used by ' + count + ' values')
        }
      }
    }
    return results
  },
  propertyValidationMessage: 'Language "{?lang}" used more than once',
}

const validateXone: Validator = {
  validate(context, focusNode, valueNode, constraint) {
    const { sh } = context.ns
    const xoneNode = constraint.getParameterValue(sh.xone)
    const shapes = rdfListToArray(context.$shapes.node(xoneNode))
    const conformsCount = shapes
      .map(shape => context.nodeConformsToShape(valueNode, shape))
      .filter(Boolean)
      .length

    return conformsCount === 1
  },
}

// Private helper functions

/**
 * Compare 2 terms.
 *
 * Returns:
 * - a negative number if term1 occurs before term2
 * - a positive number if the term1 occurs after term2
 * - 0 if they are equivalent
 * - null if they are not comparable
 */
function compareTerms(term1: Term | null | undefined, term2: Term | null | undefined, ns: Namespaces) {
  if (!term1 || !term2 || term1.termType !== 'Literal' || term2.termType !== 'Literal') {
    return null
  }

  // Check that if one of the compared nodes is a datetime with a timezone,
  // the other one is too. A datetime with a specified timezone is not comparable
  // with a datetime without a timezone.
  if (hasTimezone(term1, ns) !== hasTimezone(term2, ns)) {
    return null
  }

  const value1 = fromRdf(term1)
  const value2 = fromRdf(term2)

  if (typeof value1 !== typeof value2) {
    return null
  }

  if (typeof value1 === 'string') {
    return value1.localeCompare(value2)
  } else {
    return value1 - value2
  }
}

function hasTimezone(node: Literal, ns: Namespaces) {
  const pattern = /^.*(((\+|-)\d{2}:\d{2})|Z)$/
  return ns.xsd.dateTime.equals(node.datatype) && pattern.test(node.value)
}

export default {
  validateAnd,
  validateClass,
  validateClosed,
  validateDatatype,
  validateDisjoint,
  validateEquals,
  validateHasValue,
  validateIn,
  validateLanguageIn,
  validateLessThan,
  validateLessThanOrEquals,
  validateMaxCount,
  validateMaxExclusive,
  validateMaxInclusive,
  validateMaxLength,
  validateMinCount,
  validateMinExclusive,
  validateMinInclusive,
  validateMinLength,
  validateNode,
  validateNodeKind,
  validateNot,
  validateOr,
  validatePattern,
  validateQualifiedMaxCount,
  validateQualifiedMinCount,
  validateUniqueLang,
  validateXone,
}
