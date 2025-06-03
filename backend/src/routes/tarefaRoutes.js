const express = require('express');
const {
  criarTarefa,
  listarTarefas,
  obterTarefaPorId,
  atualizarTarefa,
  apagarTarefa,
  uploadAnexos, // 👈 novo controlador
} = require('../controllers/tarefaController');

const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // 👈 middleware para GridFS

const router = express.Router();

// Rotas protegidas por autenticação
router.post('/criartarefa', authMiddleware, criarTarefa);
router.get('/tarefas', authMiddleware, listarTarefas);
router.get('/tarefa/:id', authMiddleware, obterTarefaPorId);
router.put('/:id', authMiddleware, atualizarTarefa);
router.delete('/tarefa/:id', authMiddleware, apagarTarefa);

// ✅ Nova rota para upload de anexos encriptados
router.post(
  '/:id/anexos',
  authMiddleware,
  upload.array('ficheiros'), // 'files' deve coincidir com o nome no FormData
  uploadAnexos
);

router.get('/anexos/:ficheiroId', authMiddleware, tarefaController.downloadAnexo);

module.exports = router;
