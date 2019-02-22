const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validateProfile(profileInput) {
  let errors = {};

  profileInput.babyBirthIssues = !emptyInput(profileInput.babyBirthIssues)
    ? profileInput.babyBirthIssues
    : "";

  if (validator.isEmpty(profileInput.babyBirthIssues)) {
    errors.babyBirthIssues = "babyBirthIssues field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
