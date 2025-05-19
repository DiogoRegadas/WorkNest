// backend/src/services/TopicoService.js

const TopicoModel = require('../models/classes/topicModel');
const Topico = require('../models/mongoose/topicMongo');
const ProjetoService = require('./projectServices');
const Categoria = require('../models/mongoose/categoriaMongo');
const { getIO } = require('../socketServer');

const criarTopico = async (dados) => {
    try {
        const novoTopico = new TopicoModel(dados.titulo, dados.descricao, dados.idCategoria);

        const topicoMongo = new Topico({
            titulo: novoTopico.titulo,
            descricao: novoTopico.descricao,
            idCategoria: novoTopico.idCategoria,
            listaMensagens: [],
            listaTarefas: []
        });

        await topicoMongo.save();

        await Categoria.findByIdAndUpdate(dados.idCategoria, {
            $push: { listaTopicos: topicoMongo._id }
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
            resposta: { sucesso: true, mensagem: 'Tópico criado com sucesso.', topico: topicoMongo }
        };
    } catch (error) {
        console.error("❌ Erro no serviço ao criar tópico:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao criar tópico.' }
        };
    }
};

const listarTopicos = async () => {
    const topicos = await Topico.find().populate('idCategoria', 'nome');
    return { sucesso: true, topicos };
};

const obterTopicoPorId = async (id) => {
    try {
        const topico = await Topico.findById(id).populate('idCategoria', 'nome');
        if (!topico) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Tópico não encontrado.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, topico }
        };
    } catch (error) {
        console.error("❌ Erro ao obter tópico:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao obter tópico.' }
        };
    }
};

const atualizarTopico = async (id, dados) => {
    console.log("11111111");
    try {
        const topico = await Topico.findByIdAndUpdate(id, dados.titulo, { new: true });
        if (!topico) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Tópico não encontrado.' }
            };
        }

        const io = getIO();
        const resultadoProjeto = await ProjetoService.obterProjetoCompletoPorId(dados.idProjeto);

        if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
            io.to(`projeto:${dados.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
            console.log(`📢 Projeto atualizado emitido via WebSocket para sala projeto:${dados.idProjeto}`);
        }

        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Tópico atualizado com sucesso.', topico }
        };
    } catch (error) {
        console.error("❌ Erro ao atualizar tópico:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao atualizar tópico.' }
        };
    }
};

const apagarTopico = async (id) => {
    try {
        const topico = await Topico.findByIdAndDelete(id);
        if (!topico) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Tópico não encontrado.' }
            };
        }

        const io = getIO();
        const resultadoProjeto = await ProjetoService.obterProjetoCompletoPorId(topico.idProjeto);
        if (resultadoProjeto.status === 200) {
        io.to(`projeto:${topico.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
        }
        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Tópico apagado com sucesso.' }
        };
    } catch (error) {
        console.error("❌ Erro ao apagar tópico:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao apagar tópico.' }
        };
    }
};

const arquivarTopico = async (id, dados) => {
    const topico = await Topico.findById(id);
    if (!topico) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Tópico não encontrado.' },
      };
    }
  
    topico.isArchived = true;
    await topico.save();

    const io = getIO();
    const resultadoProjeto = await ProjetoService.obterProjetoCompletoPorId(dados.idProjeto);

    if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
        io.to(`projeto:${dados.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
        console.log(`📢 Projeto atualizado emitido via WebSocket para sala projeto:${dados.idProjeto}`);
    }
  
    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Tópico arquivado com sucesso.', topico },
    };
  };
  
  const desarquivarTopico = async (id, dados) => {
    console.log("-----------------------------");
    console.log("Service");
    const topico = await Topico.findById(id);
    if (!topico) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Tópico não encontrado.' },
      };
    }
  
    topico.isArchived = false;
    await topico.save();

    console.log("Desarquivar tópico:", topico);
  
    const io = getIO();
    const resultadoProjeto = await ProjetoService.obterProjetoCompletoPorId(dados.idProjeto);
    console.log("Resultado projeto:", dados.idProjeto);
    if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
      io.to(`projeto:${dados.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
      console.log(`📢 Projeto atualizado emitido via WebSocket para sala projeto:${dados.idProjeto}`);
    }
  
    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Tópico desarquivado com sucesso.', topico },
    };
  };

module.exports = {
    criarTopico,
    listarTopicos,
    obterTopicoPorId,
    atualizarTopico,
    apagarTopico,
    arquivarTopico,
    desarquivarTopico
};
