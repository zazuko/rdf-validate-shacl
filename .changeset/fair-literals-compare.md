---
"rdf-validate-shacl": patch
---

Fix literal comparisons in value range constraints, `sh:lessThan`, and `sh:lessThanOrEquals`. Compare strings by Unicode code point order instead of locale-sensitive collation, and report violations for unsupported or incompatible datatypes, invalid lexical forms, and `NaN` comparisons.
