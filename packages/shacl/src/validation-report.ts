import type { GraphPointer } from 'clownface'
import type { DatasetCore, Term } from '@rdfjs/types'
import type { Environment } from './defaultEnv.js'
import factory from './defaultEnv.js'
import type { Namespaces } from './namespaces.js'
import { prepareNamespaces } from './namespaces.js'
import type { ExtractDataset } from './dataset-utils.js'

/**
 * Result of a SHACL validation.
 */
export class ValidationReport<E extends Environment> {
  declare factory: E
  declare ns: Namespaces
  declare pointer: GraphPointer
  declare term: Term
  declare dataset: ExtractDataset<E>
  declare conforms: boolean
  // eslint-disable-next-line no-use-before-define
  declare results: ValidationResult<ExtractDataset<E>>[]

  constructor(pointer: GraphPointer<Term, ExtractDataset<E>>, options: { factory?: E; ns?: Namespaces } = {}) {
    this.factory = options.factory || (factory as E)
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

export class ValidationResult<D extends DatasetCore> {
  declare term: Term
  declare dataset: D

  constructor(private pointer: GraphPointer<Term, D>, private ns: Namespaces) {
    this.term = pointer.term
    this.dataset = pointer.dataset
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
