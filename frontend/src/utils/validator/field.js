const validateField = (value) => {
  if (!value || value.trim() === '') return "Fill out this field";
  return '';
}

export { validateField };
