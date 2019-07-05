const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if(!Validator.isLength(data.name,{min:2,max:30})){
    errors.name = "Length of name should be more than 2 and less than 30!";
  }

  if(Validator.isEmpty(data.name)){
    errors.name = "name cannot be null!";
  }

  if(Validator.isEmpty(data.email)){
    errors.email = "email cannot be null!";
  }

  if(!Validator.isEmail(data.email)){
    errors.email = "illegal email!";
  }

  if(Validator.isEmpty(data.password)){
    errors.password = "password cannot be null!";
  }

  if(!Validator.isLength(data.password,{min:6,max:30})){
    errors.password = "Length of password should be more than 6 and less than 30!";
  }

  if(Validator.isEmpty(data.password2)){
    errors.password2 = "password cannot be null!";
  }

  if(!Validator.equals(data.password,data.password2)){
    errors.password2 = "password not the same !";
  }



  return {
    errors,
    isValid:isEmpty(errors)
  };
}