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

const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    console.log({
      _id: user._id,
      name: user.name,
      email: user.email,
      birth: user.birth,
      profilePictureUrl: user.profilePictureUrl || null,
      address: user.address || {}
    })
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      birth: user.birth,
      profilePictureUrl: user.profilePictureUrl || null,
      address: user.address || {}
    });
  } catch (err) {
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const userId = req.user._id; // obtido do authMiddleware
    const { name, birth, email, password, address } = req.body;

    const updatedUser = await authService.updateUser(userId, { name, birth, email, password, address });

    res.status(200).json({
      message: 'Profile successfully updated!',
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        birth: updatedUser.birth,
        profilePictureUrl: updatedUser.profilePictureUrl || null,
        address: updatedUser.address || {}
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe, editProfile };