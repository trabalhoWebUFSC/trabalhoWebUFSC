const formatCep = (value) => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length > 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
  }
  return digits;
}

export { formatCep };
