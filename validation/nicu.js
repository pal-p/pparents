const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validateNicu(mhInput) {
  let errors = {};

  mhInput.hospital = !emptyInput(mhInput.hospital) ? mhInput.hospital : "";
  mhInput.from = !emptyInput(mhInput.from) ? mhInput.from : "";

  if (validator.isEmpty(mhInput.hospital)) {
    errors.hospital = "Hospital field is required";
  }
  if (validator.isEmpty(mhInput.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
