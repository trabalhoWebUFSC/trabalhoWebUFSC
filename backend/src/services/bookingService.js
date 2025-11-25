const Booking = require('../models/Booking');
const Room = require('../models/Room');

/**
 * Cria uma nova reserva
 * @param {object} user - O usuário que está fazendo a reserva
 * @param {object} bookingData - Dados da reserva
 */
const createBooking = async (user, bookingData) => {
  const { roomId, checkIn, checkOut, people, guestEmail } = bookingData;
  
  // Valida o quarto
  const room = await Room.findById(roomId);
  if (!room) throw new Error('Quarto não encontrado');
  if (people > room.capacity) throw new Error('Capacidade do quarto excedida');

  // === validação de data ===
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const hoje = new Date();
  
  // Zera horas para comparar apenas o dia, evitando bug de fuso horario
  hoje.setHours(0, 0, 0, 0); 

  if (checkInDate < hoje) {
    throw new Error('Não é possível fazer reservas para datas passadas.');
  }

  if (checkOutDate <= checkInDate) {
    throw new Error('A data de saída deve ser posterior à data de entrada.');
  }

  // Valida disponibilidade do quarto
  const existingBooking = await Booking.findOne({
    room: roomId,
    status: { $in: ['confirmed', 'pending'] },
    $or: [
      { checkIn: { $lt: checkOut, $gte: checkIn } },
      { checkOut: { $gt: checkIn, $lte: checkOut } },
      { checkIn: { $lte: checkIn }, checkOut: { $gte: checkOut } },
    ],
  });

  if (existingBooking) {
    throw new Error('Datas indisponíveis para este quarto.');
  }
  
  // Calcula o preço
  const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  const totalPrice = nights * room.pricePerNight;
  
  // Cria a reserva
  const newBooking = new Booking({
    // Usa userId porque vem do Token JWT
    user: user.userId, 
    room: roomId,
    checkIn,
    checkOut,
    numberOfGuests: people,
    totalPrice,
    status: 'confirmed',
    reservedByEmail: user.email,
    companionEmail: guestEmail || null, 
  });

  await newBooking.save();
  return newBooking;
};


 // Busca todas as reservas de um usuário
 
const getMyReservationsForUser = async (userEmail) => {
  const reservations = await Booking.find({
    $or: [
      { reservedByEmail: userEmail },
      { companionEmail: userEmail }
    ]
  })
  .populate('room', 'name photos')
  .sort({ checkIn: -1 });

  return reservations;
};


 // Cancela uma reserva existente
 
const cancelBooking = async (user, bookingId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error('Reserva não encontrada');

  // Verifica se o usuário é o dono da reserva
  if (booking.reservedByEmail !== user.email) {
    throw new Error('Você não tem permissão para cancelar esta reserva');
  }

  booking.status = 'cancelled';
  await booking.save();
  return booking;
};


module.exports = { createBooking, getMyReservationsForUser, cancelBooking };