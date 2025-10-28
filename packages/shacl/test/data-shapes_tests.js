/* eslint-env mocha */
// This module implements the official SHACL test suite
// https://w3c.github.io/data-shapes/data-shapes-test-suite
import url from 'node:url'
import path from 'node:path'
import { walkManifests as loadTestCases } from 'rdf-validate-shacl-test-harness'
import Validator from '../index.js'

// The following tests fail with the current implementation and are skipped until fixed
const SKIPPED = [
  // https://github.com/w3c/data-shapes/issues/124
  'path-strange-001',
  'path-strange-002',
]

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const manifestPath = path.join(__dirname, 'data', 'data-shapes', 'manifest.ttl')

const testCases = await loadTestCases({
  Validator,
  manifestPath,
})

describe('Official data-shapes test suite', () => {
  testCases.forEach((testCase) => {
    it(testCase.label, async function () {
      this.timeout(3000)
      if (SKIPPED.includes(testCase.node.value)) {
        this.skip()
      } else {
        await testCase.execute()
      }
    })
  })
})
