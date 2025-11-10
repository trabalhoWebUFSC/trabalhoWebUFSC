const validatePassword = (value) => {
  // array of objects with validation rules
  const rules = [ 
    { message: "Password must have at least 8 characters", isValid: value.length >= 8 },
    { message: "Password must have at least one uppercase character", isValid: /[A-Z]/.test(value) },
    { message: "Password must have at least one lowercase character", isValid: /[a-z]/.test(value) },
    { message: "Password must have at least one digit", isValid: /[0-9]/.test(value) },
    { message: "Password must have at least one special character", isValid: /[!@#$%^&*]/.test(value) }
  ];
  return rules;
}

const confirmPassword = (value, password) => {
  if (value !== password) return "Passwords do not match";
  return ''; // returns empty string instead of undefined
}

export { validatePassword, confirmPassword };
