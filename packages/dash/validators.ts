import { dash } from '@tpluscode/rdf-ns-builders'
import type { Validator } from 'rdf-validate-shacl'

export const singleLine: Validator = {
  component: dash.SingleLineConstraintComponent,
  validate(context, focusNode, valueNode) {
    // check value contains no line breaks
    return !valueNode.value.includes('\n')
  },
}
