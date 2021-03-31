const { validateTerm } = require('rdf-validate-datatype')
const NodeSet = require('./node-set')
const { rdf, sh } = require('./namespaces')
const { getPathObjects } = require('./property-path')
const { isInstanceOf, rdfListToArray } = require('./dataset-utils')

function validateAnd (context, focusNode, valueNode, constraint) {
  const andNode = constraint.getParameterValue(sh.and)
  const shapes = rdfListToArray(context.$shapes, andNode)
  return shapes.every((shape) => context.nodeConformsToShape(valueNode, shape))
}

function validateClass (context, focusNode, valueNode, constraint) {
  const classNode = constraint.getParameterValue(sh.class)
  return isInstanceOf(context.$data, valueNode, classNode)
}

function validateClosed (context, focusNode, valueNode, constraint) {
  const closedNode = constraint.getParameterValue(sh.closed)
  const ignoredPropertiesNode = constraint.getParameterValue(sh.ignoredProperties)
  const currentShape = constraint.shape.shapeNode

  if (!context.factory.true.equals(closedNode)) {
    return
  }

  const allowed = new NodeSet(
    context.$shapes
      .node(currentShape)
      .out(sh.property)
      .out(sh.path)
      .terms
      .filter((term) => term.termType === 'NamedNode')
  )

  if (ignoredPropertiesNode) {
    allowed.addAll(rdfListToArray(context.$shapes, ignoredPropertiesNode))
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

function validateDatatype (context, focusNode, valueNode, constraint) {
  const datatypeNode = constraint.getParameterValue(sh.datatype)

  if (valueNode.termType === 'Literal') {
    return datatypeNode.equals(valueNode.datatype) && validateTerm(valueNode)
  } else {
    return false
  }
}

function validateDisjoint (context, focusNode, valueNode, constraint) {
  const disjointNode = constraint.getParameterValue(sh.disjoint)
  return context.$data.dataset.match(focusNode, disjointNode, valueNode).size === 0
}

function validateEqualsProperty (context, focusNode, valueNode, constraint) {
  const path = constraint.shape.pathObject
  const equalsNode = constraint.getParameterValue(sh.equals)

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

function validateEqualsNode (context, focusNode, valueNode, constraint) {
  const equalsNode = constraint.getParameterValue(sh.equals)
  const results = []

  let solutions = 0
  getPathObjects(context.$data, focusNode, equalsNode).forEach(value => {
    solutions++
    if (compareNodes(focusNode, value) !== 0) {
      results.push({ value })
    }
  })

  if (results.length === 0 && solutions === 0) {
    results.push({ value: focusNode })
  }

  return results
}

function validateHasValueNode (context, focusNode, valueNode, constraint) {
  const hasValueNode = constraint.getParameterValue(sh.hasValue)
  return focusNode.equals(hasValueNode)
}

function validateHasValueProperty (context, focusNode, valueNode, constraint) {
  const path = constraint.shape.pathObject
  const hasValueNode = constraint.getParameterValue(sh.hasValue)

  return getPathObjects(context.$data, focusNode, path)
    .some(value => value.equals(hasValueNode))
}

function validateIn (context, focusNode, valueNode, constraint) {
  const inNode = constraint.getParameterValue(sh.in)
  return new NodeSet(rdfListToArray(context.$shapes, inNode)).has(valueNode)
}

function validateLanguageIn (context, focusNode, valueNode, constraint) {
  if (valueNode.termType !== 'Literal') {
    return false
  }

  const valueLanguage = valueNode.language
  if (!valueLanguage || valueLanguage === '') {
    return false
  }

  const languageInNode = constraint.getParameterValue(sh.languageIn)
  const allowedLanguages = rdfListToArray(context.$shapes, languageInNode)

  return allowedLanguages.some(allowedLanguage => valueLanguage.startsWith(allowedLanguage.value))
}

function validateLessThanProperty (context, focusNode, valueNode, constraint) {
  const valuePath = constraint.shape.pathObject
  const values = getPathObjects(context.$data, focusNode, valuePath)
  const lessThanNode = constraint.getParameterValue(sh.lessThan)
  const referenceValues = context.$data.node(focusNode).out(lessThanNode).terms

  const invalidValues = []
  for (const value of values) {
    for (const referenceValue of referenceValues) {
      const c = compareNodes(value, referenceValue)
      if (c === null || c >= 0) {
        invalidValues.push({ value })
      }
    }
  }
  return invalidValues
}

function validateLessThanOrEqualsProperty (context, focusNode, valueNode, constraint) {
  const valuePath = constraint.shape.pathObject
  const values = getPathObjects(context.$data, focusNode, valuePath)
  const lessThanOrEqualsNode = constraint.getParameterValue(sh.lessThanOrEquals)
  const referenceValues = context.$data.node(focusNode).out(lessThanOrEqualsNode).terms

  const invalidValues = []
  for (const value of values) {
    for (const referenceValue of referenceValues) {
      const c = compareNodes(value, referenceValue)
      if (c === null || c > 0) {
        invalidValues.push({ value })
      }
    }
  }
  return invalidValues
}

function validateMaxCountProperty (context, focusNode, valueNode, constraint) {
  const path = constraint.shape.pathObject
  const count = getPathObjects(context.$data, focusNode, path).length
  const maxCountNode = constraint.getParameterValue(sh.maxCount)

  return count <= Number(maxCountNode.value)
}

function validateMaxExclusive (context, focusNode, valueNode, constraint) {
  const maxExclusiveNode = constraint.getParameterValue(sh.maxExclusive)
  return valueNode.termType === 'Literal' && Number(valueNode.value) < Number(maxExclusiveNode.value)
}

function validateMaxInclusive (context, focusNode, valueNode, constraint) {
  const maxInclusiveNode = constraint.getParameterValue(sh.maxInclusive)
  return valueNode.termType === 'Literal' && Number(valueNode.value) <= Number(maxInclusiveNode.value)
}

function validateMaxLength (context, focusNode, valueNode, constraint) {
  if (valueNode.termType === 'BlankNode') {
    return false
  }

  const maxLengthNode = constraint.getParameterValue(sh.maxLength)
  return valueNode.value.length <= Number(maxLengthNode.value)
}

function validateMinCountProperty (context, focusNode, valueNode, constraint) {
  const path = constraint.shape.pathObject
  const count = getPathObjects(context.$data, focusNode, path).length
  const minCountNode = constraint.getParameterValue(sh.minCount)

  return count >= Number(minCountNode.value)
}

function validateMinExclusive (context, focusNode, valueNode, constraint) {
  const minExclusiveNode = constraint.getParameterValue(sh.minExclusive)
  return valueNode.termType === 'Literal' && Number(valueNode.value) > Number(minExclusiveNode.value)
}

function validateMinInclusive (context, focusNode, valueNode, constraint) {
  const minInclusiveNode = constraint.getParameterValue(sh.minInclusive)
  return valueNode.termType === 'Literal' && Number(valueNode.value) >= Number(minInclusiveNode.value)
}

function validateMinLength (context, focusNode, valueNode, constraint) {
  if (valueNode.termType === 'BlankNode') {
    return false
  }

  const minLengthNode = constraint.getParameterValue(sh.minLength)
  return valueNode.value.length >= Number(minLengthNode.value)
}

function validateNodeKind (context, focusNode, valueNode, constraint) {
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

function validateNode (context, focusNode, valueNode, constraint) {
  const nodeNode = constraint.getParameterValue(sh.node)
  return context.nodeConformsToShape(valueNode, nodeNode)
}

function validateNot (context, focusNode, valueNode, constraint) {
  const notNode = constraint.getParameterValue(sh.not)
  return !context.nodeConformsToShape(valueNode, notNode)
}

function validateOr (context, focusNode, valueNode, constraint) {
  const orNode = constraint.getParameterValue(sh.or)
  const shapes = rdfListToArray(context.$shapes, orNode)
  return shapes.some(shape => context.nodeConformsToShape(valueNode, shape))
}

function validatePattern (context, focusNode, valueNode, constraint) {
  if (valueNode.termType === 'BlankNode') {
    return false
  }

  const flagsNode = constraint.getParameterValue(sh.flags)
  const patternNode = constraint.getParameterValue(sh.pattern)
  const re = flagsNode ? new RegExp(patternNode.value, flagsNode.value) : new RegExp(patternNode.value)
  return re.test(valueNode.value)
}

function validateQualifiedMaxCountProperty (context, focusNode, valueNode, constraint) {
  const count = validateQualifiedHelper(context, focusNode, constraint)
  const qualifiedMaxCountNode = constraint.getParameterValue(sh.qualifiedMaxCount)

  return qualifiedMaxCountNode.termType === 'Literal' && count <= Number(qualifiedMaxCountNode.value)
}

function validateQualifiedMinCountProperty (context, focusNode, valueNode, constraint) {
  const count = validateQualifiedHelper(context, focusNode, constraint)
  const qualifiedMinCountNode = constraint.getParameterValue(sh.qualifiedMinCount)

  return qualifiedMinCountNode.termType === 'Literal' && count >= Number(qualifiedMinCountNode.value)
}

function validateQualifiedHelper (context, focusNode, constraint) {
  const currentShapeNode = constraint.shape.shapeNode
  const qualifiedValueShapesDisjointNode = constraint.getParameterValue(sh.qualifiedValueShapesDisjoint)
  const qualifiedValueShapeNode = constraint.getParameterValue(sh.qualifiedValueShape)

  const siblingShapes = new NodeSet()

  if (context.factory.true.equals(qualifiedValueShapesDisjointNode)) {
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
      !validateQualifiedConformsToASibling(context, value, [...siblingShapes])
    )
    .length
}

function validateQualifiedConformsToASibling (context, value, siblingShapes) {
  for (let i = 0; i < siblingShapes.length; i++) {
    if (context.nodeConformsToShape(value, siblingShapes[i])) {
      return true
    }
  }
  return false
}

function validateUniqueLangProperty (context, focusNode, valueNode, constraint) {
  const uniqueLangNode = constraint.getParameterValue(sh.uniqueLang)

  if (!context.factory.true.equals(uniqueLangNode)) {
    return
  }

  const path = constraint.shape.pathObject
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

function validateXone (context, focusNode, valueNode, constraint) {
  const xoneNode = constraint.getParameterValue(sh.xone)
  const shapes = rdfListToArray(context.$shapes, xoneNode)
  const conformsCount = shapes
    .map(shape => context.nodeConformsToShape(valueNode, shape))
    .filter(Boolean)
    .length

  return conformsCount === 1
}

// Private helper functions

function compareNodes (node1, node2) {
  // TODO: Does not handle the case where nodes cannot be compared
  if (node1 && node1.termType === 'Literal' && node2 && node2.termType === 'Literal') {
    if ((node1.datatype != null) !== (node2.datatype != null)) {
      return null
    } else if (node1.datatype && node2.datatype && node1.datatype.value !== node2.datatype.value) {
      return null
    }
  }
  return compareTerms(node1, node2)
}

function compareTerms (t1, t2) {
  if (!t1) {
    return !t2 ? 0 : 1
  } else if (!t2) {
    return -1
  }

  const bt = t1.termType.localeCompare(t2.termType)
  if (bt !== 0) {
    return bt
  } else {
    // TODO: Does not handle numeric or date comparison
    const bv = t1.value.localeCompare(t2.value)
    if (bv !== 0) {
      return bv
    } else {
      if (t1.termType === 'Literal') {
        const bd = t1.datatype.value.localeCompare(t2.datatype.value)
        if (bd !== 0) {
          return bd
        } else if (rdf.langString.equals(t1.datatype)) {
          return t1.language.localeCompare(t2.language)
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  }
}

module.exports = {
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
  validateXone
}
