// Functions implementing the validators of SHACL-JS
// Also include validators for the constraint components of the DASH namespace

// Also included: implementations of the standard DASH functions

// There is no validator for sh:property as this is expected to be
// natively implemented by the surrounding engine.
const RDFQueryUtil = require('./rdfquery/util')
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

function validateAnd ($context, $value, $and) {
  const shapes = new RDFQueryUtil($context.$shapes).rdfListToArray($and)
  for (let i = 0; i < shapes.length; i++) {
    if (!$context.nodeConformsToShape($value, shapes[i])) {
      return false
    }
  }
  return true
}

function validateClass ($context, $value, $class) {
  return new RDFQueryUtil($context.$data).isInstanceOf($value, $class)
}

function validateClosed ($context, $value, $closed, $ignoredProperties, $currentShape) {
  if (!$context.factory.term('true').equals($closed)) {
    return
  }

  const allowed = new NodeSet(
    $context.$shapes.cf
      .node($currentShape)
      .out(sh.property)
      .out(sh.path)
      .terms
      .filter((term) => term.termType === 'NamedNode')
  )

  if ($ignoredProperties) {
    allowed.addAll(new RDFQueryUtil($context.$shapes).rdfListToArray($ignoredProperties))
  }

  const results = []
  const valueQuads = [...$context.$data.match($value, null, null)]
  valueQuads
    .filter(({ predicate }) => !allowed.has(predicate))
    .forEach(({ predicate, object }) => {
      results.push({ path: predicate, value: object })
    })
  return results
}

function validateDatatype ($context, $value, $datatype) {
  if ($value.termType === 'Literal') {
    return $datatype.equals($value.datatype) && isValidForDatatype($value.value, $datatype)
  } else {
    return false
  }
}

function validateDisjoint ($context, $this, $value, $disjoint) {
  return !$context.$data.hasMatch($this, $disjoint, $value)
}

function validateEqualsProperty ($context, $this, $path, $equals) {
  const results = []
  const path = toRDFQueryPath($context.$shapes, $path)
  $context.$data.getPathObjects($this, path).forEach(value => {
    if (!$context.$data.hasMatch($this, $equals, value)) {
      results.push({ value })
    }
  })

  const equalsQuads = [...$context.$data.match($this, $equals, null)]
  equalsQuads.forEach(({ object }) => {
    const value = object
    if (!$context.$data.getPathObjects($this, path).some(pathValue => pathValue.equals(value))) {
      results.push({ value })
    }
  })

  return results
}

function validateEqualsNode ($context, $this, $equals) {
  const results = []

  let solutions = 0
  $context.$data.getPathObjects($this, $equals).forEach(value => {
    solutions++
    if ($context.compareNodes($this, value) !== 0) {
      results.push({ value })
    }
  })

  if (results.length === 0 && solutions === 0) {
    results.push({ value: $this })
  }

  return results
}

function validateHasValueNode ($context, $this, $hasValue) {
  return $this.equals($hasValue)
}

function validateHasValueProperty ($context, $this, $path, $hasValue) {
  const path = toRDFQueryPath($context.$shapes, $path)
  return $context.$data
    .getPathObjects($this, path)
    .some(value => value.equals($hasValue))
}

function validateIn ($context, $value, $in) {
  return new NodeSet(new RDFQueryUtil($context.$shapes).rdfListToArray($in)).has($value)
}

function validateLanguageIn ($context, $value, $languageIn) {
  if ($value.termType !== 'Literal') {
    return false
  }
  const lang = $value.language
  if (!lang || lang === '') {
    return false
  }
  const ls = new RDFQueryUtil($context.$shapes).rdfListToArray($languageIn)
  for (let i = 0; i < ls.length; i++) {
    if (lang.startsWith(ls[i].value)) {
      return true
    }
  }
  return false
}

function validateLessThanProperty ($context, $this, $path, $lessThan) {
  const valuePath = toRDFQueryPath($context.$shapes, $path)
  const values = $context.$data.getPathObjects($this, valuePath)
  const referenceValues = $context.$data.cf.node($this).out($lessThan).terms

  const invalidValues = []
  for (const value of values) {
    for (const referenceValue of referenceValues) {
      const c = $context.compareNodes(value, referenceValue)
      if (c === null || c >= 0) {
        invalidValues.push({ value })
      }
    }
  }
  return invalidValues
}

function validateLessThanOrEqualsProperty ($context, $this, $path, $lessThanOrEquals) {
  const valuePath = toRDFQueryPath($context.$shapes, $path)
  const values = $context.$data.getPathObjects($this, valuePath)
  const referenceValues = $context.$data.cf.node($this).out($lessThanOrEquals).terms

  const invalidValues = []
  for (const value of values) {
    for (const referenceValue of referenceValues) {
      const c = $context.compareNodes(value, referenceValue)
      if (c === null || c > 0) {
        invalidValues.push({ value })
      }
    }
  }
  return invalidValues
}

function validateMaxCountProperty ($context, $this, $path, $maxCount) {
  const path = toRDFQueryPath($context.$shapes, $path)
  const count = $context.$data.getPathObjects($this, path).length

  return count <= Number($maxCount.value)
}

function validateMaxExclusive ($context, $value, $maxExclusive) {
  return $value.termType === 'Literal' && Number($value.value) < Number($maxExclusive.value)
}

function validateMaxInclusive ($context, $value, $maxInclusive) {
  return $value.termType === 'Literal' && Number($value.value) <= Number($maxInclusive.value)
}

function validateMaxLength ($context, $value, $maxLength) {
  if ($value.termType === 'BlankNode') {
    return false
  }
  return $value.value.length <= Number($maxLength.value)
}

