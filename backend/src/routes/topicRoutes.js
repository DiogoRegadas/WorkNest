const express = require('express');
const {
  criarTopico,
  listarTopicos,
  obterTopicoPorId,
  atualizarTopico,
  apagarTopico,
  arquivar,
  desarquivar
} = require('../controllers/topicoController');

const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, criarTopico);
router.get('/', authMiddleware, listarTopicos);
router.get('/:id', authMiddleware, obterTopicoPorId);
router.put('/topicoUP/:id', authMiddleware, atualizarTopico);
router.delete('/topicoDL/:id', authMiddleware, apagarTopico);
router.patch('/arquivar/:id', authMiddleware, arquivar);
router.patch('/desarquivar/:id', authMiddleware, desarquivar);

module.exports = router;
