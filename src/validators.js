import { validateTerm } from 'rdf-validate-datatype'
import { fromRdf } from 'rdf-literal'
import NodeSet from './node-set.js'
import { getPathObjects } from './property-path.js'
import { isInstanceOf, rdfListToArray } from './dataset-utils.js'

function validateAnd(context, constraint) {
  const { sh } = context.ns
  const andNode = constraint.getParameterValue(sh.and)
  const shapes = rdfListToArray(context.$shapes.node(andNode))

  return function (context, focusNode, valueNode) {
    return shapes.every((shape) => context.nodeConformsToShape(valueNode, shape))
  }
}

function validateClass(context, constraint) {
  const { sh } = context.ns
  const classNode = constraint.getParameterValue(sh.class)

  return function (context, focusNode, valueNode) {
    return isInstanceOf(context.$data.node(valueNode), context.$data.node(classNode), context.ns)
  }
}

function validateClosed(context, constraint) {
  const { sh, xsd } = context.ns
  const closedNode = constraint.getParameterValue(sh.closed)
  const ignoredPropertiesNode = constraint.getParameterValue(sh.ignoredProperties)
  const currentShape = constraint.shape.shapeNode
  const trueTerm = context.factory.literal('true', xsd.boolean)

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

  return function (context, focusNode, valueNode) {
    if (!trueTerm.equals(closedNode)) {
      return
    }

    const results = []
    const valueQuads = [...context.$data.dataset.match(valueNode, null, null)]
    valueQuads
      .filter(({ predicate }) => !allowed.has(predicate))
      .forEach(({ predicate, object }) => {
        results.push({ path: predicate, value: object })
      })

    return results
  }
}

function validateDatatype(context, constraint) {
  const { sh } = context.ns
  const datatypeNode = constraint.getParameterValue(sh.datatype)

  return function (context, focusNode, valueNode) {
    if (valueNode.termType === 'Literal') {
      return datatypeNode.equals(valueNode.datatype) && validateTerm(valueNode)
    } else {
      return false
    }
  }
}

function validateDisjoint(context, constraint) {
  const { sh } = context.ns
  const disjointNode = constraint.getParameterValue(sh.disjoint)

  return function (context, focusNode, valueNode) {
    return context.$data.dataset.match(focusNode, disjointNode, valueNode).size === 0
  }
}

