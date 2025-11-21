const validateField = (value) => {
  if (!value || value.trim() === '') return "Fill in this field";
  return '';
}

export { validateField };
