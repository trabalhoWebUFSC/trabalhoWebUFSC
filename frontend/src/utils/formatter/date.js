export const formatBRLDate = (dateString) => {
  if (!dateString) return '';

  try {
    // ignora a hora (depois do T)
    const cleanDate = dateString.split('T')[0];

    // separa ano, mês e dia
    const [year, month, day] = cleanDate.split('-');

    // retorna formatado para XX/XX/XXXX
    return `${day}/${month}/${year}`;
    
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};
