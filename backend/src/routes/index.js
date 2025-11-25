const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');
// const paymentRoutes = require('./paymentRoutes'); // (quando criar)
// const reviewRoutes = require('./reviewRoutes'); // (quando criar)

router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/bookings', bookingRoutes);
// router.use('/payments', paymentRoutes);
// router.use('/reviews', reviewRoutes);


module.exports = router;