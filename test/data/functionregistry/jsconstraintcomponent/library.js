function hasMaxLength($value, $customMaxLength) {
    if(F.isLiteral($value)) {
        return F.lex($value).length <= F.lex($customMaxLength);
    }
    else if(F.isURI($value)) {
        return F.uri($value).length <= F.lex($customMaxLength);
    }
    else { // Blank node
        return false;
    }
}


function constantValid($focusNode, $constantValidation) {
    return F.lex($constantValidation) === "true";
}
