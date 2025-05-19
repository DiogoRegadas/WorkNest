const PedidoService = require('../services/pedidoServices');

exports.enviarPedido = async (req, res) => {
  try {
    const resultado = await PedidoService.enviarPedido(req.body, req.user.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao enviar pedido:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao enviar pedido.' });
  }
};

exports.responderPedido = async (req, res) => {
  try {
    const resultado = await PedidoService.responderPedido(req.params.id, req.body.resposta, req.user.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao responder ao pedido:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao responder ao pedido.' });
  }
};

exports.listarPedidosPendentes = async (req, res) => {
  try {
    const resultado = await PedidoService.listarPedidosPendentes(req.user.id);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Erro ao listar pedidos pendentes:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar pedidos.' });
  }
};
