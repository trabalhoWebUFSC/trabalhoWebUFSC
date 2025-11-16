const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, // Hash do bcrypt
  birth: { type: Date, required: true },
  profilePictureUrl: { type: String, default: null },
  role: {
    type: String,
    enum: ['user', 'admin'], // Controle de acesso
    default: 'user'
  },
  cpf: { type: String, unique: true, sparse: true }, // sparse: permite 'null' serem duplicados
  address: {
    cep: String,
    street: String,
    number: String,
    hood: String,
    city: String,
    state: String,
    complement: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);