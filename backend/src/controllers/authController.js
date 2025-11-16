const authService = require('../services/authService');

/** @type {import('express').RequestHandler} */
const register = async (req, res, next) => {
  try {
    const { name, birth, email, password, address } = req.body;
    
    const newUser = await authService.registerUser({ name, birth, email, password, address });

    res.status(201).json({ message: 'Usuário criado com sucesso!', userId: newUser._id });
  } catch (err) {
    next(err); 
  }
};

/** @type {import('express').RequestHandler} */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
 
    const { token, user } = await authService.loginUser(email, password);
 
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };