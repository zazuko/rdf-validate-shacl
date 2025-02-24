import { validateTerm } from 'rdf-validate-datatype'
import { fromRdf } from 'rdf-literal'
import NodeSet from './node-set.js'
import { getPathObjects } from './property-path.js'
import { isInstanceOf, rdfListToArray } from './dataset-utils.js'

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateAnd(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const andNode = constraint.getParameterValue(sh.and)
  const shapes = andNode && rdfListToArray(context.$shapes.node(andNode))

  return shapes && shapes.every((shape) => {
    const { pathObject } = constraint
    if (constraint.shape.isPropertyShape && pathObject) {
      return context.nodeConformsToShape(focusNode, shape, pathObject)
    }

    return context.nodeConformsToShape(valueNode, shape)
  })
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateClass(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const classNode = constraint.getParameterValue(sh.class)

  return classNode && isInstanceOf(context.$data.node(valueNode), context.$data.node(classNode), context.ns)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateClosed(context, focusNode, valueNode, constraint) {
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

  /** @type import('./validation-engine.js').ValidationResult[] */
  const results = []
  const valueQuads = [...context.$data.dataset.match(valueNode, null, null)]
  valueQuads
    .filter(({ predicate }) => !allowed.has(predicate))
    .forEach(({ predicate, object }) => {
      results.push({ path: predicate, value: object })
    })

  return results
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateDatatype(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const datatypeNode = constraint.getParameterValue(sh.datatype)

  if (valueNode.termType === 'Literal') {
    return valueNode.datatype.equals(datatypeNode) && validateTerm(valueNode)
  } else {
    return false
  }
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateDisjoint(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const disjointNode = constraint.getParameterValue(sh.disjoint)

  return context.$data.dataset.match(focusNode, disjointNode, valueNode).size === 0
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateEqualsProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const path = constraint.shape.pathObject
  const equalsNode = constraint.getParameterValue(sh.equals)

  if (!path) {
    return []
  }

  /** @type import('./validation-engine.js').ValidationResult[] */
  const results = []
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
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateEqualsNode(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const equalsNode = constraint.getParameterValue(sh.equals)
  if (!equalsNode) {
    return []
  }

  /** @type import('./validation-engine.js').ValidationResult[] */
  const results = []

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
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateHasValueNode(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const hasValueNode = constraint.getParameterValue(sh.hasValue)

  return focusNode.equals(hasValueNode)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateHasValueProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const path = constraint.shape.pathObject
  const hasValueNode = constraint.getParameterValue(sh.hasValue)

  return !!path && getPathObjects(context.$data, focusNode, path)
    .some(value => value.equals(hasValueNode))
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateIn(context, focusNode, valueNode, constraint) {
  return constraint.nodeSet.has(valueNode)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateLanguageIn(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  if (valueNode.termType !== 'Literal') {
    return false
  }

  const valueLanguage = valueNode.language
  if (!valueLanguage || valueLanguage === '') {
    return false
  }

  const languageInNode = constraint.getParameterValue(sh.languageIn)
  /**
   * @type {import('@rdfjs/types').Term[]}
   */
  let allowedLanguages = []
  if (languageInNode) {
    allowedLanguages = rdfListToArray(context.$shapes.node(languageInNode))
  }

  return allowedLanguages.some(allowedLanguage => valueLanguage.startsWith(allowedLanguage.value))
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateLessThanProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const valuePath = constraint.shape.pathObject
  const values = valuePath && getPathObjects(context.$data, focusNode, valuePath)
  const lessThanNode = constraint.getParameterValue(sh.lessThan)
  const referenceValues = context.$data.node(focusNode).out(lessThanNode).terms

  /** @type import('./validation-engine.js').ValidationResult[] */
  const invalidValues = []
  for (const value of (values || [])) {
    for (const referenceValue of referenceValues) {
      const c = compareTerms(value, referenceValue, context.ns)
      if (c === null || c >= 0) {
        invalidValues.push({ value })
      }
    }
  }
  return invalidValues
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateLessThanOrEqualsProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const valuePath = constraint.shape.pathObject
  const values = valuePath && getPathObjects(context.$data, focusNode, valuePath)
  const lessThanOrEqualsNode = constraint.getParameterValue(sh.lessThanOrEquals)
  const referenceValues = context.$data.node(focusNode).out(lessThanOrEqualsNode).terms

  /** @type import('./validation-engine.js').ValidationResult[] */
  const invalidValues = []
  for (const value of (values || [])) {
    for (const referenceValue of referenceValues) {
      const c = compareTerms(value, referenceValue, context.ns)
      if (c === null || c > 0) {
        invalidValues.push({ value })
      }
    }
  }
  return invalidValues
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMaxCountProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const path = constraint.shape.pathObject
  const count = path && getPathObjects(context.$data, focusNode, path).length
  const maxCountNode = constraint.getParameterValue(sh.maxCount)

  return !!count && maxCountNode && count <= Number(maxCountNode.value)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMaxExclusive(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const maxExclusiveNode = constraint.getParameterValue(sh.maxExclusive)
  const comp = maxExclusiveNode && compareTerms(valueNode, maxExclusiveNode, context.ns)

  return (!!comp && comp < 0)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMaxInclusive(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const maxInclusiveNode = constraint.getParameterValue(sh.maxInclusive)
  const comp = maxInclusiveNode && compareTerms(valueNode, maxInclusiveNode, context.ns)

  return (!!comp && comp <= 0)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMaxLength(context, focusNode, valueNode, constraint) {
  if (valueNode.termType === 'BlankNode') {
    return false
  }

  const { sh } = context.ns
  const maxLengthNode = constraint.getParameterValue(sh.maxLength)
  return maxLengthNode && valueNode.value.length <= Number(maxLengthNode.value)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMinCountProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const path = constraint.pathObject
  const count = path && getPathObjects(context.$data, focusNode, path).length
  const minCountNode = constraint.getParameterValue(sh.minCount)

  return !!count && minCountNode && count >= Number(minCountNode.value)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMinExclusive(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const minExclusiveNode = constraint.getParameterValue(sh.minExclusive)
  const comp = minExclusiveNode && compareTerms(valueNode, minExclusiveNode, context.ns)

  return (!!comp && comp > 0)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMinInclusive(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const minInclusiveNode = constraint.getParameterValue(sh.minInclusive)
  const comp = minInclusiveNode && compareTerms(valueNode, minInclusiveNode, context.ns)

  return (!!comp && comp >= 0)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateMinLength(context, focusNode, valueNode, constraint) {
  if (valueNode.termType === 'BlankNode') {
    return false
  }

  const { sh } = context.ns
  const minLengthNode = constraint.getParameterValue(sh.minLength)
  return minLengthNode && valueNode.value.length >= Number(minLengthNode.value)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateNodeKind(context, focusNode, valueNode, constraint) {
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
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateNode(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const nodeNode = constraint.getParameterValue(sh.node)
  return nodeNode && context.validateNodeAgainstShape(valueNode, nodeNode)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateNot(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const notNode = constraint.getParameterValue(sh.not)
  return notNode && !context.nodeConformsToShape(valueNode, notNode)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateOr(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const orNode = constraint.getParameterValue(sh.or)
  const shapes = orNode && rdfListToArray(context.$shapes.node(orNode))
  return shapes && shapes.some(shape => context.nodeConformsToShape(valueNode, shape))
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validatePattern(context, focusNode, valueNode, constraint) {
  if (valueNode.termType === 'BlankNode') {
    return false
  }

  const { sh } = context.ns
  const flagsNode = constraint.getParameterValue(sh.flags)
  const patternNode = constraint.getParameterValue(sh.pattern)
  if (!patternNode) {
    return false
  }
  const re = flagsNode ? new RegExp(patternNode.value, flagsNode.value) : new RegExp(patternNode.value)
  return re.test(valueNode.value)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateQualifiedMaxCountProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const count = validateQualifiedHelper(context, focusNode, constraint)
  const qualifiedMaxCountNode = constraint.getParameterValue(sh.qualifiedMaxCount)

  return !!count && qualifiedMaxCountNode?.termType === 'Literal' && count <= Number(qualifiedMaxCountNode.value)
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateQualifiedMinCountProperty(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const count = validateQualifiedHelper(context, focusNode, constraint)
  const qualifiedMinCountNode = constraint.getParameterValue(sh.qualifiedMinCount)

  return !!count && qualifiedMinCountNode?.termType === 'Literal' && count >= Number(qualifiedMinCountNode.value)
}

/**
 * @param {import('../index.js').default} context
 * @param {import('@rdfjs/types').Term} focusNode
 * @param {import('./shapes-graph.js').Constraint} constraint
 */
function validateQualifiedHelper(context, focusNode, constraint) {
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
  return qualifiedValueShapeNode && path && getPathObjects(context.$data, focusNode, path)
    .filter(value =>
      context.nodeConformsToShape(value, qualifiedValueShapeNode) &&
      !validateQualifiedConformsToASibling(context, value, [...siblingShapes]),
    )
    .length
}

/**
 * @param {import('../index.js').default} context
 * @param {import('@rdfjs/types').Term} value
 * @param {import('@rdfjs/types').Term[]} siblingShapes
 */
function validateQualifiedConformsToASibling(context, value, siblingShapes) {
  for (let i = 0; i < siblingShapes.length; i++) {
    if (context.nodeConformsToShape(value, siblingShapes[i])) {
      return true
    }
  }
  return false
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateUniqueLangProperty(context, focusNode, valueNode, constraint) {
  const { sh, xsd } = context.ns
  const uniqueLangNode = constraint.getParameterValue(sh.uniqueLang)
  const trueTerm = context.factory.literal('true', xsd.boolean)

  if (!trueTerm.equals(uniqueLangNode)) {
    return
  }

  const path = constraint.shape.pathObject
  /**
   * @type {Record<string, number>}
   */
  const map = {}
  path && getPathObjects(context.$data, focusNode, path).forEach(value => {
    if (value.termType === 'Literal' && value.language !== '') {
      const lang = value.language
      const old = map[lang]
      if (!old) {
        map[lang] = 1
      } else {
        map[lang] = old + 1
      }
    }
  })

  /** @type string[] */
  const results = []
  for (const lang in map) {
    if (Object.prototype.hasOwnProperty.call(map, lang)) {
      const count = map[lang]
      if (count > 1) {
        results.push('Language "' + lang + '" has been used by ' + count + ' values')
      }
    }
  }
  return results
}

/**
 * @type import('./validation-engine.js').ValidationFunction
 */
function validateXone(context, focusNode, valueNode, constraint) {
  const { sh } = context.ns
  const xoneNode = constraint.getParameterValue(sh.xone)
  const shapes = xoneNode && rdfListToArray(context.$shapes.node(xoneNode))
  const conformsCount = shapes
    ?.map(shape => context.nodeConformsToShape(valueNode, shape))
    .filter(Boolean)
    .length

  return conformsCount === 1
}

// Private helper functions

/**
 * Compare 2 terms.
 *
 * @param {import('@rdfjs/types').Term} term1
 * @param {import('@rdfjs/types').Term} term2
 * @param {import('./namespaces.js').Namespaces} ns
 *
 * Returns:
 * - a negative number if term1 occurs before term2
 * - a positive number if the term1 occurs after term2
 * - 0 if they are equivalent
 * - null if they are not comparable
 */
function compareTerms(term1, term2, ns) {
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

/**
 * @param {import('@rdfjs/types').Literal} node
 * @param {import('./namespaces.js').Namespaces} ns
 */
function hasTimezone(node, ns) {
  const pattern = /^.*(((\+|-)\d{2}:\d{2})|Z)$/
  return ns.xsd.dateTime.equals(node.datatype) && pattern.test(node.value)
}

export default {
  validateAnd,
  validateClass,
  validateClosed,
  validateDatatype,
  validateDisjoint,
  validateEqualsNode,
  validateEqualsProperty,
  validateHasValueNode,
  validateHasValueProperty,
  validateIn,
  validateLanguageIn,
  validateLessThanProperty,
  validateLessThanOrEqualsProperty,
  validateMaxCountProperty,
  validateMaxExclusive,
  validateMaxInclusive,
  validateMaxLength,
  validateMinCountProperty,
  validateMinExclusive,
  validateMinInclusive,
  validateMinLength,
  validateNode,
  validateNodeKind,
  validateNot,
  validateOr,
  validatePattern,
  validateQualifiedMaxCountProperty,
  validateQualifiedMinCountProperty,
  validateUniqueLangProperty,
  validateXone,
}
