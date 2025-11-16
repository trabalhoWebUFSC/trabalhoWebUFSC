// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

/** @type {import('express').RequestHandler} */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 1. Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Anexa o payload do token (com id, email, role) no 'req'
    req.user = decoded; 
    
    // 3. Deixa a requisição continuar
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;