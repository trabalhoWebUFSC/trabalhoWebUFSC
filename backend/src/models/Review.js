const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Evita reviews duplicadas pelo mesmo usuário na mesma reserva
ReviewSchema.index({ user: 1, booking: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);