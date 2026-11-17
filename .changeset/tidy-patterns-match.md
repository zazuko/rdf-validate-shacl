---
"rdf-validate-shacl": patch
---

Fix `sh:pattern` validation with `sh:flags "x"` by ignoring XML whitespace outside character classes without throwing an error.
