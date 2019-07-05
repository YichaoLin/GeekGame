const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!Validator.isLength(data.handle,{min:2,max:40})){
    errors.handle = "The length of username should be more than 2 and less than 40!";
  }

  if(Validator.isEmpty(data.handle)){
    errors.handle = "handle cannot be null!";
  }

  if(Validator.isEmpty(data.status)){
    errors.status = "status cannot be null!";
  }

  if(Validator.isEmpty(data.skills)){
    errors.skills = "skills cannot be null!";
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
      errors.website = "URL illegal";
    }
  }


  return {
    errors,
    isValid:isEmpty(errors)
  };
}