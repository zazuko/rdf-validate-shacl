// Functions implementing the validators of SHACL-JS
// Also include validators for the constraint components of the DASH namespace

// Also included: implementations of the standard DASH functions

// There is no validator for sh:property as this is expected to be
// natively implemented by the surrounding engine.
const NodeSet = require('./node-set')
const { rdf, sh, xsd } = require('./namespaces')

const XSDIntegerTypes = new NodeSet([
  xsd.integer
])

const XSDDecimalTypes = new NodeSet([
  ...XSDIntegerTypes,
  xsd.decimal,
  xsd.float
])

function validateAnd (context, focusNode, valueNode, constraint) {
  const andNode = constraint.getParameterValue(sh.and)
  const shapes = context.$shapes.rdfListToArray(andNode)
  return shapes.every((shape) => context.nodeConformsToShape(valueNode, shape))
}

function validateClass (context, focusNode, valueNode, constraint) {
  const classNode = constraint.getParameterValue(sh.class)
  return context.$data.isInstanceOf(valueNode, classNode)
}

function validateClosed (context, focusNode, valueNode, constraint) {
  const closedNode = constraint.getParameterValue(sh.closed)
  const ignoredPropertiesNode = constraint.getParameterValue(sh.ignoredProperties)
  const currentShape = constraint.shape.shapeNode

  if (!context.factory.true.equals(closedNode)) {
    return
  }

  const allowed = new NodeSet(
    context.$shapes.cf
      .node(currentShape)
      .out(sh.property)
      .out(sh.path)
      .terms
      .filter((term) => term.termType === 'NamedNode')
  )

  if (ignoredPropertiesNode) {
    allowed.addAll(context.$shapes.rdfListToArray(ignoredPropertiesNode))
  }

  const results = []
  const valueQuads = [...context.$data.match(valueNode, null, null)]
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
    return datatypeNode.equals(valueNode.datatype) && isValidForDatatype(valueNode.value, datatypeNode)
  } else {
    return false
  }
}

function validateDisjoint (context, focusNode, valueNode, constraint) {
  const disjointNode = constraint.getParameterValue(sh.disjoint)
  return !context.$data.hasMatch(focusNode, disjointNode, valueNode)
}

function validateEqualsProperty (context, focusNode, valueNode, constraint) {
  const pathNode = constraint.shape.path
  const equalsNode = constraint.getParameterValue(sh.equals)

  const results = []
  const path = toRDFQueryPath(context.$shapes, pathNode)
  context.$data.getPathObjects(focusNode, path).forEach(value => {
    if (!context.$data.hasMatch(focusNode, equalsNode, value)) {
      results.push({ value })
    }
  })

  const equalsQuads = [...context.$data.match(focusNode, equalsNode, null)]
  equalsQuads.forEach(({ object }) => {
    const value = object
    if (!context.$data.getPathObjects(focusNode, path).some(pathValue => pathValue.equals(value))) {
      results.push({ value })
    }
  })

  return results
}

