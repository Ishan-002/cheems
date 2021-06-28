module.exports = function validateLoginData(data) {
  let errors = {};

  // Email checks
  if (email == '') {
    errors.email = 'Email is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Password checks
  if (password == '') {
    errors.password = 'Password is required';
  }

  // Check if errors are there or not
  let valid = false;
  if (Object.keys(errors).length === 0) {
    valid = true;
  }

  return {
    errors,
    isValid: valid,
  };
};
