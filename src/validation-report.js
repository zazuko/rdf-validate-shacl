const DataFactory = require('./rdfquery/term-factory')
const { rdf: rdfNS, sh, xsd } = require('./namespaces')

/**
 * Result of a SHACL validation.
 */
class ValidationReport {
  constructor (results, options) {
    options = options || {}
    this.factory = new DataFactory(options.factory || require('@rdfjs/dataset'))

    this._results = groupBy(results, (quad) => quad.subject)
      .map(([nodeTerm, nodeQuads]) => new ValidationResult(nodeTerm, nodeQuads))

    this.term = this.factory.blankNode('report')
    this._dataset = null
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

  /**
   * Get a `DatasetCore` that contains the `sh:ValidationReport`.
   */
  get dataset () {
    if (!this._dataset) {
      this._prepareDataset()
    }

    return this._dataset
  }

  _prepareDataset () {
    const dataset = this.factory.dataset()
    dataset.add(this.factory.quad(this.term, rdfNS.type, this.factory.term('sh:ValidationReport')))
    dataset.add(this.factory.quad(this.term, sh.conforms, this.factory.literal(this.conforms(), xsd.boolean)))

    this.results().forEach((result) => {
      dataset.add(this.factory.quad(this.term, this.factory.term('sh:result'), result.term))
      result.quads.forEach((quad) => dataset.add(quad))
    })

    this._dataset = dataset
  }
}

class ValidationResult {
  constructor (term, quads) {
    this.term = term
    this.quads = quads
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
