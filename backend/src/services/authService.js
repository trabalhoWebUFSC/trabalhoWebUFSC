const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const updateUser = async (userId, updateData) => {
  const { name, birth, email, password, address } = updateData;

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found.');

  if (name) user.name = name;
  if (birth) user.birth = birth;
  if (email) user.email = email;
  if (address) user.address = address;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  return user;
};

module.exports = { registerUser, loginUser, updateUser };
