const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
//const { authMiddleware, adminMiddleware } = require('../middleware');

// Rota pública para listar quartos
router.get('/', roomController.getAllRooms);

//Rota pública para ver um quarto
router.get('/:id', roomController.getRoomById);

//Rota de admin para criar quarto
// router.post('/', authMiddleware, adminMiddleware, roomController.createRoom);

module.exports = router;