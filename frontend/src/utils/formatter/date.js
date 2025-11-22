/**
 * Formata uma data string ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss)
 * para o formato brasileiro (DD/MM/YYYY).
 * * @param {string} dateString - Data vinda do backend
 * @returns {string} Data formatada
 */
export const formatBRLDate = (dateString) => {
  if (!dateString) return '';

  try {
    // 1. Garante que pegamos apenas a parte da data, ignorando a hora (depois do T)
    // Ex: "2025-11-27T00:00:00.000Z" vira apenas "2025-11-27"
    const cleanDate = dateString.split('T')[0];

    // 2. Separa ano, mês e dia
    const [year, month, day] = cleanDate.split('-');

    // 3. Retorna montado: Dia / Mês / Ano
    return `${day}/${month}/${year}`;
    
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return dateString; // Retorna original em caso de erro
  }
};
