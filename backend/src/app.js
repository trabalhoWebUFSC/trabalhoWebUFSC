const express = require('express');
const cors = require('cors');
const allRoutes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', allRoutes);

// Middleware de Erro 
app.use(errorHandler);

module.exports = app; 