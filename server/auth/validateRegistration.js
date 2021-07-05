module.exports = function validateRegistrationData(data) {
  let errors = {};

  // Name checks
  if (data.username != '') {
    const regex = /^[a-zA-Z ,.'-]+$/i;
    if (!regex.test(String(data.username))) {
      errors.username = 'Please enter a valid username';
    }
  } else {
    errors.username = 'username cannot be empty';
  }

  // Email checks
  if (data.email != '') {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(String(data.email).toLowerCase())) {
      errors.email = 'Please enter a valid email';
    }
  } else {
    errors.email = 'Email cannot be empty';
  }

  // Password checks
  if (data.password != '') {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (!regex.test(data.password)) {
      errors.password =
        'Password must contain one lowercase, uppercase, numeric and special character. I should be more than 8 characters long';
    }
  } else {
    errors.password = 'Password cannot be empty';
  }

  // Confirm password checks
  if (data.password2 != data.password) {
    errors.password2 = 'Both passwords must match';
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
