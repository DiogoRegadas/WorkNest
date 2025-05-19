// backend/src/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile, pesquisarUtilizadores, obterAmigos} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// Rota para registar um novo utilizador
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/search', authMiddleware, pesquisarUtilizadores);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/amigos', authMiddleware, obterAmigos);


module.exports = router;

