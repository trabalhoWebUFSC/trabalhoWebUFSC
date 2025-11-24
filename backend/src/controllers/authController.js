const authService = require('../services/authService');

const register = async (request, response, next) => {
  try {
    const { name, birth, email, password, address } = request.body;

    const newUser = await authService.registerUser({ name, birth, email, password, address });

    response.status(201).json({ message: 'Usuário registrado com sucesso!', userId: newUser._id });
  } catch (err) {
    next(err);
  }
};

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const { token, user } = await authService.loginUser(email, password);

    response.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };