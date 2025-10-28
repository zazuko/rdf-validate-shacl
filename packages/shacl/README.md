
# rdf-validate-shacl

Validate RDF data purely in JavaScript. An implementation of the [W3C SHACL](https://www.w3.org/TR/shacl/)
specification on top of the [RDFJS](https://rdf.js.org/) stack.

[![npm version](https://badge.fury.io/js/rdf-validate-shacl.svg)](https://badge.fury.io/js/rdf-validate-shacl)

We provide a [SHACL playground](https://zazuko.github.io/shacl-playground/) based on this library.

## Usage

The library only handles SHACL validation and not data loading/parsing.
The following example uses [rdf-utils-fs](https://github.com/rdf-ext/rdf-utils-fs)
for this purpose. For more information about handling RDF data in JavaScript,
check out [Get started with RDF in JavaScript](https://zazuko.com/get-started/developers/).

The validation function returns a `ValidationReport` object that can be used
to inspect conformance and results. The `ValidationReport` also has a
`.dataset` property, which provides the report as RDF data.

```javascript
import rdf from '@zazuko/env-node'
import SHACLValidator from 'rdf-validate-shacl'

async function main() {
  const shapes = await rdf.dataset().import(rdf.fromFile('my-shapes.ttl'))
  const data = await rdf.dataset().import(rdf.fromFile('my-data.ttl'))

  const validator = new SHACLValidator(shapes, { factory: rdf })
  const report = await validator.validate(data)

  // Check conformance: `true` or `false`
  console.log(report.conforms)

  for (const result of report.results) {
    // See https://www.w3.org/TR/shacl/#results-validation-result for details
    // about each property
    console.log(result.message)
    console.log(result.path)
    console.log(result.focusNode)
    console.log(result.severity)
    console.log(result.sourceConstraintComponent)
    console.log(result.sourceShape)
  }

  // Validation report as RDF dataset
  console.log(await report.dataset.serialize({ format: 'text/n3' }))
}

main();
```

### Usage in the browser

While the validator itself does not use RDF/JS Streams, in most scenarios it will be necessary
to load the data and shapes graphs. In that case, use the environment exported by `@zazuko/env`.

```js
import rdf from '@zazuko/env'

const validator = new SHACLValidator(shapes, { factory: rdf })
```

Note that this will require a bundler that supports polyfilling Node.js core modules, notably, `stream`.

If you already have the data and shapes as `DatasetCore` instances,
such as by parsing JSON-LD with [jsonld](https://www.npmjs.com/package/jsonld) or generating triples programmatically, you can use the lighter export, which does not require node-specific modules.

```js
import rdf from '@zazuko/env/web.js'

const validator = new SHACLValidator(shapes, { factory: rdf })
```

### Validator options

The `SHACLValidator` constructor accepts an optional options object as second
parameter. The available options are:

| Parameter                | type                                                                              |                                                                                                                                      |
|--------------------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| `factory`                | [`DatasetFactory`](https://rdf.js.org/dataset-spec/#datasetcorefactory-interface) |                                                                                                                                      |
| `maxErrors`              | `number`                                                                          | max number of errors after which the validation process should stop. By default, it only stops after all the errors are found.       |
| `allowNamedNodeInList`   | `boolean`                                                                         | SHACL only allows blank nodes in property lists. To allow named nodes to occur in property lists, set this value to `true`.          |
| `importGraph`            | `(url: NamedNode) => DatasetCore \| Promise<DatasetCore>`                         | function to load imported shape graphs.                                                                                              |
| `constraintVocabularies` | `Array<({ factory: DataFactory }) => Quad[]>`                                     | quad factories returning additional vocabulary graphs with SHACL constraints, such as DASH                                           |
| `constraintValidators`   | `Record<string, Validator>`                                                       | custom constraint validators to override or extend the default ones. See [Custom constraints](#custom-constraints) for more details. |

### Custom constraints

You can add custom constraints to the validator by providing a `constraintValidators` and `constraintVocabularies`.
The latter can be skipped if you only intend to override existing constraints.

In a module with validators, export objects which implement the `Validator` interface.

```ts
// dash-validators.js
import type { Validator } from 'rdf-validate-shacl';

export const singleLine: Validator = {
    component: rdf.ns.dash.SingleLineConstraintComponent,
    validate(context, focusNode, valueNode, constraint) {
        return !valueNode.value.includes('\n')
    }
}
```

Then, you can import the validators and pass them to the `SHACLValidator` constructor.
To use DASH, import the module `@vocabulary/dash`.

```ts
import SHACLValidator from 'rdf-validate-shacl'
import { DatasetCore } from '@rdfjs/types'
import dash from '@vocabulary/dash'
import * as constraintValidators from './dash-validators.js'

let shapes: DatasetCore
const validator = new SHACLValidator(shapes, {
    constraintVocabularies: [dash],
    constraintValidators,
})
```

## Running the tests

```
$ npm test
```

## Limitations

*rdf-validate-shacl* does not support [SHACL-SPARQL constraints](https://www.w3.org/TR/shacl/#sparql-constraints)


## About

*rdf-validate-shacl* was originally a fork of
[shacl-js](https://github.com/TopQuadrant/shacl-js) meant to make it compatible
with [RDF/JS](https://rdf.js.org/) libraries.
Since then, we dropped support for the SHACL-JS extension and adapted the API
to suit our needs.
