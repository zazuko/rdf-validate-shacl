import path from 'node:path'
import $rdf from '@zazuko/env-node'
import type SHACLValidator from 'rdf-validate-shacl'
import type { Validator } from 'rdf-validate-shacl'
import type sh from '@vocabulary/sh'
import { TestCase } from './TestCase.js'
import { mf } from './ns.js'
import { loadDataset } from './utils.js'

export { loadDataset } from './utils.js'

const { rdf } = $rdf.ns

interface WalkManifests {
  Validator: typeof SHACLValidator
  manifestPath: string
  constraintVocabularies?: Array<typeof sh>
  constraintValidators?: Array<Record<string, Validator>>
}

export async function walkManifests({ Validator, manifestPath, ...rest }: WalkManifests): Promise<TestCase[]> {
  const dir = path.dirname(manifestPath)
  const dataset = await loadDataset(manifestPath)
  const cf = $rdf.clownface({ dataset, factory: $rdf })
  const manifest = cf.node(mf.Manifest).in(rdf.type)

  if (!manifest.term) {
    throw new Error(`No manifest found at ${manifestPath}`)
  }

  const childrenTestCases = await Promise.all(
    manifest
      .out(mf.include)
      .values
      .map((childRelativePath) => {
        const childManifestPath = path.join(dir, childRelativePath)
        return walkManifests({
          Validator,
          manifestPath: childManifestPath,
          ...rest,
        })
      }),
  )

  const testCases = [...manifest.out(mf.entries).list()]
    .map((node) => new TestCase(Validator, {
      node,
      dir,
      ...rest,
    }))

  return testCases.concat(...childrenTestCases)
}
