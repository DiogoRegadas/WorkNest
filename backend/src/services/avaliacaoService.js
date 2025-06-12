// services/AvaliacaoService.js
const Avaliacao = require('../models/mongoose/Avaliacao');

async function criarAvaliacao({ userId, valor, mensagem }) {
  const novaAvaliacao = new Avaliacao({ userId, valor, mensagem });
  await novaAvaliacao.save();
  return { status: 201, resposta: { mensagem: 'Avaliação criada com sucesso' } };
}

async function listarAvaliacoes() {
  const avaliacoes = await Avaliacao.find().populate('userId', 'nome email');
  return { status: 200, resposta: avaliacoes };
}

async function obterEstatisticas() {
  const agregados = await Avaliacao.aggregate([
    {
      $group: {
        _id: "$valor",        // Agrupa por valor de avaliação (1 a 5)
        total: { $sum: 1 }    // Conta quantos têm esse valor
      }
    }
  ]);

  const estatisticas = {};
  for (let item of agregados) {
    estatisticas[item._id] = item.total;
  }

  return { status: 200, resposta: estatisticas };
}

module.exports = {
  criarAvaliacao,
  listarAvaliacoes,
  obterEstatisticas
};