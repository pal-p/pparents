const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validateBMI(mhInput) {
  let errors = {};

  mhInput.illness = !emptyInput(mhInput.illness) ? mhInput.illness : "";
  mhInput.from = !emptyInput(mhInput.from) ? mhInput.from : "";

  if (validator.isEmpty(mhInput.illness)) {
    errors.illness = "Illness field is required";
  }
  if (validator.isEmpty(mhInput.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
