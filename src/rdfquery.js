const { rdf } = require('./namespaces')

function compareTerms (t1, t2) {
  if (!t1) {
    return !t2 ? 0 : 1
  } else if (!t2) {
    return -1
  }
  const bt = t1.termType.localeCompare(t2.termType)
  if (bt !== 0) {
    return bt
  } else {
    // TODO: Does not handle numeric or date comparison
    const bv = t1.value.localeCompare(t2.value)
    if (bv !== 0) {
      return bv
    } else {
      if (t1.termType === 'Literal') {
        const bd = t1.datatype.value.localeCompare(t2.datatype.value)
        if (bd !== 0) {
          return bd
        } else if (rdf.langString.equals(t1.datatype)) {
          return t1.language.localeCompare(t2.language)
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  }
}

function getLocalName (uri) {
  // TODO: This is not the 100% correct local name algorithm
  let index = uri.lastIndexOf('#')
  if (index < 0) {
    index = uri.lastIndexOf('/')
  }
  if (index < 0) {
    throw new Error('Cannot get local name of ' + uri)
  }
  return uri.substring(index + 1)
}

module.exports = {
  getLocalName,
  compareTerms
}
