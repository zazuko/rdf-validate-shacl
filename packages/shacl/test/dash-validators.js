import rdf from '@zazuko/env-node'

export const singleLine = {
  component: rdf.ns.dash.SingleLineConstraintComponent,
  validate(context, focusNode, valueNode, constraint) {
    // check value contains no line breaks
    return !valueNode.value.includes('\n')
  },
}
