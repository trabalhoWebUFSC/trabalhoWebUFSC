
require('dotenv').config();
const app = require('./src/app'); // Importa o app configurado
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Conecta no Banco de Dados 
    await connectDB();

    // Se a conexão for bem-sucedida, LIGA o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Falha ao iniciar o servidor:', err);
    process.exit(1);
  }
};

startServer();