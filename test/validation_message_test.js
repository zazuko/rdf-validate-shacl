/* eslint-env mocha */
const path = require('path')
const assert = require('assert')
const { loadDataset } = require('./utils')

const SHACLValidator = require('../index')
const rootPath = path.join(__dirname, '/data/validation-message')

describe('validation messages', () => {
  it('Returns message from shape property if provided', async () => {
    const dataPath = path.join(rootPath, 'message-from-shape-property.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message, 'My custom validation message')
  })

  it('Returns message from validator if provided (and no message on shape)', async () => {
    const dataPath = path.join(rootPath, 'message-from-validator.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message, 'Predicate is not allowed (closed shape)')
  })

  it('Returns message from constraint component if provided (and no message on shape or validator)', async () => {
    const dataPath = path.join(rootPath, 'message-from-constraint-component.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message, 'Message on constraint component')
  })

  it('Returns null if no message is defined anywhere', async () => {
    const dataPath = path.join(rootPath, 'message-empty.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message, null)
  })

  it('Substitutes variables in message', async () => {
    const dataPath = path.join(rootPath, 'message-with-variable.ttl')
    const data = await loadDataset(dataPath)
    const shapes = data

    const validator = new SHACLValidator(shapes)
    const report = validator.validate(data)

    assert.strictEqual(report.results.length, 1)
    assert.strictEqual(report.results[0].message, 'Min count = 1')
  })
})
