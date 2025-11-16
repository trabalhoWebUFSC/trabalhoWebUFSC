const Room = require('../models/Room');

/** @type {import('express').RequestHandler} */
const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().select('name pricePerNight capacity photos amenities');
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

/** @type {import('express').RequestHandler} */
const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Quarto não encontrado' });
    }
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllRooms, getRoomById };