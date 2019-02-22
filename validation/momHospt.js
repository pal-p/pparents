const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validateProfile(mhInput) {
  let errors = {};

  mhInput.problem = !emptyInput(mhInput.problem) ? mhInput.problem : "";
  mhInput.hospital = !emptyInput(mhInput.hospital) ? mhInput.hospital : "";

  mhInput.location = !emptyInput(mhInput.location) ? mhInput.location : "";

  mhInput.from = !emptyInput(mhInput.from) ? mhInput.from : "";

  if (validator.isEmpty(mhInput.problem)) {
    errors.problem = "Health issue field is required";
  }
  if (validator.isEmpty(mhInput.hospital)) {
    errors.hospital = "Hospital field is required";
  }
  if (validator.isEmpty(mhInput.location)) {
    errors.location = "Location field is required";
  }
  if (validator.isEmpty(mhInput.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
