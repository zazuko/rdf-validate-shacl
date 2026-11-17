---
"rdf-validate-shacl": patch
---

Fix `sh:languageIn` to follow SPARQL `langMatches` semantics: match language ranges case-insensitively, require subtag boundaries for prefix matches, and support `*` for any non-empty language tag.
