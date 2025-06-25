const express = require('express');
const router = express.Router();
const LogController = require('../controllers/LogController');

router.get('/taxa-retorno', LogController.obterTaxaRetorno);

router.post('/listar-por-projetos', LogController.listarLogsPorProjetos);

module.exports = router;
