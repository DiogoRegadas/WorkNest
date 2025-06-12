// routes/avaliacaoRoutes.js
const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');
const {authMiddleware, verificarAdmin} = require('../middlewares/authMiddleware.js');


router.post('/', authMiddleware, AvaliacaoController.criarAvaliacao);
router.get('/', authMiddleware, verificarAdmin, AvaliacaoController.listarAvaliacoes);
router.get('/estatisticas', authMiddleware, verificarAdmin, AvaliacaoController.obterEstatisticas); // ✅ NOVA ROTA


module.exports = router;
