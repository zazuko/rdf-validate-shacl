# rdf-validate-dash

Adds [DASH Constraint Components](https://datashapes.org/constraints.html) to `rdf-validate-shacl`

### Usage

```js
import * as dash from 'rdf-validate-dash';
import Validator from 'rdf-validate-shacl';

let shapesGraph

const validator = new Validator(shapesGraph, {
  constraintVocabularies: [dash.vocabulary],
  constraintValidators: [dash.constraints],
})
```
