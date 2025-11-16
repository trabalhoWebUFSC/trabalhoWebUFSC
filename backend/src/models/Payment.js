const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true }, // Valor total 
  method: { type: String, enum: ['credit_card', 'pix', 'mock'] },
  status: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' },
  gatewayTransactionId: { type: String }, // ID do Stripe, MercadoPago, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);