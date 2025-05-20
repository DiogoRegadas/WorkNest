const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const MensagemController = require('../controllers/mensagemController');

// Criar nova mensagem
router.post('/', authMiddleware, MensagemController.criarMensagem);

// Listar todas as mensagens (admin/debug)
router.get('/', authMiddleware, MensagemController.listarMensagens);

// Listar mensagens de um tópico específico
router.get('/topico/:idTopico', authMiddleware, MensagemController.listarMensagensPorTopico);

// Obter uma única mensagem por ID
router.get('/:id', authMiddleware, MensagemController.obterMensagemPorId);

// Atualizar conteúdo de uma mensagem
router.put('/:id', authMiddleware, MensagemController.atualizarMensagem);

// Apagar uma mensagem
router.delete('/:id', authMiddleware, MensagemController.apagarMensagem);

module.exports = router;
