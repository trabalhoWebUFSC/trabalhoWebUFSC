/**
 * Calcula o número de noites e o preço total da reserva
 */

export const calculateReservationCost = (initialDate, finalDate, pricePerNight) => {
  if (!initialDate || !finalDate) return null;

  const start = new Date(initialDate);
  const end = new Date(finalDate);
  
  // Diferença em milissegundos
  const diffTime = end - start; 
  
  // Converte para dias
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  if (diffDays > 0) {
    return {
      nights: diffDays,
      total: diffDays * (pricePerNight || 0)
    };
  }
  
  return null;
};
