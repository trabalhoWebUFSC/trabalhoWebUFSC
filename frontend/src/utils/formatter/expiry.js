const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '');

  if (digits.length > 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };
  return digits;
}

export { formatExpiry };
