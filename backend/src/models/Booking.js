const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  
  checkIn: { type: Date, required: true, index: true }, 
  checkOut: { type: Date, required: true },
  
  totalPrice: { type: Number, required: true },
  numberOfGuests: { type: Number, required: true },

  // O email de quem reservou 
  reservedByEmail: { type: String, required: true, index: true }, 
  // O email do convidado 
  companionEmail: { type: String, index: true }, 

  payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);