function validateEqualsNode (context, focusNode, valueNode, constraint) {
  const equalsNode = constraint.getParameterValue(sh.equals)
  const results = []

  let solutions = 0
  context.$data.getPathObjects(focusNode, equalsNode).forEach(value => {
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
  const pathNode = constraint.shape.path
  const path = toRDFQueryPath(context.$shapes, pathNode)
  const hasValueNode = constraint.getParameterValue(sh.hasValue)

  return context.$data
    .getPathObjects(focusNode, path)
    .some(value => value.equals(hasValueNode))
}

function validateIn (context, focusNode, valueNode, constraint) {
  const inNode = constraint.getParameterValue(sh.in)
  return new NodeSet(context.$shapes.rdfListToArray(inNode)).has(valueNode)
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
  const allowedLanguages = context.$shapes.rdfListToArray(languageInNode)

  return allowedLanguages.some(allowedLanguage => valueLanguage.startsWith(allowedLanguage.value))
}

function validateLessThanProperty (context, focusNode, valueNode, constraint) {
  const pathNode = constraint.shape.path
  const valuePath = toRDFQueryPath(context.$shapes, pathNode)
  const values = context.$data.getPathObjects(focusNode, valuePath)
  const lessThanNode = constraint.getParameterValue(sh.lessThan)
  const referenceValues = context.$data.cf.node(focusNode).out(lessThanNode).terms

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
  const pathNode = constraint.shape.path
  const valuePath = toRDFQueryPath(context.$shapes, pathNode)
  const values = context.$data.getPathObjects(focusNode, valuePath)
  const lessThanOrEqualsNode = constraint.getParameterValue(sh.lessThanOrEquals)
  const referenceValues = context.$data.cf.node(focusNode).out(lessThanOrEqualsNode).terms

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
  const pathNode = constraint.shape.path
  const path = toRDFQueryPath(context.$shapes, pathNode)
  const count = context.$data.getPathObjects(focusNode, path).length
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
  const pathNode = constraint.shape.path
  const path = toRDFQueryPath(context.$shapes, pathNode)
  const count = context.$data.getPathObjects(focusNode, path).length
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
  const shapes = context.$shapes.rdfListToArray(orNode)
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
    const qualifiedSiblingShapes = context.$shapes.cf
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

  const pathNode = constraint.shape.path
  const path = toRDFQueryPath(context.$shapes, pathNode)
  return context.$data
    .getPathObjects(focusNode, path)
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

  const pathNode = constraint.shape.path
  const path = toRDFQueryPath(context.$shapes, pathNode)
  const map = {}
  context.$data.getPathObjects(focusNode, path).forEach(value => {
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
  const shapes = context.$shapes.rdfListToArray(xoneNode)
  const conformsCount = shapes
    .map(shape => context.nodeConformsToShape(valueNode, shape))
    .filter(Boolean)
    .length

  return conformsCount === 1
}

// Utilities ------------------------------------------------------------------

function toRDFQueryPath ($shapes, shPath) {
  if (shPath.termType === 'Collection') {
    const paths = $shapes.rdfListToArray(shPath)
    return paths.map(path => toRDFQueryPath($shapes, path))
  }

  if (shPath.termType === 'NamedNode') {
    return shPath
  }

  if (shPath.termType === 'BlankNode') {
    const shPathCf = $shapes.cf.node(shPath)

    const first = shPathCf.out(rdf.first).term
    if (first) {
      const paths = $shapes.rdfListToArray(shPath)
      return paths.map(path => toRDFQueryPath($shapes, path))
    }

    const alternativePath = shPathCf.out(sh.alternativePath).term
    if (alternativePath) {
      const paths = $shapes.rdfListToArray(alternativePath)
      return { or: paths.map(path => toRDFQueryPath($shapes, path)) }
    }

    const zeroOrMorePath = shPathCf.out(sh.zeroOrMorePath).term
    if (zeroOrMorePath) {
      return { zeroOrMore: toRDFQueryPath($shapes, zeroOrMorePath) }
    }

    const oneOrMorePath = shPathCf.out(sh.oneOrMorePath).term
    if (oneOrMorePath) {
      return { oneOrMore: toRDFQueryPath($shapes, oneOrMorePath) }
    }

    const zeroOrOnePath = shPathCf.out(sh.zeroOrOnePath).term
    if (zeroOrOnePath) {
      return { zeroOrOne: toRDFQueryPath($shapes, zeroOrOnePath) }
    }

    const inversePath = shPathCf.out(sh.inversePath).term
    if (inversePath) {
      return { inverse: toRDFQueryPath($shapes, inversePath) }
    }
  }

  throw new Error('Unsupported SHACL path ' + shPath)
  // TODO: implement conforming to AbstractQuery.path syntax
  // return shPath
}

// Private helper functions

// TODO: Support more datatypes
function isValidForDatatype (lex, datatype) {
  if (XSDIntegerTypes.has(datatype)) {
    const r = parseInt(lex)
    return !isNaN(r)
  } else if (XSDDecimalTypes.has(datatype)) {
    const r = parseFloat(lex)
    return !isNaN(r)
  } else if (datatype.value === 'http://www.w3.org/2001/XMLSchema#boolean') {
    return lex === 'true' || lex === 'false'
  } else {
    return true
  }
}

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
  toRDFQueryPath,
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
