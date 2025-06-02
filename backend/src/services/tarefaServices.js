const TarefaModel = require('../models/classes/tarefaModel');
const Tarefa = require('../models/mongoose/tarefaMongo');
const Topico = require('../models/mongoose/topicMongo');
const ProjetoService = require('./projectServices');
const { getIO } = require('../socketServer');

const criarTarefa = async (dados) => {
  try {
    const novaTarefa = new TarefaModel(
      dados.titulo,
      dados.descricao,
      dados.idTopico,
      dados.dataEntrega || null,
      dados.status || 'pendente',
      dados.responsavel || null,
      dados.anexos || []
    );

    const tarefaMongo = new Tarefa({
      titulo: novaTarefa.titulo,
      descricao: novaTarefa.descricao,
      idTopico: novaTarefa.idTopico,
      dataEntrega: novaTarefa.dataEntrega,
      status: novaTarefa.status,
      responsavel: novaTarefa.responsavel,
      anexos: novaTarefa.anexos
    });

    await tarefaMongo.save();

    await Topico.findByIdAndUpdate(dados.idTopico, {
                $push: { listaTarefas: tarefaMongo._id }
    });

  
            // 🔁 Emitir projeto completo atualizado
            const io = getIO();
            const resultadoProjeto = await ProjetoService.obterProjetoCompletoPorId(dados.idProjeto);
    
            if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
                io.to(`projeto:${dados.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
                console.log(`📢 Projeto completo emitido via WebSocket para sala projeto:${dados.idProjeto}`);
            }
  

    return {
      status: 201,
      resposta: { sucesso: true, mensagem: 'Tarefa criada com sucesso.', tarefa: tarefaMongo }
    };
  } catch (error) {
    console.error("❌ Erro ao criar tarefa:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao criar tarefa.' }
    };
  }
};

const listarTarefas = async () => {
  try {
    const tarefas = await Tarefa.find()
      .populate('responsavel', 'nome email')
      .populate('idTopico', 'titulo');
    
    return {
      status: 200,
      resposta: { sucesso: true, tarefas }
    };
  } catch (error) {
    console.error("❌ Erro ao listar tarefas:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao listar tarefas.' }
    };
  }
};

const obterTarefaPorId = async (id) => {
  try {
    const tarefa = await Tarefa.findById(id)
      .populate('responsavel', 'nome email')
      .populate('idTopico', 'titulo');
    
    if (!tarefa) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Tarefa não encontrada.' }
      };
    }

    return {
      status: 200,
      resposta: { sucesso: true, tarefa }
    };
  } catch (error) {
    console.error("❌ Erro ao obter tarefa:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao obter tarefa.' }
    };
  }
};

const atualizarTarefa = async (id, dados) => {
  try {
    const { respostaDescricao, status} = dados;

    console.log("🔄 Atualizando tarefa com dados:", respostaDescricao, status);

    // Separar campos para $set e $push
    const update = {};

    if (respostaDescricao !== undefined || status !== undefined) {
      update.$set = {};
      if (respostaDescricao !== undefined) update.$set.respostaDescricao = respostaDescricao;
      if (status !== undefined) update.$set.status = status;
    }

    

    const tarefa = await Tarefa.findByIdAndUpdate(id, update, { new: true });

    if (!tarefa) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Tarefa não encontrada.' }
      };
    }

    return {
      status: 200,
      resposta: {
        sucesso: true,
        mensagem: 'Tarefa atualizada com sucesso.',
        tarefa
      }
    };
  } catch (error) {
    console.error("❌ Erro ao atualizar tarefa:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao atualizar tarefa.' }
    };
  }
};


const uploadFicheirosParaTarefa = async (idTarefa, files) => {
  try {
    if (!files || files.length === 0) {
      return {
        status: 400,
        resposta: { sucesso: false, mensagem: 'Nenhum ficheiro recebido.' }
      };
    }

    const anexos = files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      contentType: file.mimetype,
      tamanho: file.size,
      gridFsId: file.id
    }));

    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
      idTarefa,
      { $push: { anexos: { $each: anexos } } },
      { new: true }
    );

    if (!tarefaAtualizada) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Tarefa não encontrada.' }
      };
    }

    return {
      status: 200,
      resposta: {
        sucesso: true,
        mensagem: 'Anexos enviados e associados com sucesso.',
        tarefa: tarefaAtualizada,
        anexos
      }
    };
  } catch (error) {
    console.error("❌ Erro ao associar anexos à tarefa:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao associar anexos.' }
    };
  }
};




const apagarTarefa = async (id) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(id);

    if (!tarefa) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Tarefa não encontrada.' }
      };
    }

    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Tarefa apagada com sucesso.' }
    };
  } catch (error) {
    console.error("❌ Erro ao apagar tarefa:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao apagar tarefa.' }
    };
  }
};

module.exports = {
  criarTarefa,
  listarTarefas,
  obterTarefaPorId,
  atualizarTarefa,
  uploadFicheirosParaTarefa,
  apagarTarefa
};
