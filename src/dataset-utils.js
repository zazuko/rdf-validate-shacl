const formats = require("@rdfjs/formats-common");
const rdf = require("rdf-ext");
const stringToStream = require("string-to-stream");

function stringToDataset (mediaType, string) {
    return rdf.dataset().import(formats.parsers.import(mediaType, stringToStream(string)));
}

module.exports = {
    stringToDataset,
}
