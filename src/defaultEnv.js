import E from '@rdfjs/environment'
import DataFactory from '@rdfjs/data-model/Factory.js'
import DatasetFactory from '@rdfjs/dataset/Factory.js'
import NamespaceFactory from '@rdfjs/namespace/Factory.js'

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
