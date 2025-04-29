const express = require('express');
const { criarProjeto, listarProjetos, obterProjetoPorId, atualizarProjeto, apagarProjeto} = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/criarprojetos', authMiddleware, criarProjeto);
router.get('/projetos', authMiddleware, listarProjetos);
router.get('/projetosID/:id', authMiddleware, obterProjetoPorId);
router.put('/projetosUP/:id', authMiddleware, atualizarProjeto);
router.delete('/projetosDL/:id', authMiddleware, apagarProjeto);

module.exports = router;