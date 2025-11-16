const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: { type: String, required: true }, // "Deluxe Room", "Superior Ocean View"
  description: { type: String },
  pricePerNight: { type: Number, required: true }, // 300, 450
  capacity: { type: Number, required: true, default: 2 }, // "1-2 Persons"
  photos: [{ type: String }], // Array de URLs das imagens
  amenities: [{ type: String }], // ["Bathtub", "Free Breakfast", "Free Wifi"]
  status: {
    type: String,
    enum: ['available', 'maintenance'],
    default: 'available'
  }
});

module.exports = mongoose.model('Room', RoomSchema);