import path from 'node:path'
import url from 'node:url'
import assert from 'node:assert'
import $rdf from '@zazuko/env-node'
import resource from 'rdf-utils-dataset/resource.js'
import dash from '@vocabulary/dash'
import ns from '../src/namespaces.js'
import env from '../src/defaultEnv.js'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'
import * as constraintValidators from './dash-validators.js'

const { rdfs, rdf, sh } = ns
export const mf = $rdf.namespace('http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#')
export const sht = $rdf.namespace('http://www.w3.org/ns/shacl-test#')

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootManifestPath = path.join(__dirname, 'data', 'data-shapes', 'manifest.ttl')

export async function walkManifests({ mapTestCase = toTestCase, manifestPath = rootManifestPath } = {}) {
  const dir = path.dirname(manifestPath)
  const dataset = await loadDataset(manifestPath)
  const cf = $rdf.clownface({ dataset, factory: $rdf })
  const manifest = cf.node(mf.Manifest).in(rdf.type)

  if (!manifest.term) {
    throw new Error(`No manifest found at ${manifestPath}`)
  }

  const childrenTestCases = await Promise.all(
    manifest
      .out(mf.include)
      .values
      .map((childRelativePath) => {
        const childManifestPath = path.join(dir, childRelativePath)
        return walkManifests({
          mapTestCase,
          manifestPath: childManifestPath,
        })
      }),
  )

  const testCases = [...manifest.out(mf.entries).list()]
    .map((node) => mapTestCase(node, dir))

  return testCases.concat(...childrenTestCases)
}

function toTestCase(node, dir) {
  return new TestCase(node, dir)
}

class TestCase {
  constructor(node, dir) {
    this.node = node
    this.dir = dir
    this.label = node.out(rdfs.label).value
  }

  async getShapes() {
    return this.getGraph(this.node.out(mf.action).out(sht.shapesGraph))
  }

  async getData() {
    return this.getGraph(this.node.out(mf.action).out(sht.dataGraph))
  }

  async getGraph({ value: relativePath }) {
    return this._loadDataset(relativePath)
  }

  async _loadDataset(relativePath) {
    if (relativePath === '') {
      return this.node.dataset
    }

    if (!relativePath.startsWith('.')) {
      relativePath = './' + relativePath
    }

    const filePath = path.resolve(this.dir, relativePath)
    return loadDataset(filePath)
  }

  async execute({ useRdfExt = false } = {}) {
    let data = await this.getData()
    let shapes = await this.getShapes()

    if (!useRdfExt) {
      data = env.dataset([...data])
      shapes = env.dataset([...shapes])
    }

    const validator = new SHACLValidator(shapes, {
      factory: $rdf,
      importGraph: (url) => {
        return this.getGraph(url)
      },
      constraintVocabularies: [dash],
      constraintValidators,
    })
    const expectedReport = this.node.out(mf.result)

    const report = $rdf.clownface({ dataset: (await validator.validate(data)).dataset, factory: $rdf })
      .node(sh.ValidationReport)
      .in(rdf.type)

    const expectedDataset = resource(this.node.dataset, expectedReport.term)

    normalizeReport(report, expectedReport)

    assert.strictEqual(report.dataset.toCanonical(), expectedDataset.toCanonical())
  }
}

// As specified in https://w3c.github.io/data-shapes/data-shapes-test-suite/#Validate
function normalizeReport(report, expectedReport) {
  // Delete messages if expected report doesn't have any
  if (expectedReport.out(sh.result).out(sh.resultMessage).values.length === 0) {
    report.out(sh.result).deleteOut(sh.resultMessage)
  }

  // Delete nested results
  report.out(sh.result).out(sh.detail).out().deleteOut()
  report.out(sh.result).out(sh.detail).deleteOut()
  report.out(sh.result).deleteOut(sh.detail)

  // Split shared blank nodes into distinct blank node structures
  splitSharedBlankNodes(report.dataset)
}

function splitSharedBlankNodes(dataset) {
  const cf = $rdf.clownface({ dataset })

  const predicates = [
    sh.resultPath,
    rdf.first,
    rdf.rest,
    sh.alternativePath,
    sh.zeroOrMorePath,
    sh.oneOrMorePath,
    sh.zeroOrOnePath,
    sh.inversePath,
  ]

  let moreSharedBlanks = true
  while (moreSharedBlanks) {
    const sharedBlanks = cf
      .out(predicates)
      .filter((obj) => obj.term.termType === 'BlankNode' && obj.in().terms.length > 1)
      .terms

    if (sharedBlanks.length === 0) {
      moreSharedBlanks = false
      continue
    }

    sharedBlanks.forEach((sharedBlank) => {
      // Keep the first link to the shared node intact and split the next ones
      const quadsToSplit = [...dataset.match(null, null, sharedBlank)].slice(1)
      quadsToSplit.forEach(({ subject, predicate, object, graph }) => {
        const newBlank = $rdf.blankNode()

        // Replace quad pointing to shared node to new node
        dataset.deleteMatches(subject, predicate, object, graph)
        dataset.add($rdf.quad(subject, predicate, newBlank, graph))

        // Copy shared node structure to new node
        // Nested shared blank nodes will be split in the next iteration
        dataset.match(sharedBlank, null, null).forEach((quad) => {
          dataset.add($rdf.quad(newBlank, quad.predicate, quad.object, quad.graph))
        })
      })
    })
  }
}
