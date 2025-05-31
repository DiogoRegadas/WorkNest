const express = require('express');
const {
  criarTarefa,
  listarTarefas,
  obterTarefaPorId,
  atualizarTarefa,
  apagarTarefa
} = require('../controllers/tarefaController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas protegidas por autenticação
router.post('/criartarefa', authMiddleware, criarTarefa);
router.get('/tarefas', authMiddleware, listarTarefas);
router.get('/tarefa/:id', authMiddleware, obterTarefaPorId);
router.put('/tarefa/:id', authMiddleware, atualizarTarefa);
router.delete('/tarefa/:id', authMiddleware, apagarTarefa);

module.exports = router;
