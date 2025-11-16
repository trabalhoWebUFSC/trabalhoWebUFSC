const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Registra um novo usuário
 * @param {object} userData - Dados do usuário
 */
const registerUser = async (userData) => {
  const { email, password } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('E-mail já cadastrado.'); 
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    ...userData,
    password: passwordHash,
  });

  await newUser.save();
  return newUser;
};

/**
 * Loga um usuário e retorna um token
 * @param {string} email
 * @param {string} password
 */
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciais inválidas.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas.');
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user };
};

module.exports = { registerUser, loginUser };