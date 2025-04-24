// backend/src/services/MensagemService.js

const MensagemModel = require('../models/classes/mensagemModel');
const Mensagem = require('../models/mongoose/mensagemSchema');

const criarMensagem = async (dados) => {
  try {
    const novaMensagem = new MensagemModel(dados.conteudo, dados.autor, dados.idTopico);

    const mensagemMongo = new Mensagem({
      conteudo: novaMensagem.conteudo,
      autor: novaMensagem.autor,
      idTopico: novaMensagem.idTopico
    });

    await mensagemMongo.save();

    return {
      status: 201,
      resposta: { sucesso: true, mensagem: 'Mensagem criada com sucesso.', mensagemMongo }
    };
  } catch (error) {
    console.error("❌ Erro no serviço ao criar mensagem:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao criar mensagem.' }
    };
  }
};

const listarMensagens = async () => {
  const mensagens = await Mensagem.find().populate('autor', 'nome email').populate('idTopico', 'titulo');
  return { sucesso: true, mensagens };
};

const obterMensagemPorId = async (id) => {
  try {
    const mensagem = await Mensagem.findById(id).populate('autor', 'nome email').populate('idTopico', 'titulo');
    if (!mensagem) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Mensagem não encontrada.' }
      };
    }
    return {
      status: 200,
      resposta: { sucesso: true, mensagem }
    };
  } catch (error) {
    console.error("❌ Erro ao obter mensagem:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao obter mensagem.' }
    };
  }
};

const atualizarMensagem = async (id, dados) => {
  try {
    const mensagem = await Mensagem.findByIdAndUpdate(id, { conteudo: dados.conteudo }, { new: true });
    if (!mensagem) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Mensagem não encontrada.' }
      };
    }
    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Mensagem atualizada com sucesso.', mensagem }
    };
  } catch (error) {
    console.error("❌ Erro ao atualizar mensagem:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao atualizar mensagem.' }
    };
  }
};

const apagarMensagem = async (id) => {
  try {
    const mensagem = await Mensagem.findByIdAndDelete(id);
    if (!mensagem) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Mensagem não encontrada.' }
      };
    }
    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Mensagem apagada com sucesso.' }
    };
  } catch (error) {
    console.error("❌ Erro ao apagar mensagem:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao apagar mensagem.' }
    };
  }
};

module.exports = {
  criarMensagem,
  listarMensagens,
  obterMensagemPorId,
  atualizarMensagem,
  apagarMensagem
};
