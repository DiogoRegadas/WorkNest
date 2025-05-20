// backend/src/controllers/mensagemController.js

const MensagemService = require('../services/MensagemService');

exports.criarMensagem = async (req, res) => {
  try {
    const resultado = await MensagemService.criarMensagem(req.body);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao criar mensagem:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar mensagem.' });
  }
};

exports.listarMensagens = async (req, res) => {
  try {
    const resultado = await MensagemService.listarMensagens();
    return res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Erro ao listar mensagens:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar mensagens.' });
  }
};

exports.listarMensagensPorTopico = async (req, res) => {
  try {
    const { idTopico } = req.params;
    const resultado = await MensagemService.listarMensagensPorTopico(idTopico);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao listar mensagens por tópico:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar mensagens por tópico.' });
  }
};


exports.obterMensagemPorId = async (req, res) => {
  try {
    const resultado = await MensagemService.obterMensagemPorId(req.params.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao obter mensagem:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter mensagem.' });
  }
};

exports.atualizarMensagem = async (req, res) => {
  try {
    const resultado = await MensagemService.atualizarMensagem(req.params.id, req.body);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao atualizar mensagem:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar mensagem.' });
  }
};

exports.apagarMensagem = async (req, res) => {
  try {
    const resultado = await MensagemService.apagarMensagem(req.params.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao apagar mensagem:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar mensagem.' });
  }
};