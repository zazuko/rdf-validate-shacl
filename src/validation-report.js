const clownface = require('clownface')
const { prepareNamespaces } = require('./namespaces')

/**
 * Result of a SHACL validation.
 */
class ValidationReport {
  constructor (pointer, options) {
    options = options || {}
    this.factory = options.factory || require('@rdfjs/dataset')
    this.ns = options.ns || prepareNamespaces(this.factory)

    const { rdf, sh, xsd } = this.ns

    this.term = pointer.term
    this.dataset = pointer.dataset

    // Prepare report dataset
    // TODO: This probybly doesn't have anything to do here
    const resultNodes = pointer.node(sh.ValidationResult).in(rdf.type).terms
    const conforms = resultNodes.length === 0
    pointer.addOut(sh.conforms, this.factory.literal(conforms.toString(), xsd.boolean))

    /**
     * `true` if the data conforms to the defined shapes, `false` otherwise.
     */
    this.conforms = conforms

    /**
     * List of `ValidationResult` with details about nodes that don't conform to
     * the given shapes.
     */
    this.results = resultNodes.map(resultNode => new ValidationResult(resultNode, this.dataset, this.ns))
  }
}

class ValidationResult {
  constructor (term, dataset, ns) {
    this.term = term
    this.dataset = dataset
    this.ns = ns
    this.cf = clownface({ dataset: dataset }).node(term)
  }

  get message () {
    return this.cf.out(this.ns.sh.resultMessage).terms || []
  }

  get path () {
    return this.cf.out(this.ns.sh.resultPath).term || null
  }

  get focusNode () {
    return this.cf.out(this.ns.sh.focusNode).term || null
  }

  get severity () {
    return this.cf.out(this.ns.sh.resultSeverity).term || null
  }

  get sourceConstraintComponent () {
    return this.cf.out(this.ns.sh.sourceConstraintComponent).term || null
  }

  get sourceShape () {
    return this.cf.out(this.ns.sh.sourceShape).term || null
  }

  get value () {
    return this.cf.out(this.ns.sh.value).term || null
  }
}

module.exports = ValidationReport