function validateEqualsProperty(context, constraint) {
  const { sh } = context.ns
  const path = constraint.shape.pathObject
  const equalsNode = constraint.getParameterValue(sh.equals)

  return function (context, focusNode, valueNode) {
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
}

function validateEqualsNode(context, constraint) {
  const { sh } = context.ns
  const equalsNode = constraint.getParameterValue(sh.equals)

  return function (context, focusNode, valueNode) {
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
}

function validateHasValueNode(context, constraint) {
  const { sh } = context.ns
  const hasValueNode = constraint.getParameterValue(sh.hasValue)

  return function (context, focusNode, valueNode) {
    return focusNode.equals(hasValueNode)
  }
}

function validateHasValueProperty(context, constraint) {
  const { sh } = context.ns
  const path = constraint.shape.pathObject
  const hasValueNode = constraint.getParameterValue(sh.hasValue)

  return function (context, focusNode, valueNode) {
    return getPathObjects(context.$data, focusNode, path)
      .some(value => value.equals(hasValueNode))
  }
}

function validateIn(context, constraint) {
  // todo: refactor from previous implementation
  return function (context, focusNode, valueNode) {
    const { sh } = context.ns
    return constraint.nodeSet.has(valueNode)
  }
}

function validateLanguageIn(context, constraint) {
  const { sh } = context.ns
  const languageInNode = constraint.getParameterValue(sh.languageIn)
  const allowedLanguages = rdfListToArray(context.$shapes.node(languageInNode))

  return function (context, focusNode, valueNode) {
    if (valueNode.termType !== 'Literal') {
      return false
    }

    const valueLanguage = valueNode.language
    if (!valueLanguage || valueLanguage === '') {
      return false
    }

    return allowedLanguages.some(allowedLanguage => valueLanguage.startsWith(allowedLanguage.value))
  }
}

function validateLessThanProperty(context, constraint) {
  const { sh } = context.ns
  const valuePath = constraint.shape.pathObject
  const lessThanNode = constraint.getParameterValue(sh.lessThan)

  return function (context, focusNode, valueNode) {
    const values = getPathObjects(context.$data, focusNode, valuePath)
    const referenceValues = context.$data.node(focusNode).out(lessThanNode).terms

    const invalidValues = []
    for (const value of values) {
      for (const referenceValue of referenceValues) {
        const c = compareTerms(value, referenceValue, context.ns)
        if (c === null || c >= 0) {
          invalidValues.push({ value })
        }
      }
    }
    return invalidValues
  }
}

function validateLessThanOrEqualsProperty(context, constraint) {
  const { sh } = context.ns
  const valuePath = constraint.shape.pathObject
  const lessThanOrEqualsNode = constraint.getParameterValue(sh.lessThanOrEquals)

  return function (context, focusNode, valueNode) {
    const values = getPathObjects(context.$data, focusNode, valuePath)
    const referenceValues = context.$data.node(focusNode).out(lessThanOrEqualsNode).terms

    const invalidValues = []
    for (const value of values) {
      for (const referenceValue of referenceValues) {
        const c = compareTerms(value, referenceValue, context.ns)
        if (c === null || c > 0) {
          invalidValues.push({ value })
        }
      }
    }
    return invalidValues
  }
}

function validateMaxCountProperty(context, constraint) {
  const { sh } = context.ns
  const path = constraint.shape.pathObject
  const maxCountNode = constraint.getParameterValue(sh.maxCount)

  return function (context, focusNode, valueNode) {
    const count = getPathObjects(context.$data, focusNode, path).length

    return count <= Number(maxCountNode.value)
  }
}

function validateMaxExclusive(context, constraint) {
  const { sh } = context.ns
  const maxExclusiveNode = constraint.getParameterValue(sh.maxExclusive)

  return function (context, focusNode, valueNode) {
    const comp = compareTerms(valueNode, maxExclusiveNode, context.ns)

    return (comp !== null && comp < 0)
  }
}

function validateMaxInclusive(context, constraint) {
  const { sh } = context.ns
  const maxInclusiveNode = constraint.getParameterValue(sh.maxInclusive)

  return function (context, focusNode, valueNode) {
    const comp = compareTerms(valueNode, maxInclusiveNode, context.ns)

    return (comp !== null && comp <= 0)
  }
}

function validateMaxLength(context, constraint) {
  const { sh } = context.ns
  const maxLengthNode = constraint.getParameterValue(sh.maxLength)

  return function (context, focusNode, valueNode) {
    if (valueNode.termType === 'BlankNode') {
      return false
    }

    return valueNode.value.length <= Number(maxLengthNode.value)
  }
}

function validateMinCountProperty(context, constraint) {
  const { sh } = context.ns
  const path = constraint.shape.pathObject
  const minCountNode = constraint.getParameterValue(sh.minCount)

  return function (context, focusNode, valueNode) {
    const count = getPathObjects(context.$data, focusNode, path).length

    return count >= Number(minCountNode.value)
  }
}

function validateMinExclusive(context, constraint) {
  const { sh } = context.ns
  const minExclusiveNode = constraint.getParameterValue(sh.minExclusive)

  return function (context, focusNode, valueNode) {
    const comp = compareTerms(valueNode, minExclusiveNode, context.ns)

    return (comp !== null && comp > 0)
  }
}

function validateMinInclusive(context, constraint) {
  const { sh } = context.ns
  const minInclusiveNode = constraint.getParameterValue(sh.minInclusive)

  return function (context, focusNode, valueNode) {
    const comp = compareTerms(valueNode, minInclusiveNode, context.ns)

    return (comp !== null && comp >= 0)
  }
}

function validateMinLength(context, constraint) {
  const { sh } = context.ns
  const minLengthNode = constraint.getParameterValue(sh.minLength)

  return function (context, focusNode, valueNode) {
    if (valueNode.termType === 'BlankNode') {
      return false
    }

    return valueNode.value.length >= Number(minLengthNode.value)
  }
}

function validateNodeKind(context, constraint) {
  const { sh } = context.ns
  const nodeKindNode = constraint.getParameterValue(sh.nodeKind)

  return function (context, focusNode, valueNode) {
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
}

function validateNode(context, constraint) {
  const { sh } = context.ns
  const nodeNode = constraint.getParameterValue(sh.node)

  return function (context, focusNode, valueNode) {
    return context.validateNodeAgainstShape(valueNode, nodeNode)
  }
}

function validateNot(context, constraint) {
  const { sh } = context.ns
  const notNode = constraint.getParameterValue(sh.not)

  return function (context, focusNode, valueNode) {
    return !context.nodeConformsToShape(valueNode, notNode)
  }
}

function validateOr(context, constraint) {
  const { sh } = context.ns
  const orNode = constraint.getParameterValue(sh.or)
  const shapes = rdfListToArray(context.$shapes.node(orNode))

  return function (context, focusNode, valueNode) {
    return shapes.some(shape => context.nodeConformsToShape(valueNode, shape))
  }
}

function validatePattern(context, constraint) {
  const { sh } = context.ns
  const flagsNode = constraint.getParameterValue(sh.flags)
  const patternNode = constraint.getParameterValue(sh.pattern)
  const re = flagsNode ? new RegExp(patternNode.value, flagsNode.value) : new RegExp(patternNode.value)

  return function (context, focusNode, valueNode) {
    if (valueNode.termType === 'BlankNode') {
      return false
    }

    return re.test(valueNode.value)
  }
}

function validateQualifiedMaxCountProperty(context, constraint) {
  const { sh } = context.ns
  const qualifiedMaxCountNode = constraint.getParameterValue(sh.qualifiedMaxCount)

  return function (context, focusNode, valueNode) {
    const count = validateQualifiedHelper(context, focusNode, constraint)

    return qualifiedMaxCountNode.termType === 'Literal' && count <= Number(qualifiedMaxCountNode.value)
  }
}

function validateQualifiedMinCountProperty(context, constraint) {
  const { sh } = context.ns
  const qualifiedMinCountNode = constraint.getParameterValue(sh.qualifiedMinCount)

  return function (context, focusNode, valueNode) {
    const count = validateQualifiedHelper(context, focusNode, constraint)

    return qualifiedMinCountNode.termType === 'Literal' && count >= Number(qualifiedMinCountNode.value)
  }
}

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
  return getPathObjects(context.$data, focusNode, path)
    .filter(value =>
      context.nodeConformsToShape(value, qualifiedValueShapeNode) &&
      !validateQualifiedConformsToASibling(context, value, [...siblingShapes]),
    )
    .length
}

function validateQualifiedConformsToASibling(context, value, siblingShapes) {
  for (let i = 0; i < siblingShapes.length; i++) {
    if (context.nodeConformsToShape(value, siblingShapes[i])) {
      return true
    }
  }
  return false
}

function validateUniqueLangProperty(context, constraint) {
  const { sh, xsd } = context.ns
  const uniqueLangNode = constraint.getParameterValue(sh.uniqueLang)
  const trueTerm = context.factory.literal('true', xsd.boolean)
  const path = constraint.shape.pathObject

  return function (context, focusNode, valueNode) {
    if (!trueTerm.equals(uniqueLangNode)) {
      return
    }

    const map = {}
    getPathObjects(context.$data, focusNode, path).forEach(value => {
      const lang = value.language
      if (lang && lang !== '') {
        const old = map[lang]
        if (!old) {
          map[lang] = 1
        } else {
          map[lang] = old + 1
        }
      }
    })

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
}

function validateXone(context, constraint) {
  const { sh } = context.ns
  const xoneNode = constraint.getParameterValue(sh.xone)
  const shapes = rdfListToArray(context.$shapes.node(xoneNode))

  return function (context, focusNode, valueNode) {
    const conformsCount = shapes
      .map(shape => context.nodeConformsToShape(valueNode, shape))
      .filter(Boolean)
      .length

    return conformsCount === 1
  }
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
