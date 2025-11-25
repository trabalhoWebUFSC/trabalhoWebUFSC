const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, bookingController.createBooking);

router.get('/my-reservations', authMiddleware, bookingController.getMyReservations);

router.delete('/:id', authMiddleware, bookingController.cancelBooking);

module.exports = router;