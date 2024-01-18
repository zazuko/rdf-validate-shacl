import Environment from '@rdfjs/environment'
import DataFactory from '@rdfjs/data-model/Factory.js'
import DatasetFactory from '@rdfjs/dataset/Factory.js'
import NamespaceFactory from '@rdfjs/namespace/Factory.js'

export default new Environment([
  DataFactory,
  DatasetFactory,
  NamespaceFactory,
])
