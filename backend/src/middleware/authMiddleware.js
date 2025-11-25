// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/** @type {import('express').RequestHandler} */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 1. Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Busca usuário completo no banco
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    // 3. Anexa o usuário completo no req
    req.user = user;

    // 4. Continua a requisição
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;