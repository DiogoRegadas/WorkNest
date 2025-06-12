const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares/authMiddleware.js');

const PedidoController = require('../controllers/pedidoController');

// Enviar novo pedido (amizade ou projeto)
router.post('/enviar', authMiddleware, PedidoController.enviarPedido);

// Responder a um pedido (aceitar ou recusar)
router.post('/responder/:id', authMiddleware, PedidoController.responderPedido);

// Listar pedidos pendentes recebidos pelo utilizador autenticado
router.get('/pendentes', authMiddleware, PedidoController.listarPedidosPendentes);

module.exports = router;
