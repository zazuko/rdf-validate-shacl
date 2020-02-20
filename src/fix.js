
function lex(term) {
    if (!isLiteral(term)) {
        throw new Error('Not a literal');
    }

    return term.value;
}

function uri(term) {
    if (!isURI(term)) {
        // Mimics previous behavior that calling `uri` when it doesn't exist returns
        // undefined. They seem to depend on it.
        return undefined;
    }

    return term.value;
}

function isBlankNode(term) {
    return term.termType === 'BlankNode';
}

function isLiteral(term) {
    return term.termType === 'Literal';
}

function isURI(term) {
    return term.termType === 'NamedNode';
}

module.exports = { lex, uri, isBlankNode, isLiteral, isURI };
