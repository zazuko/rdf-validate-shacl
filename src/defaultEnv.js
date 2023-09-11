import Environment from '@rdfjs/environment'
import DataFactory from '@rdfjs/environment/DataFactory.js'
import DatasetFactory from '@rdfjs/environment/DatasetFactory.js'
import NamespaceFactory from '@rdfjs/environment/NamespaceFactory.js'

export default new Environment([
  DataFactory,
  DatasetFactory,
  NamespaceFactory,
])
