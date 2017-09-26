function hasMaxLength($value, $customMaxLength) {
    if($value.isLiteral()) {
        return $value.lex.length <= $customMaxLength.lex;
    }
    else if($value.isURI()) {
        return $value.uri.length <= $customMaxLength.lex;
    }
    else { // Blank node
        return false;
    }
}


function constantValid($focusNode, $constantValidation) {
    return $constantValidation.lex === "true";
}
