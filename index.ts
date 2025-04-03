import type { DatasetCore, NamedNode, Term } from '@rdfjs/types'
import type { AnyPointer } from 'clownface'
import TermSet from '@rdfjs/term-set'
import type { Environment } from './src/defaultEnv.js'
import factory from './src/defaultEnv.js'
import type { Namespaces } from './src/namespaces.js'
import { prepareNamespaces } from './src/namespaces.js'
import ShapesGraph from './src/shapes-graph.js'
import type { ValidatorRegistry } from './src/validation-engine.js'
import ValidationEngine from './src/validation-engine.js'
import type { ShaclPropertyPath } from './src/property-path.js'
import defaultValidators from './src/validators-registry.js'

interface Options {
  factory?: Environment
  /**
   * Max number of errors before the engine stops. Defaults to finding all the errors.
   */
  maxErrors?: number
  allowNamedNodeInList?: boolean
  importGraph?: (url: NamedNode) => Promise<DatasetCore> | DatasetCore
}

/**
 * Validates RDF data based on a set of RDF shapes.
 */
class SHACLValidator {
  declare factory: Environment
  declare ns: Namespaces
  declare allowNamedNodeInList: boolean
  declare $shapes: AnyPointer
  declare $data: AnyPointer
  declare shapesGraph: ShapesGraph
  declare validationEngine: ValidationEngine
  declare depth: number
  declare importGraph?: (url: NamedNode) => Promise<DatasetCore> | DatasetCore
  declare validators: ValidatorRegistry
  private importsLoaded = false

  /**
   * @param shapes - Dataset containing the SHACL shapes for validation
   * @param {object} [options] - Validator options
   */
  constructor(shapes: DatasetCore, options: Options) {
    options = options || {}

    this.factory = options.factory || factory
    this.ns = prepareNamespaces(this.factory)
    this.allowNamedNodeInList = options.allowNamedNodeInList === undefined ? false : options.allowNamedNodeInList
    const dataset = this.factory.dataset([...shapes])
    this.$shapes = this.factory.clownface({ dataset })
    this.$data = this.factory.clownface()
    this.validators = this.factory.termMap(defaultValidators)
    this.shapesGraph = new ShapesGraph(this)
    this.validationEngine = new ValidationEngine(this, options)
    if (options.importGraph) {
      this.importGraph = options.importGraph
    }

    this.depth = 0
  }

  /**
   * Validates the provided data graph against the provided shapes graph
   */
  async validate(dataGraph: DatasetCore | AnyPointer) {
    await this.loadOwlImports()

    this.setDataGraph(dataGraph)
    this.validationEngine.validateAll(this.$data)
    return this.validationEngine.getReport()
  }

  /**
   * Validates the provided focus node against the provided shape
   */
  async validateNode(dataGraph: DatasetCore | AnyPointer, focusNode: Term, shapeNode: Term) {
    await this.loadOwlImports()

    this.setDataGraph(dataGraph)
    this.nodeConformsToShape(focusNode, shapeNode, this.validationEngine)
    return this.validationEngine.getReport()
  }

  private setDataGraph(dataGraph: DatasetCore | AnyPointer) {
    if ('dataset' in dataGraph) {
      this.$data = dataGraph
    } else {
      this.$data = this.factory.clownface({ dataset: dataGraph })
    }
  }

  /**
   * Exposed to be available from validation functions as `SHACL.nodeConformsToShape`
   */
  nodeConformsToShape(focusNode: Term, shapeNode: Term, propertyPathOrEngine?: ValidationEngine | ShaclPropertyPath | null) {
    let engine: ValidationEngine
    let shape = this.shapesGraph?.getShape(shapeNode)

    if (propertyPathOrEngine && 'termType' in propertyPathOrEngine) {
      engine = this.validationEngine.clone({
        recordErrorsLevel: this.validationEngine.recordErrorsLevel,
      })
      shape = shape.overridePath(propertyPathOrEngine)
    } else if (propertyPathOrEngine && 'clone' in propertyPathOrEngine) {
      engine = propertyPathOrEngine
    } else {
      engine = this.validationEngine.clone()
    }
    try {
      this.depth++
      const foundViolations = engine.validateNodeAgainstShape(focusNode, shape, this.$data)
      return !foundViolations
    } finally {
      this.depth--
    }
  }

  validateNodeAgainstShape(focusNode: Term, shapeNode: Term) {
    return this.nodeConformsToShape(focusNode, shapeNode, this.validationEngine)
  }

  private async loadOwlImports() {
    if (this.importsLoaded) {
      return
    }

    this.importsLoaded = true

    const { owl } = this.ns
    const loaded: Set<NamedNode> = new TermSet()

    const doLoad = async (url: NamedNode) => {
      if (!this.importGraph) {
        throw new Error('importGraph parameter is required to load owl:imports')
      }

      const imported = await this.importGraph(url)

      for (const quad of imported) {
        this.$shapes.dataset.add(quad)
      }

      return imported
    }

    const loadFromDataset = (dataset: DatasetCore) => {
      const toImport = new TermSet<NamedNode>()

      for (const { object } of dataset.match(null, owl.imports)) {
        if (object.termType === 'NamedNode' && !loaded.has(object) && !toImport.has(object)) {
          loaded.add(object)
          toImport.add(object)
        }
      }

      return Promise.all([...toImport].map(async (url) => {
        await loadFromDataset(await doLoad(url))
      }))
    }

    await loadFromDataset(this.$shapes.dataset)
  }
}

export default SHACLValidator
