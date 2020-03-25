
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
  getLocalName
}
