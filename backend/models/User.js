const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birth: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Garante que não teremos dois emails iguais
  },
  password: { // Vamos guardar o HASH da senha aqui
    type: String,
    required: true
  },
  profilePictureUrl: { 
    type: String
  },
  address: { 
    cep: String,
    street: String,
    number: String,
    hood: String,
    city: String,
    state: String,
    complement: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);