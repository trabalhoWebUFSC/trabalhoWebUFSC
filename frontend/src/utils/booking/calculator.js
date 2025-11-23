const calculateReservationCost = (initialDate, finalDate, pricePerNight) => {
  if (!initialDate || !finalDate) return null;

  const start = new Date(initialDate);
  const end = new Date(finalDate);
  
  const diffTime = end - start; 
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  if (diffDays > 0) {
    return {
      nights: diffDays,
      total: diffDays * (pricePerNight || 0)
    };
  }
  
  return null;
};

export { calculateReservationCost };
