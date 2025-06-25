const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/eventoController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/projeto/:idProjeto', authMiddleware, EventoController.listarEventosPorProjeto);

// NOVA ROTA para listar eventos com base em vários projetos
router.post('/calendario', authMiddleware, EventoController.listarEventosPorProjetos);

module.exports = router;