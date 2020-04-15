/* eslint-env mocha */
// This module implements the official SHACL test suite
// https://w3c.github.io/data-shapes/data-shapes-test-suite
const assert = require('assert')
const path = require('path')
const $rdf = require('rdf-ext')
const clownface = require('clownface')
const namespace = require('@rdfjs/namespace')
const resource = require('rdf-utils-dataset/resource')
const SHACLValidator = require('../index')
const { rdf, rdfs, sh } = require('../src/namespaces')
const { loadDataset } = require('./utils')

const testDir = path.join(__dirname, 'data', 'data-shapes')
const mf = namespace('http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#')
const sht = namespace('http://www.w3.org/ns/shacl-test#')

// The following tests fail with the current implementation and are skipped until fixed
const SKIPPED = [
  // https://github.com/w3c/data-shapes/issues/124
  'path-strange-001',
  'path-strange-002',

  // TODO: Support non-numeric types in comparison constraints
  'minInclusive-002',
  'minInclusive-003'
]

before(async () => {
  const testCases = await loadTestCases(testDir)

  describe('Official data-shapes test suite', () => {
    testCases.forEach((testCase) => it(testCase.label, async function () {
      if (SKIPPED.includes(testCase.node.value)) {
        this.skip()
      } else {
        await testCase.execute()
      }
    }))
  })
})

it.skip('Dummy test to fetch test configurations', () => {})

async function loadTestCases (dir) {
  const rootManifestPath = path.join(dir, 'manifest.ttl')
  return walkManifests(rootManifestPath)
}

async function walkManifests (manifestPath) {
  const dir = path.dirname(manifestPath)
  const dataset = await loadDataset(manifestPath)
  const cf = clownface({ dataset, factory: $rdf })
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
        return walkManifests(childManifestPath)
      })
  )

  const testCases = rdfListToArray(manifest.out(mf.entries))
    .map((testCaseNode) => new TestCase(testCaseNode, dir))

  return testCases.concat(...childrenTestCases)
}

function rdfListToArray (node) {
  if (!node.term || node.term.equals(rdf.nil)) {
    return []
  }

  const first = node.out(rdf.first)
  const rest = node.out(rdf.rest)
  return [first].concat(rdfListToArray(rest))
}

class TestCase {
  constructor (node, dir) {
    this.node = node
    this.dir = dir
    this.label = node.out(rdfs.label).value
  }

  async getShapes () {
    const relativePath = this.node.out(mf.action).out(sht.shapesGraph).value
    return this._loadDataset(relativePath)
  }

  async getData () {
    const relativePath = this.node.out(mf.action).out(sht.dataGraph).value
    return this._loadDataset(relativePath)
  }

  async _loadDataset (relativePath) {
    if (relativePath === '') {
      return this.node.dataset
    } else {
      const filePath = path.join(this.dir, relativePath)
      return loadDataset(filePath)
    }
  }

  async execute () {
    const data = await this.getData()
    const shapes = await this.getShapes()
    const validator = new SHACLValidator(shapes, { factory: $rdf })
    const expectedReport = this.node.out(mf.result)

    const report = clownface({ dataset: validator.validate(data).dataset, factory: $rdf })
      .node(sh.ValidationReport)
      .in(rdf.type)

    const expectedDataset = resource(this.node.dataset, expectedReport.term)

    normalizeReport(report, expectedReport)

    assert.strictEqual(report.dataset.toCanonical(), expectedDataset.toCanonical())
  }
}

// As specified in https://w3c.github.io/data-shapes/data-shapes-test-suite/#Validate
function normalizeReport (report, expectedReport) {
  // Delete messages if expected report doesn't have any
  if (expectedReport.out(sh.result).out(sh.resultMessage).values.length === 0) {
    report.out(sh.result).deleteOut(sh.resultMessage)
  }

  // Split shared blank nodes into distinct blank node structures
  splitSharedBlankNodes(report.dataset)
}

function splitSharedBlankNodes (dataset) {
  const cf = clownface({ dataset })

  const predicates = [
    sh.resultPath,
    rdf.first,
    rdf.rest,
    sh.alternativePath,
    sh.zeroOrMorePath,
    sh.oneOrMorePath,
    sh.zeroOrOnePath,
    sh.inversePath
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
      quadsToSplit.forEach((quad) => {
        const newBlank = $rdf.blankNode()

        // Replace quad pointing to shared node to new node
        dataset.remove(quad)
        dataset.add($rdf.quad(quad.subject, quad.predicate, newBlank, quad.graph))

        // Copy shared node structure to new node
        // Nested shared blank nodes will be split in the next iteration
        dataset.match(sharedBlank, null, null).forEach((quad) => {
          dataset.add($rdf.quad(newBlank, quad.predicate, quad.object, quad.graph))
        })
      })
    })
  }
}
