#!/usr/bin/env -S node --allow-natives-syntax --no-warnings
import url from 'node:url'
import { Suite } from 'bench-node'
import rdf from '@zazuko/env-node'
import SHACLValidator from '../index.js'
import { walkManifests } from './manifests.js'

function reporter(results) {
  const report = {}

  for (const result of results) {
    const lowerValue = result.histogram.min / 1000 / 1000
    const upperValue = result.histogram.max / 1000 / 1000
    report[result.name] = {
      throughput: {
        value: result.opsSec,
      },
      latency: {
        value: lowerValue + (upperValue - lowerValue) / 2,
        lower_value: lowerValue,
        upper_value: upperValue,
      },
    }
  }

  process.stdout.write(JSON.stringify(report, null, 2))
}

const suite = new Suite({
  reporter: process.argv.includes('--no-json') ? undefined : reporter,
});

(async () => {
  const testCases = await walkManifests({
    manifestPath: url.fileURLToPath(new URL('data/benchmarks/manifest.ttl', import.meta.url)),
  })

  for (const testCase of testCases) {
    suite.add(testCase.label, async (timer) => {
      const shapesGraph = await testCase.getShapes()
      const dataGraph = await testCase.getData()

      timer.start()
      const validator = new SHACLValidator(shapesGraph, { factory: rdf })
      const report = await validator.validate(dataGraph)
      timer.end()
      if (!report.conforms) {
        throw new Error('SHACL violations found')
      }
    })
  }

  await suite.run()
})()
