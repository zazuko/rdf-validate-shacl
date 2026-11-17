---
"rdf-validate-shacl": patch
---

Fix `sh:minLength` and `sh:maxLength` to count Unicode code points instead of UTF-16 code units, so characters such as emoji count as one character in literals and IRIs.
