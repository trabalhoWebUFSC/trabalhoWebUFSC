const Booking = require('../models/Booking');
const Room = require('../models/Room');
// const paymentService = require('./paymentService');

const createBooking = async (user, bookingData) => {
  const { roomId, checkIn, checkOut, people, guestEmail } = bookingData;

  // Validacao do quarto
  const room = await Room.findById(roomId);
  if (!room) throw new Error('Quarto não encontrado');
  if (people > room.capacity) throw new Error('Capacidade do quarto excedida');

  if (
    new Date(checkIn) < new Date(new Date().setHours(0, 0, 0, 0)) ||
    new Date(checkOut) < new Date(new Date().setHours(0, 0, 0, 0)) ||
    new Date(checkOut) <= new Date(checkIn)
  ) {
    throw new Error('Datas inválidas: check-in ou check-out antes de hoje, ou check-out menor/igual ao check-in.');
  }

  // Valida as datas
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

  // Processa pagamento
  // const payment = await paymentService.processPayment(user._id, totalPrice);

  //Cria a reserva
  const newBooking = new Booking({
    user: user._id,
    room: roomId,
    checkIn,
    checkOut,
    numberOfGuests: people,
    totalPrice,
    status: 'confirmed', // Mude para 'pending' se precisar de pagamento
    // payment: payment._id,

    reservedByEmail: user.email,
    companionEmail: guestEmail || null,
  });

  await newBooking.save();
  return newBooking;
};

const getMyReservationsForUser = async (userEmail) => {
  const reservations = await Booking.find({
    $or: [
      { reservedByEmail: userEmail },
      { companionEmail: userEmail }
    ]
  })
    .populate('room', 'name photos') // Traz nome e fotos do quarto
    .sort({ checkIn: -1 }); // Ordena por data (mais novas primeiro)

  return reservations;
};

module.exports = { createBooking, getMyReservationsForUser };