
/**
 * Result of a SHACL validation.
 */
class ValidationReport {
  constructor (g) {
    this.graph = g
    this.validationNode = null
    for (var i = 0; i < g.length; i++) {
      var conforms = g[i]['http://www.w3.org/ns/shacl#conforms']
      if (conforms != null && conforms[0] != null) {
        this.validationNode = g[i]
        break
      }
    }
    if (this.validationNode == null) {
      throw new Error('Cannot find validation report node')
    }
  }

  /**
   * Returns `true` if the data conforms to the defined shapes, `false`
   * otherwise.
   */
  conforms () {
    var conforms = this.validationNode['http://www.w3.org/ns/shacl#conforms'][0]
    if (conforms != null) {
      return conforms['@value'] === 'true'
    }
  }

  /**
   * Returns a list of `ValidationResult` with details about nodes that don't
   * conform to the given shapes.
   */
  results () {
    var results = this.validationNode['http://www.w3.org/ns/shacl#result'] || []
    return results.map((result) => new ValidationResult(this.findNode(result['@id']), this.graph))
  }

  findNode (id) {
    for (var i = 0; i < this.graph.length; i++) {
      if (this.graph[i]['@id'] === id) {
        return this.graph[i]
      }
    }
  }
}

class ValidationResult {
  constructor (resultNode, g) {
    this.graph = g
    this.resultNode = resultNode
  }

  message () {
    return extractValue(this.resultNode, 'http://www.w3.org/ns/shacl#resultMessage')
  }

  path () {
    return extractId(this.resultNode, 'http://www.w3.org/ns/shacl#resultPath')
  }

  focusNode () {
    return extractId(this.resultNode, 'http://www.w3.org/ns/shacl#focusNode')
  }

  severity () {
    var severity = extractId(this.resultNode, 'http://www.w3.org/ns/shacl#resultSeverity')
    if (severity != null) {
      return severity.split('#')[1]
    }
  }

  sourceConstraintComponent () {
    return extractId(this.resultNode, 'http://www.w3.org/ns/shacl#sourceConstraintComponent')
  }

  sourceShape () {
    return extractId(this.resultNode, 'http://www.w3.org/ns/shacl#sourceShape')
  }
}

function extractValue (node, property) {
  var obj = node[property]
  if (obj) {
    return obj[0]['@value']
  }
}

function extractId (node, property) {
  var obj = node[property]
  if (obj) {
    return obj[0]['@id']
  }
}

module.exports = ValidationReport
