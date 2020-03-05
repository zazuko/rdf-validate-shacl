// Functions implementing the validators of SHACL-JS
// Also include validators for the constraint components of the DASH namespace

// Also included: implementations of the standard DASH functions

// There is no validator for sh:property as this is expected to be
// natively implemented by the surrounding engine.
var RDFQuery = require('./rdfquery')
var RDFQueryUtil = require('./rdfquery/util')
var NodeSet = RDFQuery.NodeSet
var T = RDFQuery.T

var XSDIntegerTypes = new NodeSet()
XSDIntegerTypes.add(T('xsd:integer'))

var XSDDecimalTypes = new NodeSet()
XSDDecimalTypes.addAll(XSDIntegerTypes.toArray())
XSDDecimalTypes.add(T('xsd:decimal'))
XSDDecimalTypes.add(T('xsd:float'))

function validateAnd ($context, $value, $and) {
  var shapes = new RDFQueryUtil($context.$shapes).rdfListToArray($and)
  for (var i = 0; i < shapes.length; i++) {
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
  if (!T('true').equals($closed)) {
    return
  }
  var allowed = $context.$shapes.query()
    .match($currentShape, 'sh:property', '?propertyShape')
    .match('?propertyShape', 'sh:path', '?path')
    .filter(function (solution) { return solution.path.termType === 'NamedNode' })
    .getNodeSet('?path')
  if ($ignoredProperties) {
    allowed.addAll(new RDFQueryUtil($context.$shapes).rdfListToArray($ignoredProperties))
  }
  var results = []
  $context.$data.query()
    .match($value, '?predicate', '?object')
    .filter(function (sol) { return !allowed.contains(sol.predicate) })
    .forEach(function (sol) {
      results.push({
        path: sol.predicate,
        value: sol.object
      })
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
  return !$context.$data.query().match($this, $disjoint, $value).hasSolution()
}

function validateEqualsProperty ($context, $this, $path, $equals) {
  var results = []
  var path = toRDFQueryPath($context, $path)
  $context.$data.query().path($this, path, '?value').forEach(
    function (solution) {
      if (!$context.$data.query().match($this, $equals, solution.value).hasSolution()) {
        results.push({
          value: solution.value
        })
      }
    })
  $context.$data.query().match($this, $equals, '?value').forEach(
    function (solution) {
      if (!$context.$data.query().path($this, path, solution.value).hasSolution()) {
        results.push({
          value: solution.value
        })
      }
    })
  return results
}

var validateEqualsNode = function ($context, $this, $equals) {
  var results = []
  var solutions = 0
  $context.$data.query().path($this, $equals, '?value').forEach(
    function (solution) {
      solutions++
      if ($context.compareNodes($this, solution.value) !== 0) {
        results.push({
          value: solution.value
        })
      }
    })
  if (results.length === 0 && solutions === 0) {
    results.push({
      value: $this
    })
  }
  return results
}

function validateHasValueNode ($context, $this, $hasValue) {
  return $this.equals($hasValue)
}

function validateHasValueProperty ($context, $this, $path, $hasValue) {
  var count = $context.$data.query().path($this, toRDFQueryPath($context, $path), $hasValue).getCount()
  return count > 0
}

function validateIn ($context, $value, $in) {
  var set = new NodeSet()
  set.addAll(new RDFQueryUtil($context.$shapes).rdfListToArray($in))
  return set.contains($value)
}

function validateLanguageIn ($context, $value, $languageIn) {
  if ($value.termType !== 'Literal') {
    return false
  }
  var lang = $value.language
  if (!lang || lang === '') {
    return false
  }
  var ls = new RDFQueryUtil($context.$shapes).rdfListToArray($languageIn)
  for (var i = 0; i < ls.length; i++) {
    if (lang.startsWith(ls[i].value)) {
      return true
    }
  }
  return false
}

function validateLessThanProperty ($context, $this, $path, $lessThan) {
  var results = []
  $context.$data.query()
    .path($this, toRDFQueryPath($context, $path), '?value')
    .match($this, $lessThan, '?otherValue')
    .forEach(function (sol) {
      var c = $context.compareNodes(sol.value, sol.otherValue)
      if (c == null || c >= 0) {
        results.push({
          value: sol.value
        })
      }
    })
  return results
}

function validateLessThanOrEqualsProperty ($context, $this, $path, $lessThanOrEquals) {
  var results = []
  $context.$data.query()
    .path($this, toRDFQueryPath($context, $path), '?value')
    .match($this, $lessThanOrEquals, '?otherValue')
    .forEach(function (sol) {
      var c = $context.compareNodes(sol.value, sol.otherValue)
      if (c == null || c > 0) {
        results.push({
          value: sol.value
        })
      }
    })
  return results
}

function validateMaxCountProperty ($context, $this, $path, $maxCount) {
  var count = $context.$data.query().path($this, toRDFQueryPath($context, $path), '?any').getCount()
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
  var count = $context.$data.query().path($this, toRDFQueryPath($context, $path), '?any').getCount()
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
    return T('sh:BlankNode').equals($nodeKind) ||
      T('sh:BlankNodeOrIRI').equals($nodeKind) ||
      T('sh:BlankNodeOrLiteral').equals($nodeKind)
  } else if ($value.termType === 'NamedNode') {
    return T('sh:IRI').equals($nodeKind) ||
      T('sh:BlankNodeOrIRI').equals($nodeKind) ||
      T('sh:IRIOrLiteral').equals($nodeKind)
  } else if ($value.termType === 'Literal') {
    return T('sh:Literal').equals($nodeKind) ||
      T('sh:BlankNodeOrLiteral').equals($nodeKind) ||
      T('sh:IRIOrLiteral').equals($nodeKind)
  }
}

function validateNode ($context, $value, $node) {
  return $context.nodeConformsToShape($value, $node)
}

function validateNot ($context, $value, $not) {
  return !$context.nodeConformsToShape($value, $not)
}

function validateOr ($context, $value, $or) {
  var shapes = new RDFQueryUtil($context.$shapes).rdfListToArray($or)
  for (var i = 0; i < shapes.length; i++) {
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
  var re = $flags ? new RegExp($pattern.value, $flags.value) : new RegExp($pattern.value)
  return re.test($value.value)
}

function validateQualifiedMaxCountProperty ($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $qualifiedMaxCount, $currentShape) {
  var c = validateQualifiedHelper($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $currentShape)
  return $qualifiedMaxCount.termType === 'Literal' && c <= Number($qualifiedMaxCount.value)
}

function validateQualifiedMinCountProperty ($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $qualifiedMinCount, $currentShape) {
  var c = validateQualifiedHelper($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $currentShape)
  return $qualifiedMinCount.termType === 'Literal' && c >= Number($qualifiedMinCount.value)
}

function validateQualifiedHelper ($context, $this, $path, $qualifiedValueShape, $qualifiedValueShapesDisjoint, $currentShape) {
  var siblingShapes = new NodeSet()
  if (T('true').equals($qualifiedValueShapesDisjoint)) {
    $context.$shapes.query()
      .match('?parentShape', 'sh:property', $currentShape)
      .match('?parentShape', 'sh:property', '?sibling')
      .match('?sibling', 'sh:qualifiedValueShape', '?siblingShape')
      .filter(RDFQuery.exprNotEquals('?siblingShape', $qualifiedValueShape))
      .addAllNodes('?siblingShape', siblingShapes)
  }
  return $context.$data.query()
    .path($this, toRDFQueryPath($context, $path), '?value')
    .filter(function (sol) {
      return $context.nodeConformsToShape(sol.value, $qualifiedValueShape) &&
        !validateQualifiedConformsToASibling($context, sol.value, siblingShapes.toArray())
    })
    .getCount()
}

function validateQualifiedConformsToASibling ($context, value, siblingShapes) {
  for (var i = 0; i < siblingShapes.length; i++) {
    if ($context.nodeConformsToShape(value, siblingShapes[i])) {
      return true
    }
  }
  return false
}

function validateUniqueLangProperty ($context, $this, $uniqueLang, $path) {
  if (!T('true').equals($uniqueLang)) {
    return
  }
  var map = {}
  $context.$data.query().path($this, toRDFQueryPath($context, $path), '?value').forEach(function (sol) {
    var lang = sol.value.language
    if (lang && lang !== '') {
      var old = map[lang]
      if (!old) {
        map[lang] = 1
      } else {
        map[lang] = old + 1
      }
    }
  })
  var results = []
  for (var lang in map) {
    if (Object.prototype.hasOwnProperty.call(map, lang)) {
      var count = map[lang]
      if (count > 1) {
        results.push('Language "' + lang + '" has been used by ' + count + ' values')
      }
    }
  }
  return results
}

function validateXone ($context, $value, $xone) {
  var shapes = new RDFQueryUtil($context.$shapes).rdfListToArray($xone)
  var count = 0
  for (var i = 0; i < shapes.length; i++) {
    if ($context.nodeConformsToShape($value, shapes[i])) {
      count++
    }
  }
  return count === 1
}

// Utilities ------------------------------------------------------------------

function toRDFQueryPath ($context, shPath) {
  if (shPath.termType === 'Collection') {
    var paths = new RDFQueryUtil($context.$shapes).rdfListToArray(shPath)
    var result = []
    for (var i = 0; i < paths.length; i++) {
      result.push(toRDFQueryPath($context, paths[i]))
    }
    return result
  }
  if (shPath.termType === 'NamedNode') {
    return shPath
  } else if (shPath.termType === 'BlankNode') {
    var util = new RDFQueryUtil($context.$shapes)
    if ($context.$shapes.query().getObject(shPath, 'rdf:first')) {
      const paths = util.rdfListToArray(shPath)
      const result = []
      for (let i = 0; i < paths.length; i++) {
        result.push(toRDFQueryPath($context, paths[i]))
      }
      return result
    }
    var alternativePath = $context.$shapes.query().getObject(shPath, 'sh:alternativePath')
    if (alternativePath) {
      const paths = util.rdfListToArray(alternativePath)
      const result = []
      for (let i = 0; i < paths.length; i++) {
        result.push(toRDFQueryPath($context, paths[i]))
      }
      return { or: result }
    }
    var zeroOrMorePath = $context.$shapes.query().getObject(shPath, 'sh:zeroOrMorePath')
    if (zeroOrMorePath) {
      return { zeroOrMore: toRDFQueryPath($context, zeroOrMorePath) }
    }
    var oneOrMorePath = $context.$shapes.query().getObject(shPath, 'sh:oneOrMorePath')
    if (oneOrMorePath) {
      return { oneOrMore: toRDFQueryPath($context, oneOrMorePath) }
    }
    var zeroOrOnePath = $context.$shapes.query().getObject(shPath, 'sh:zeroOrOnePath')
    if (zeroOrOnePath) {
      return { zeroOrOne: toRDFQueryPath($context, zeroOrOnePath) }
    }
    var inversePath = $context.$shapes.query().getObject(shPath, 'sh:inversePath')
    if (inversePath) {
      return { inverse: toRDFQueryPath($context, inversePath) }
    }
  }
  throw new Error('Unsupported SHACL path ' + shPath)
  // TODO: implement conforming to AbstractQuery.path syntax
  // return shPath
}

// Private helper functions

// TODO: Support more datatypes
function isValidForDatatype (lex, datatype) {
  if (XSDIntegerTypes.contains(datatype)) {
    const r = parseInt(lex)
    return !isNaN(r)
  } else if (XSDDecimalTypes.contains(datatype)) {
    const r = parseFloat(lex)
    return !isNaN(r)
  } else if (datatype.value === 'http://www.w3.org/2001/XMLSchema#boolean') {
    return lex === 'true' || lex === 'false'
  } else {
    return true
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
