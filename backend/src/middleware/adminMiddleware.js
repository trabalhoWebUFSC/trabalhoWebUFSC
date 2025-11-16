/**
 * Middleware para verificar se o usuário logado é um Administrador.
 * * @type {import('express').RequestHandler}
 */
const adminMiddleware = (req, res, next) => {

  if (!req.user || req.user.role !== 'admin') {

    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }

  next();
};

module.exports = adminMiddleware;