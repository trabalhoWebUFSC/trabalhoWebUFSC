const bookingService = require('../services/bookingService');

const createBooking = async (request, response, next) => {
  try {
    const bookingData = request.body;
    const user = request.user;
    
    const newBooking = await bookingService.createBooking(user, bookingData);
    response.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
};

const getMyReservations = async (request, response, next) => {
  try {
    const user = request.user;
    const reservations = await bookingService.getMyReservationsForUser(user.email);
    
    response.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getMyReservations };