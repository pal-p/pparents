const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validateMHI(mhInput) {
  let errors = {};

  mhInput.problem = !emptyInput(mhInput.problem) ? mhInput.problem : "";
  mhInput.treatment = !emptyInput(mhInput.treatment) ? mhInput.treatment : "";
  mhInput.from = !emptyInput(mhInput.from) ? mhInput.from : "";

  if (validator.isEmpty(mhInput.problem)) {
    errors.problem = "Health issue field is required";
  }
  if (validator.isEmpty(mhInput.treatment)) {
    errors.treatment = "Treatment field is required";
  }
  if (validator.isEmpty(mhInput.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
