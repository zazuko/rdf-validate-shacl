#!/usr/bin/env node --allow-natives-syntax --no-warnings
import { Suite } from 'bench-node'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'
import { walkManifests } from './manifests.js'

const suite = new Suite({
  reporter(results) {
    const report = {}

    for (const result of results) {
      report[result.name] = {
        opsSec: {
          value: result.opsSec,
        },
        time: {
          lower_value: result.histogram.min,
          upper_value: result.histogram.max,
        },
      }
    }

    process.stdout.write(JSON.stringify(report, null, 2))
  },
});

(async () => {
  const testCases = await walkManifests()

  for (const testCase of testCases) {
    suite.add(testCase.label, async (timer) => {
      const shapesGraph = await testCase.getShapes()
      const dataGraph = await testCase.getData()

      timer.start()
      const validator = new SHACLValidator(shapesGraph, { factory: rdf })
      validator.validate(dataGraph)
      timer.end()
    })
  }

  await suite.run()
})()
