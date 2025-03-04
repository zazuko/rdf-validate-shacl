/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import * as url from 'url'
import RDF from '@zazuko/env-node'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '/data/validation-details')

describe('validation details', () => {
  it('creates detail for node constraint', async () => {
    const data = await loadDataset(path.join(rootPath, 'node-constraint-details.ttl'))
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.equal(1, report.results.length)
    const result = report.results[0]
    assert(result.sourceConstraintComponent.equals(RDF.ns.sh.NodeConstraintComponent))
    assert(result.focusNode.equals(RDF.namedNode('https://example.org/person1')))
    assert(result.value.equals(RDF.namedNode('https://example.org/person1')))

    assert.equal(1, result.detail.length)
    const detail = result.detail[0]
    assert(detail.sourceConstraintComponent.equals(RDF.ns.sh.NodeKindConstraintComponent))
    assert(detail.focusNode.equals(RDF.namedNode('https://example.org/person1')))
    assert(detail.value.equals(RDF.namedNode('https://example.org/person1')))
  })
})
