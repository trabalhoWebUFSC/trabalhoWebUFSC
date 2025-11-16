const bookingService = require('../services/bookingService');

/** @type {import('express').RequestHandler} */
const createBooking = async (req, res, next) => {
  try {
    const bookingData = req.body; // { roomId, checkIn, checkOut, people, guestEmail }
    const user = req.user; // Vem do authMiddleware
    
    const newBooking = await bookingService.createBooking(user, bookingData);
    res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
};

/** @type {import('express').RequestHandler} */
const getMyReservations = async (req, res, next) => {
  try {
    const user = req.user;
    const reservations = await bookingService.getMyReservationsForUser(user.email);
    res.status(200).json(reservations);
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getMyReservations };