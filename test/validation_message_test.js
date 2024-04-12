/* eslint-env mocha */
import path from 'path'
import assert from 'assert'
import * as url from 'url'
import SHACLValidator from '../index.js'
import { loadDataset } from './utils.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootPath = path.join(__dirname, '/data/validation-message')

describe('validation messages', () => {
  it('Returns message from shape property if provided', async () => {
    const dataPath = path.join(rootPath, 'message-from-shape-property.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message.length, 1)
    assert.strictEqual(report.results[0].message[0].value, 'My custom validation message')
  })

  it('Returns message from validator if provided (and no message on shape)', async () => {
    const dataPath = path.join(rootPath, 'message-from-validator.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message.length, 1)
    assert.strictEqual(report.results[0].message[0].value, 'Predicate is not allowed (closed shape)')
  })

  it('Returns message from constraint component if provided (and no message on shape or validator)', async () => {
    const dataPath = path.join(rootPath, 'message-from-constraint-component.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message.length, 1)
    assert.strictEqual(report.results[0].message[0].value, 'Message on constraint component')
  })

  it('Returns null if no message is defined anywhere', async () => {
    const dataPath = path.join(rootPath, 'message-empty.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.deepStrictEqual(report.results[0].message, [])
  })

  it('Substitutes variables in message', async () => {
    const dataPath = path.join(rootPath, 'message-with-variable.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message.length, 1)
    assert.strictEqual(report.results[0].message[0].value, 'Min count = 1')
  })

  it('Returns all messages if multiple are provided', async () => {
    const dataPath = path.join(rootPath, 'message-from-shape-property-multiple.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message.length, 2)
    const messages = new Set(report.results[0].message.map(({ value, language }) => ({ value, language })))
    assert.deepStrictEqual(messages, new Set([
      { value: 'My custom validation message', language: 'en' },
      { value: 'Mon message de validation', language: 'fr' },
    ]))
  })

  it('Lists first items in message', async () => {
    const dataPath = path.join(rootPath, 'message-with-list.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message.length, 1)
    assert.strictEqual(report.results[0].message[0].value, 'Value is not one of the allowed values: a, b, c ...')
  })
})
