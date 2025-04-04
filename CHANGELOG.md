## 0.4.4

## 0.5.10

### Patch Changes

- Fix type of `Environment`

## 0.5.9

### Patch Changes

- 13efee7: Export types which were previously exported by `@types/rdf-validate-shacl`

## 0.5.8

### Patch Changes

- accf704: Allow clownface pointer as argument to `.validate`
- a11586f: Do not load SHACL dataset into the Shapes Graph

## 0.5.7

### Patch Changes

- adf47e5: Bundle TypeScript declarations
- f49bdc0: Gracefully handle Property Shapes used inside logical constraints (fixes #140)

## 0.5.6

### Patch Changes

- 6041552: Added a `maxNodeChecks` option to prevent `too much recursion` error caused by cyclic shape references (fixes #136)

## 0.5.5

### Patch Changes

- e2f77f9: Improved result messages with lists
- 1329680: Improve performance of validating `sh:in` constraints

## 0.5.4

### Patch Changes

- 5257789: fix #125 (phantom result details)

## 0.5.3

### Patch Changes

- dcad72a: More strict dependency on `@rdfjs/environment`

## 0.5.2

### Patch Changes

- 4233170: Update example in readme
- 7bae4cc: Update `@rdfjs/environment` to v1 (keep support for v0)

## 0.5.1

### Patch Changes

- 2da8dae: Update rdf-validate-datatype

## 0.5.0

### Minor Changes

- b8d1719: Update to ESM

## 0.4.5

### Patch Changes

- 9047c2b: Update `rdf-validate-datatype` to v0.1.5 (fixes validation of `xsd:gYear`)

### Patch Changes

- f4bcd30: When used with a dataset strictly implementing `DatasetCore` interface, `sh:targetNode` would not validate those nodes

# Changelog

## 0.4.3 (2022-03-03)

- Fix stack overflow caused by recursive shape when creating report
  [[#91]](https://github.com/zazuko/rdf-validate-shacl/pull/91)

## 0.4.2 (2022-01-31)

- Add `allowNamedNodeInList` option to allow named nodes in sequence property paths
  [[#69]](https://github.com/zazuko/rdf-validate-shacl/issues/69)
  [[#87]](https://github.com/zazuko/rdf-validate-shacl/pull/87)

## 0.4.1 (2022-01-19)

- Fix comparison of non-string terms with `sh:lessThan`, `sh:lessThanOrEquals`, etc.
  [[#84]](https://github.com/zazuko/rdf-validate-shacl/pull/84)
  [[#83]](https://github.com/zazuko/rdf-validate-shacl/issues/83)

## 0.4.0 (2021-11-29)

- Provide nested validation results of `sh:node` using `sh:detail`
  [[#82](https://github.com/zazuko/rdf-validate-shacl/pull/82)]
- Do not fail validation when target node doesn't exist in data graph
  [[#66](https://github.com/zazuko/rdf-validate-shacl/issues/66)]
  [[#81](https://github.com/zazuko/rdf-validate-shacl/pull/81)]

## 0.3.3 (2021-11-10)

- Add `ValidationResult.value` getter
  [[#38](https://github.com/zazuko/rdf-validate-shacl/issues/38)]
  [[#78](https://github.com/zazuko/rdf-validate-shacl/pull/78)]
- Fix duplicate validation message for `uniqueLang` constraint
  [[#76](https://github.com/zazuko/rdf-validate-shacl/pull/76)]

## 0.3.2 (2021-05-14)

- Add `validateNode` function to validate a given node against a given shape.
  [[#59](https://github.com/zazuko/rdf-validate-shacl/issues/59)]
  [[#65](https://github.com/zazuko/rdf-validate-shacl/pull/65)]

## 0.3.1 (2021-05-03)

- Use provided data factory everywhere
  [[#52](https://github.com/zazuko/rdf-validate-shacl/issues/52)]
  [[#62](https://github.com/zazuko/rdf-validate-shacl/pull/62)]

## 0.3.0 (2021-04-13)

- BREAKING: the `$shape` and `$data` properties of the `context` passed to
  validators are now a `clownface` object instead of an `RdfLibGraph`.
- Fix comparison of non-numeric literals with `minExclusive`, `maxExclusive`,
  `minInclusive` and `maxInclusive` constraints.
  [[#23](https://github.com/zazuko/rdf-validate-shacl/issues/23)]
  [[#55](https://github.com/zazuko/rdf-validate-shacl/pull/55)]

## 0.2.6 (2021-02-22)

- Replace "<" or ">" in validation messages by "less than" or "more than"
  [[#45](https://github.com/zazuko/rdf-validate-shacl/issues/45)]
  [[#49](https://github.com/zazuko/rdf-validate-shacl/pull/49)]

## 0.2.5 (2020-12-21)

- Fix issue with multi-level inheritance
  [[#41](https://github.com/zazuko/rdf-validate-shacl/issues/41)]
  [[#42](https://github.com/zazuko/rdf-validate-shacl/pull/42)]

## 0.2.4 (2020-10-20)

- Loosen dependencies

## 0.2.3 (2020-07-28)

- Upgrade clownface dependency to 1.X

## 0.2.2 (2020-06-04)

- Fix missing `debug` dependency

## 0.2.1 (2020-05-25)

- Fix `ValidationResult.severity` not returning anything

## 0.2.0 (2020-05-25)

- [BREAKING] Change `ValidationReport` and `ValidationResult` shorthand
  properties to return RDF terms instead of strings
  [[#30](https://github.com/zazuko/rdf-validate-shacl/issues/30)]

## 0.1.3 (2020-04-23)

- Mitigate conflicting blank node issue when using default data factory
  [[#25](https://github.com/zazuko/rdf-validate-shacl/issues/25)]

## 0.1.2 (2020-04-21)

- Include deep blank node structures in validation report
- Add official SHACL test suite
- Fix provided factory not being used to create all quads in the validation
  report
- Performance improvements

## 0.1.1 (2020-04-07)

- Fix custom validation message language not copied in validation report

## 0.1.0 (2020-04-01)

- Initial release
