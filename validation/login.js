const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validateLogin(regInput) {
  let errors = {};
  regInput.email = !emptyInput(regInput.email) ? regInput.email : "";
  regInput.password = !emptyInput(regInput.password) ? regInput.password : "";

  if (!validator.isEmail(regInput.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(regInput.email)) {
    errors.email = "Email field is required";
  }

  if (validator.isEmpty(regInput.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
