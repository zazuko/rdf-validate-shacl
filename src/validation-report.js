import factory from './defaultEnv.js'
import { prepareNamespaces } from './namespaces.js'

/**
 * Result of a SHACL validation.
 */
class ValidationReport {
  /**
   * @param {import('clownface').GraphPointer} pointer
   * @param {object} [options]
   * @param {import('./defaultEnv.js').Environment} [options.factory]
   * @param {import('./namespaces.js').Namespaces} [options.ns]
   */
  constructor(pointer, options) {
    options = options || {}
    this.factory = options.factory || factory
    this.ns = options.ns || prepareNamespaces(this.factory)

    const { sh, xsd } = this.ns

    this.pointer = pointer
    this.term = pointer.term
    this.dataset = pointer.dataset

    const resultsPointer = pointer.out(sh.result)

    const conforms = resultsPointer.terms.length === 0
    pointer.addOut(sh.conforms, this.factory.literal(conforms.toString(), xsd.boolean))

    /**
     * `true` if the data conforms to the defined shapes, `false` otherwise.
     */
    this.conforms = conforms

    /**
     * List of `ValidationResult` with details about nodes that don't conform to
     * the given shapes.
     */
    this.results = resultsPointer.toArray().map(resultPointer => new ValidationResult(resultPointer, this.ns))
  }
}

class ValidationResult {
  /**
   * @param {import('clownface').GraphPointer} pointer
   * @param {import('./namespaces.js').Namespaces} ns
   */
  constructor(pointer, ns) {
    this.pointer = pointer
    this.term = pointer.term
    this.dataset = pointer.dataset
    this.ns = ns
  }

  get message() {
    return this.pointer.out(this.ns.sh.resultMessage).terms || []
  }

  get path() {
    return this.pointer.out(this.ns.sh.resultPath).term || null
  }

  get focusNode() {
    return this.pointer.out(this.ns.sh.focusNode).term || null
  }

  get severity() {
    return this.pointer.out(this.ns.sh.resultSeverity).term || null
  }

  get sourceConstraintComponent() {
    return this.pointer.out(this.ns.sh.sourceConstraintComponent).term || null
  }

  get sourceShape() {
    return this.pointer.out(this.ns.sh.sourceShape).term || null
  }

  get value() {
    return this.pointer.out(this.ns.sh.value).term || null
  }

  get detail() {
    return this.pointer.out(this.ns.sh.detail).map(detailResult =>
      new ValidationResult(detailResult, this.ns))
  }
}

export default ValidationReport
