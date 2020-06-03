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
    return this.cf.out(sh.resultMessage).terms || []
  }

  get path () {
    return this.cf.out(sh.resultPath).term || null
  }

  get focusNode () {
    return this.cf.out(sh.focusNode).term || null
  }

  get severity () {
    return this.cf.out(sh.resultSeverity).term || null
  }

  get sourceConstraintComponent () {
    return this.cf.out(sh.sourceConstraintComponent).term || null
  }

  get sourceShape () {
    return this.cf.out(sh.sourceShape).term || null
  }
}

module.exports = ValidationReport
