// backend/src/services/TopicoService.js

const TopicoModel = require('../models/classes/topicoModel');
const Topico = require('../models/mongoose/topicoSchema');

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
    try {
        const topico = await Topico.findByIdAndUpdate(id, dados, { new: true });
        if (!topico) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Tópico não encontrado.' }
            };
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

module.exports = {
    criarTopico,
    listarTopicos,
    obterTopicoPorId,
    atualizarTopico,
    apagarTopico
};
