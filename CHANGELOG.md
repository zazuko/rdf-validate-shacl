
# Changelog


## Next version (TBA)

*


## 0.2.2 (2020-06-04)

* Fix missing `debug` dependency


## 0.2.1 (2020-05-25)

* Fix `ValidationResult.severity` not returning anything


## 0.2.0 (2020-05-25)

* [BREAKING] Change `ValidationReport` and `ValidationResult` shorthand
  properties to return RDF terms instead of strings
  [[#30](https://github.com/zazuko/rdf-validate-shacl/issues/30)]


## 0.1.3 (2020-04-23)

* Mitigate conflicting blank node issue when using default data factory
  [[#25](https://github.com/zazuko/rdf-validate-shacl/issues/25)]


## 0.1.2 (2020-04-21)

* Include deep blank node structures in validation report
* Add official SHACL test suite
* Fix provided factory not being used to create all quads in the validation
  report
* Performance improvements


## 0.1.1 (2020-04-07)

* Fix custom validation message language not copied in validation report


## 0.1.0 (2020-04-01)

* Initial release
