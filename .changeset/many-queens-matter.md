---
"rdf-validate-shacl": patch
---

Added a `maxNodeChecks` option to prevent `too much recursion` error caused by cyclic shape references (fixes #136)
