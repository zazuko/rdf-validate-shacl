/* eslint-disable @typescript-eslint/consistent-type-imports */
import E from '@rdfjs/environment'
import DataFactory from '@rdfjs/data-model/Factory.js'
import DatasetFactory from '@rdfjs/dataset/Factory.js'
import NamespaceFactory from '@rdfjs/namespace/Factory.js'
import ClownfaceFactory from 'clownface/Factory.js'

export type Environment = import('@rdfjs/environment/Environment.js').Environment<
DataFactory | DatasetFactory | import('@rdfjs/namespace/Factory.js').NamespaceFactory | import('clownface/Factory.js').default
>

export default new E([
  DataFactory,
  DatasetFactory,
  NamespaceFactory,
  ClownfaceFactory,
]) as Environment
