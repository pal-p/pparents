const validator = require("validator");
const emptyInput = require("./checkEmpty");

module.exports = function validatePost(postInput) {
  let errors = {};
  postInput.text = !emptyInput(postInput.text) ? postInput.text : "";

  if (!validator.isLength(postInput.text, { min: 1, max: 350 })) {
    errors.text = "Post text must be less than or equal to 350 characters";
  }
  if (validator.isEmpty(postInput.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    validation: emptyInput(errors)
  };
};