function validateMinCountProperty ($context, $this, $path, $minCount) {
  const path = toRDFQueryPath($context.$shapes, $path)
  const count = $context.$data.getPathObjects($this, path).length

  return count >= Number($minCount.value)
}

function validateMinExclusive ($context, $value, $minExclusive) {
  return $value.termType === 'Literal' && Number($value.value) > Number($minExclusive.value)
}

function validateMinInclusive ($context, $value, $minInclusive) {
  return $value.termType === 'Literal' && Number($value.value) >= Number($minInclusive.value)
}

function validateMinLength ($context, $value, $minLength) {
  if ($value.termType === 'BlankNode') {
    return false
  }
  return $value.value.length >= Number($minLength.value)
}

function validateNodeKind ($context, $value, $nodeKind) {
  if ($value.termType === 'BlankNode') {
    return sh.BlankNode.equals($nodeKind) ||
      sh.BlankNodeOrIRI.equals($nodeKind) ||
      sh.BlankNodeOrLiteral.equals($nodeKind)
  } else if ($value.termType === 'NamedNode') {
    return sh.IRI.equals($nodeKind) ||
      sh.BlankNodeOrIRI.equals($nodeKind) ||
      sh.IRIOrLiteral.equals($nodeKind)
  } else if ($value.termType === 'Literal') {
    return sh.Literal.equals($nodeKind) ||
      sh.BlankNodeOrLiteral.equals($nodeKind) ||
      sh.IRIOrLiteral.equals($nodeKind)
  }
}

function validateNode ($context, $value, $node) {
  return $context.nodeConformsToShape($value, $node)
}

function validateNot ($context, $value, $not) {
  return !$context.nodeConformsToShape($value, $not)
}

function validateOr ($context, $value, $or) {
  const shapes = new RDFQueryUtil($context.$shapes).rdfListToArray($or)
  for (let i = 0; i < shapes.length; i++) {
    if ($context.nodeConformsToShape($value, shapes[i])) {
      return true
    }
  }
  return false
}

function validatePattern ($context, $value, $pattern, $flags) {
  if ($value.termType === 'BlankNode') {
    return false
  }
  const re = $flags ? new RegExp($pattern.value, $flags.value) : new RegExp($pattern.value)
  return re.test($value.value)
}

function validateQualifiedMaxCountProperty ($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $qualifiedMaxCount, $currentShape) {
  const c = validateQualifiedHelper($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $currentShape)
  return $qualifiedMaxCount.termType === 'Literal' && c <= Number($qualifiedMaxCount.value)
}

function validateQualifiedMinCountProperty ($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $qualifiedMinCount, $currentShape) {
  const c = validateQualifiedHelper($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $currentShape)
  return $qualifiedMinCount.termType === 'Literal' && c >= Number($qualifiedMinCount.value)
}

function validateQualifiedHelper ($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $currentShape) {
  const siblingShapes = new NodeSet()

  if ($context.factory.term('true').equals($qualifiedValueShapesDisjoint)) {
    const qualifiedSiblingShapes = $context.$shapes.cf
      .node($currentShape)
      // Move up to parent
      .in(sh.property)
      // Move down to all siblings
      .out(sh.property)
      // Select sh:qualifiedValueShape of all siblings
      .out(sh.qualifiedValueShape)
      .filter(({ term }) => !term.equals($qualifiedValueShape))
      .terms

    siblingShapes.addAll(qualifiedSiblingShapes)
  }

  const path = toRDFQueryPath($context.$shapes, $path)
  return $context.$data
    .getPathObjects($this, path)
    .filter(value =>
      $context.nodeConformsToShape(value, $qualifiedValueShape) &&
      !validateQualifiedConformsToASibling($context, value, [...siblingShapes])
    )
    .length
}

function validateQualifiedConformsToASibling ($context, value, siblingShapes) {
  for (let i = 0; i < siblingShapes.length; i++) {
    if ($context.nodeConformsToShape(value, siblingShapes[i])) {
      return true
    }
  }
  return false
}

function validateUniqueLangProperty ($context, $this, $uniqueLang, $path) {
  if (!$context.factory.term('true').equals($uniqueLang)) {
    return
  }

  const path = toRDFQueryPath($context.$shapes, $path)
  const map = {}
  $context.$data.getPathObjects($this, path).forEach(value => {
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

function validateXone ($context, $value, $xone) {
  const shapes = new RDFQueryUtil($context.$shapes).rdfListToArray($xone)
  let count = 0
  for (let i = 0; i < shapes.length; i++) {
    if ($context.nodeConformsToShape($value, shapes[i])) {
      count++
    }
  }
  return count === 1
}

// Utilities ------------------------------------------------------------------

function toRDFQueryPath ($shapes, shPath) {
  if (shPath.termType === 'Collection') {
    const paths = new RDFQueryUtil($shapes).rdfListToArray(shPath)
    const result = []
    for (let i = 0; i < paths.length; i++) {
      result.push(toRDFQueryPath($shapes, paths[i]))
    }
    return result
  }

  if (shPath.termType === 'NamedNode') {
    return shPath
  }

  if (shPath.termType === 'BlankNode') {
    const shPathCf = $shapes.cf.node(shPath)
    const util = new RDFQueryUtil($shapes)

    const first = shPathCf.out(rdf.first).term
    if (first) {
      const paths = util.rdfListToArray(shPath)
      const result = []
      for (let i = 0; i < paths.length; i++) {
        result.push(toRDFQueryPath($shapes, paths[i]))
      }
      return result
    }

    const alternativePath = shPathCf.out(sh.alternativePath).term
    if (alternativePath) {
      const paths = util.rdfListToArray(alternativePath)
      const result = []
      for (let i = 0; i < paths.length; i++) {
        result.push(toRDFQueryPath($shapes, paths[i]))
      }
      return { or: result }
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