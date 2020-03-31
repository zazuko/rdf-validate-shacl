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
    const conforms = resultNodes.length === 0
    cf.node(this.term)
      .addOut(rdf.type, sh.ValidationReport)
      .addOut(sh.conforms, this.factory.literal(conforms.toString(), xsd.boolean))
      .addOut(sh.result, resultNodes)

    /**
     * `true` if the data conforms to the defined shapes, `false` otherwise.
     */
    this.conforms = conforms

    /**
     * List of `ValidationResult` with details about nodes that don't conform to
     * the given shapes.
     */
    this.results = resultNodes.map(resultNode => new ValidationResult(resultNode, this.dataset))
  }
}

class ValidationResult {
  constructor (term, dataset) {
    this.term = term
    this.dataset = dataset
    this.cf = clownface({ dataset: dataset }).node(term)
  }

  get message () {
    return this._getValue(sh.resultMessage)
  }

  get path () {
    return this._getValue(sh.resultPath)
  }

  get focusNode () {
    return this._getValue(sh.focusNode)
  }

  get severity () {
    const severity = this._getValue(sh.resultSeverity)
    return severity ? severity.split('#')[1] : null
  }

  get sourceConstraintComponent () {
    return this._getValue(sh.sourceConstraintComponent)
  }

  get sourceShape () {
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
