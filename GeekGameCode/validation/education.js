const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';



  if(Validator.isEmpty(data.school)){
    errors.school = "school cannot be null!";
  }

  if(Validator.isEmpty(data.degree)){
    errors.degree = "degree cannot be null!";
  }

  if(Validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = "Field cannot be null!";
  }

  if(Validator.isEmpty(data.from)){
    errors.from = "from cannot be null!";
  }

  return {
    errors,
    isValid:isEmpty(errors)
  };
}