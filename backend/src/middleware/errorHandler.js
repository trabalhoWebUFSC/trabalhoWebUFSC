// backend/src/middleware/errorHandler.js

/** @type {import('express').ErrorRequestHandler} */
const errorHandler = (err, req, res, next) => {
  console.error('ERRO CAPTURADO:', err); // Loga o erro no console do servidor

  // Se o erro for um que nós criamos (ex: "Datas indisponíveis")
  if (err.message) {
    // Verifica se o erro é por credenciais (para não vazar info)
    if (err.message.includes('inválidas')) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
    // Outros erros "seguros"
    return res.status(400).json({ message: err.message });
  }

  // Se for um erro inesperado (ex: banco caiu)
  res.status(500).json({ message: 'Erro interno do servidor.' });
};

module.exports = errorHandler;