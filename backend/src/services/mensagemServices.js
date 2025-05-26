const MensagemModel = require('../models/classes/mensagemModel');
const Mensagem = require('../models/mongoose/mensagemMongo');
//
const criarMensagem = async (dados) => {
  try {
    const novaMensagem = new Mensagem({
      conteudo: dados.conteudo,
      autor: dados.autor,
      topico: dados.topico,
      encriptada: dados.encriptada || false,
      meta: dados.meta || {},
      anexos: dados.anexos || [],
      lidaPor: []
    });

    await novaMensagem.save();

    return {
      status: 201,
      resposta: {
        sucesso: true,
        mensagem: 'Mensagem criada com sucesso.',
        mensagem: novaMensagem
      }
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
  try {
    const mensagens = await Mensagem.find()
      .populate('autor', 'firstName lastName email')
      .populate('topico', 'titulo');

    return { sucesso: true, mensagens };
  } catch (error) {
    console.error("❌ Erro ao listar mensagens:", error);
    return {
      sucesso: false,
      mensagem: 'Erro ao listar mensagens.'
    };
  }
};

const listarMensagensPorTopico = async (topicoId) => {
  try {
    const mensagens = await Mensagem.find({ topico: topicoId })
      .sort({ dataEnvio: 1 }) // ou createdAt
      .populate('autor', 'firstName lastName');

    return {
      status: 200,
      resposta: { sucesso: true, mensagens }
    };
  } catch (error) {
    console.error("❌ Erro ao listar mensagens por tópico:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao listar mensagens por tópico.' }
    };
  }
};

const obterMensagemPorId = async (id) => {
  try {
    const mensagem = await Mensagem.findById(id)
      .populate('autor', 'firstName lastName email')
      .populate('topico', 'titulo');

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
    const mensagem = await Mensagem.findByIdAndUpdate(id, {
      conteudo: dados.conteudo,
      editada: true,
      dataEdicao: new Date()
    }, { new: true });

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
  listarMensagensPorTopico,
  obterMensagemPorId,
  atualizarMensagem,
  apagarMensagem
};
