/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import * as url from 'url'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '/data/validation-repro')

describe('validation repro', () => {
  it('repro #125', async () => {
    const data = await loadDataset(path.join(rootPath, 'repro125-data.ttl'))
    const shapes =  await loadDataset(path.join(rootPath, 'repro125-shapes.ttl'))

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.equal(1, report.results.length)
    assert.equal(1, report.results[0].detail.length)
  })
})
