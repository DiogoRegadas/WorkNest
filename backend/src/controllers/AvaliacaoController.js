// controllers/AvaliacaoController.js
const AvaliacaoService = require('../services/avaliacaoService');

async function criarAvaliacao(req, res) {
  try {
    const userId = req.user.id; // assumindo middleware de auth
    const { valor, mensagem } = req.body;

    const resultado = await AvaliacaoService.criarAvaliacao({ userId, valor, mensagem });
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('Erro ao criar avaliação:', erro);
    return res.status(500).json({ mensagem: 'Erro ao criar avaliação' });
  }
}

async function listarAvaliacoes(req, res) {
  try {
    const resultado = await AvaliacaoService.listarAvaliacoes();
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('Erro ao listar avaliações:', erro);
    return res.status(500).json({ mensagem: 'Erro ao listar avaliações' });
  }
}

async function obterEstatisticas(req, res) {
  try {
    const resultado = await AvaliacaoService.obterEstatisticas();
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('Erro ao obter estatísticas:', erro);
    return res.status(500).json({ mensagem: 'Erro ao obter estatísticas de avaliações.' });
  }
}

module.exports = {
  criarAvaliacao,
  listarAvaliacoes,
  obterEstatisticas
};