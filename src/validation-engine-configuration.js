
var ValidationEngineConfiguration = function () {
  // By default validate all errors
  this.validationErrorBatch = -1
}

ValidationEngineConfiguration.prototype.setValidationErrorBatch = function (validationErrorBatch) {
  this.validationErrorBatch = validationErrorBatch
  return this
}

ValidationEngineConfiguration.prototype.getValidationErrorBatch = function () {
  return this.validationErrorBatch
}

module.exports = ValidationEngineConfiguration
