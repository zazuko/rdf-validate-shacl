import E from '@rdfjs/environment'
import DataFactory from '@rdfjs/environment/DataFactory.js'
import DatasetFactory from '@rdfjs/environment/DatasetFactory.js'
import NamespaceFactory from '@rdfjs/environment/NamespaceFactory.js'

/**
 * @typedef {import('@rdfjs/environment/Environment.js').Environment<
 *   DataFactory | DatasetFactory | import("@rdfjs/namespace/Factory.js").NamespaceFactory
 * >} Environment
 */

/**
 * @type {Environment}
 */
export default new E([
  DataFactory,
  DatasetFactory,
  NamespaceFactory,
])
