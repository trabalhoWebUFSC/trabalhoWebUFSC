const validateField = (value) => {
  if (!value || value.trim() === '') return "Preencha este campo";
  return '';
}

export { validateField };
