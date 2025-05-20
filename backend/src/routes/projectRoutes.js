const express = require('express');
const { criarProjeto, listarProjetos, obterProjetoPorId, atualizarProjeto, apagarProjeto, obterProjetoCompleto, removerColaborador, transferirOwner} = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();


router.post('/criarprojetos', authMiddleware, criarProjeto);
router.get('/projetos', authMiddleware, listarProjetos);
router.get('/projetosID/:id', authMiddleware, obterProjetoPorId);
router.put('/projetosUP/:id', authMiddleware, atualizarProjeto);
router.delete('/projetosDL/:id', authMiddleware, apagarProjeto);
router.get('/:id/completo', authMiddleware, obterProjetoCompleto);
router.delete('/projetos/:idProjeto/colaboradores/:idUtilizador', authMiddleware, removerColaborador);
router.post('/projetos/:idProjeto/transferir-owner', authMiddleware, transferirOwner);


module.exports = router;