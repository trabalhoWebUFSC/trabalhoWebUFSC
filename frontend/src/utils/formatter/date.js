// converte 'YYYY-MM-DD' para 'DD/MM/AAAA'

export const formatBRLDate = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-");

  return `${day}/${month}/${year}`;
};
