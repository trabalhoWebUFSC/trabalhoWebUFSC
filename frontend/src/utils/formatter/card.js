const formatCard = (value) => {
  const digits = value.replace(/\D/g, '');
  let formattedCard = '';

  for (let i = 0; i < digits.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedCard += ' ';
    }
    formattedCard += digits[i];
  }
  return formattedCard;
}

export { formatCard };
