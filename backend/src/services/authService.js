const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @param {string} password 
 */
const validatePassword = (password) => {
  // Comprimento mínimo
  if (password.length < 8) {
    throw new Error("A senha deve ter no mínimo 8 caracteres.");
  }

  // Verificação de complexidade (Regex: 1 minúscula, 1 maiúscula, 1 número, 1 símbolo)
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  if (!strongPasswordRegex.test(password)) {
    throw new Error("A senha é muito fraca. Use maiúsculas, minúsculas, números e símbolos.");
  }
};


 // Registra novo usuario com validação de senha forte
 
const registerUser = async (userData) => {
  const { email, password } = userData;

  //validacao reutilizavel
  validatePassword(password);

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


 // Logs in a user and returns a JWT token
 
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


// Updates user data (including password if provided)
 
const updateUser = async (userId, updateData) => {
  const { name, birth, email, password, address } = updateData;

  const user = await User.findById(userId);
  if (!user) throw new Error('Usuário não encontrado.');

  if (name) user.name = name;
  if (birth) user.birth = birth;
  if (email) user.email = email;
  if (address) user.address = address;
  

  if (password) {
    //validacao reutilizavel
    validatePassword(password);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  return user;
};

module.exports = { registerUser, loginUser, updateUser };