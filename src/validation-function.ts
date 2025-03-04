import { Term } from '@rdfjs/types'
import { Constraint } from './shapes-graph.js'
import { ValidationFunction } from './validation-engine.js'

const globalObject = typeof window !== 'undefined' ? window : global

class ValidationFunctionExecutor {
  constructor(private context: import('../index.js').default, private functionName: string, private func: ValidationFunction) {
  }

  execute(focusNode: Term, valueNode: Term, constraint: Constraint): ReturnType<ValidationFunction> {
    return this.func.apply(globalObject, [this.context, focusNode, valueNode, constraint])
  }
}

export default ValidationFunctionExecutor
