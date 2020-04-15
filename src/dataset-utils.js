
/**
 * Extracts all the quads forming the structure under a blank node. Stops at
 * non-blank nodes.
 *
 * @param {DatasetCore} dataset
 * @param {Term} startNode
 */
function extractStructure (dataset, startNode) {
  if (startNode.termType !== 'BlankNode') {
    return []
  }

  const quads = [...dataset.match(startNode, null, null)]

  const children = quads.map((quad) => {
    return extractStructure(dataset, quad.object)
  })

  return quads.concat(...children)
}

module.exports = {
  extractStructure
}
