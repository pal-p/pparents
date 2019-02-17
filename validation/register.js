const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validateReg(regInput) {
  let errors = {};
  regInput.name = !emptyInput(regInput.name) ? regInput.name : "";
  regInput.email = !emptyInput(regInput.email) ? regInput.email : "";
  regInput.password = !emptyInput(regInput.password) ? regInput.password : "";

  if (!validator.isLength(regInput.name, { min: 2, max: 32 })) {
    errors.name = "Name must be between 2 and 32 characters";
  }
  if (validator.isEmpty(regInput.name)) {
    errors.name = "Name field is required";
  }

  if (!validator.isEmail(regInput.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(regInput.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isLength(regInput.password, { min: 6, max: 25 })) {
    errors.password = "Password must be between 6 and 25 characters";
  }

  if (validator.isEmpty(regInput.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
