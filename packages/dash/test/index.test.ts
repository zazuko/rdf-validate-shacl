/* eslint-env mocha */
// This module implements the official SHACL test suite
// https://w3c.github.io/data-shapes/data-shapes-test-suite
import url from 'node:url'
import path from 'node:path'
import Validator from 'rdf-validate-shacl'
import { walkManifests as loadTestCases } from 'rdf-validate-shacl-test-harness'
import * as dash from '../index.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const manifestPath = path.join(__dirname, 'manifest.ttl')

const testCases = await loadTestCases({
  Validator,
  manifestPath,
  constraintVocabularies: [dash.vocab],
  constraintValidators: [dash.constraints],
})

describe('DASH tests', async () => {
  testCases.forEach((testCase) => it(testCase.label, async function () {
    this.timeout(3000)

    await testCase.execute()
  }))
})
