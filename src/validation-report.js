const rdf = require('rdf-ext')
const namespace = require('@rdfjs/namespace')

const sh = namespace('http://www.w3.org/ns/shacl#', { factory: rdf })

/**
 * Result of a SHACL validation.
 */
class ValidationReport {
  constructor (results) {
    this._results = groupBy(results, (quad) => quad.subject)
      .map(([nodeId, nodeQuads]) => new ValidationResult(nodeId, nodeQuads))
  }

  /**
   * Returns `true` if the data conforms to the defined shapes, `false`
   * otherwise.
   */
  conforms () {
    return this._results.length === 0
  }

  /**
   * Returns a list of `ValidationResult` with details about nodes that don't
   * conform to the given shapes.
   */
  results () {
    return this._results
  }
}

class ValidationResult {
  constructor (nodeId, nodeQuads) {
    this.nodeId = nodeId
    this.quads = nodeQuads
  }

  message () {
    return this._getValue(sh.resultMessage)
  }

  path () {
    return this._getValue(sh.resultPath)
  }

  focusNode () {
    return this._getValue(sh.focusNode)
  }

  severity () {
    const severity = this._getValue(sh.resultSeverity)
    return severity ? severity.split('#')[1] : null
  }

  sourceConstraintComponent () {
    return this._getValue(sh.sourceConstraintComponent)
  }

  sourceShape () {
    return this._getValue(sh.sourceShape)
  }

  _getValue (predicate) {
    const quad = this.quads.find((quad) => quad.predicate.equals(predicate))
    return quad ? serializeTermValue(quad.object) : null
  }
}

function groupBy (collection, func) {
  const groups = collection.reduce((acc, item) => {
    const key = func(item)
    if (!acc.get(key)) acc.set(key, [])
    acc.get(key).push(item)
    return acc
  }, new Map())

  return Array.from(groups)
}

function serializeTermValue (term) {
  if (term.termType === 'BlankNode') {
    return `_:${term.value}`
  }

  return term.value
}

module.exports = ValidationReport
