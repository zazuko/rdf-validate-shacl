/* eslint-env mocha */
// This module implements the official SHACL test suite
// https://w3c.github.io/data-shapes/data-shapes-test-suite
import { walkManifests as loadTestCases } from './manifests.js'

// The following tests fail with the current implementation and are skipped until fixed
const SKIPPED = [
  // https://github.com/w3c/data-shapes/issues/124
  'path-strange-001',
  'path-strange-002',
]

before(async () => {
  const testCases = await loadTestCases()

  function runTests() {
    testCases.forEach((testCase) => it(testCase.label, async function () {
      this.timeout(3000)

      if (SKIPPED.includes(testCase.node.value)) {
        this.skip()
      } else {
        await testCase.execute()
      }
    }))
  }

  describe('Official data-shapes test suite', () => {
    runTests()
  })
})

it.skip('Dummy test to fetch test configurations', () => {})
