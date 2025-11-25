const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register); // ROTA DE CADASTRO
router.post('/login', authController.login); // ROTA DE LOGIN
router.get('/me', authMiddleware, authController.getMe);
router.put('/edit', authMiddleware, authController.editProfile);

module.exports = router;