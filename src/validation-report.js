const clownface = require('clownface')
const DataFactory = require('./data-factory')
const { sh } = require('./namespaces')

/**
 * Result of a SHACL validation.
 */
class ValidationReport {
  constructor (resultsQuads, options) {
    options = options || {}
    this.factory = new DataFactory(options.factory || require('@rdfjs/dataset'))
    const { rdf, sh, xsd } = this.factory.ns

    this.term = this.factory.blankNode('report')
    this.dataset = this.factory.dataset(resultsQuads)

    // Prepare report dataset
    const cf = clownface({ dataset: this.dataset, factory: this.factory })
    const resultNodes = cf.node(sh.ValidationResult).in(rdf.type).terms
    this._conforms = resultNodes.length === 0
    cf.node(this.term)
      .addOut(rdf.type, sh.ValidationReport)
      .addOut(sh.conforms, this.factory.literal(this._conforms.toString(), xsd.boolean))
      .addOut(sh.result, resultNodes)

    this._results = resultNodes.map(resultNode => new ValidationResult(resultNode, this.dataset))
  }

  /**
   * Returns `true` if the data conforms to the defined shapes, `false`
   * otherwise.
   */
  conforms () {
    return this._conforms
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
  constructor (term, dataset) {
    this.term = term
    this.dataset = dataset
    this.cf = clownface({ dataset: dataset }).node(term)
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
    const term = this.cf.out(predicate).term
    return term ? serializeTermValue(term) : null
  }
}

function serializeTermValue (term) {
  if (term.termType === 'BlankNode') {
    return `_:${term.value}`
  }

  return term.value
}

module.exports = ValidationReport
