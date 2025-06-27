const express = require('express');
const router = express.Router();
const LogController = require('../controllers/LogController');
const {authMiddleware, verificarAdmin} = require('../middlewares/authMiddleware.js');

router.get('/taxa-retorno', authMiddleware, verificarAdmin,LogController.obterTaxaRetorno);

router.post('/listar-por-projetos', authMiddleware ,LogController.listarLogsPorProjetos);

router.get('/taxa-adesao', authMiddleware, verificarAdmin,LogController.obterTaxaAdesaoFuncionalidades);


module.exports = router;
