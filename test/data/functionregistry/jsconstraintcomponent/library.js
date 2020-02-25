function hasMaxLength($value, $customMaxLength) {
    if($value.termType === "Literal") {
        return $value.value.length <= $customMaxLength.value;
    }
    else if($value.termType === "NamedNode") {
        return $value.value.length <= $customMaxLength.value;
    }
    else { // Blank node
        return false;
    }
}


function constantValid($focusNode, $constantValidation) {
    return $constantValidation.value === "true";
}
