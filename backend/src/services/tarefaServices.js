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

    console.log('ID do PROJETO:', dados.idProjeto); 
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
    const tarefa = await Tarefa.findByIdAndUpdate(id, dados, { new: true });

    if (!tarefa) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Tarefa não encontrada.' }
      };
    }

    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Tarefa atualizada com sucesso.', tarefa }
    };
  } catch (error) {
    console.error("❌ Erro ao atualizar tarefa:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao atualizar tarefa.' }
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
  apagarTarefa
};
