// services/eventoServices.js
const Evento = require('../models/mongoose/eventMongo');

const criarEvento = async (dados) => {
  try {
    const novoEvento = new Evento(dados);
    await novoEvento.save();

    return {
      status: 201,
      resposta: { sucesso: true, evento: novoEvento }
    };
  } catch (erro) {
    console.error('❌ Erro ao criar evento:', erro);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao criar evento.' }
    };
  }
};

const listarEventosPorProjeto = async (idProjeto) => {
  try {
    const eventos = await Evento.find({ idProjeto }).sort({ data: 1 });
    return {
      status: 200,
      resposta: { sucesso: true, eventos }
    };
  } catch (erro) {
    console.error('❌ Erro ao listar eventos:', erro);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao listar eventos.' }
    };
  }
};

const apagarEvento = async (id) => {
  try {
    const evento = await Evento.findByIdAndDelete(id);
    if (!evento) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Evento não encontrado.' }
      };
    }
    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Evento apagado com sucesso.' }
    };
  } catch (erro) {
    console.error('❌ Erro ao apagar evento:', erro);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao apagar evento.' }
    };
  }
};

module.exports = {
  criarEvento,
  listarEventosPorProjeto,
  apagarEvento
};
