const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // ROTA DE CADASTRO
router.post('/login', authController.login); // ROTA DE LOGIN

module.exports = router;