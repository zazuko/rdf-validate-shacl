## 0.4.4

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
