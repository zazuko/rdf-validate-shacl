/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import * as url from 'url'
import clownface from 'clownface'
import SHACLValidator from '../index.js'
import ns from '../src/namespaces.js'
import { rdfListToArray } from '../src/dataset-utils.js'
import { loadDataset } from './utils.js'

const { rdfs, sh } = ns

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '/data/validation-sourceShape')

describe('validation source shapes', () => {
  it('Includes source shape without long list', async () => {
    const dataPath = path.join(rootPath, 'long-list.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = await validator.validate(data)

    // three results for the same source shape
    assert.strictEqual(report.results.length, 3)
    const sourceShapes = new Set(report.results.map(result => result.sourceShape))
    assert.strictEqual(sourceShapes.size, 1)
    const [shape] = sourceShapes
    // the shape has a comment instead of sh:in
    assert.deepEqual([], [...report.dataset.match(shape, sh.in, null)])
    const [comment] = report.dataset.match(shape, rdfs.comment, null)
    assert.strictEqual(comment.object.value, 'sh:in has 5 elements and has been removed from the report for brevity. Please refer the original shape')
  })
  it('Includes source shape with list', async () => {
    const dataPath = path.join(rootPath, 'mandatory-list.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = await validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    const sourceShapes = new Set(report.results.map(result => result.sourceShape))
    assert.strictEqual(sourceShapes.size, 1)
    const [shape] = sourceShapes
    // the shape has the lst of allowed values even though the violated constraint is sh:minCount and not sh:in
    const list = clownface({ dataset: report.dataset, term: shape }).out(sh.in)
    const actual = rdfListToArray(list).map(term => term.value)
    assert.deepEqual(actual, ['1', '2', '3'])
  })
})
