// backend/src/controllers/topicoController.js

const TopicoService = require('../services/TopicoService');

exports.criarTopico = async (req, res) => {
    try {
        const resultado = await TopicoService.criarTopico(req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao criar tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar tópico.' });
    }
};

exports.listarTopicos = async (req, res) => {
    try {
        const resultado = await TopicoService.listarTopicos();
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("❌ Erro ao listar tópicos:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar tópicos.' });
    }
};

exports.obterTopicoPorId = async (req, res) => {
    try {
        const resultado = await TopicoService.obterTopicoPorId(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao obter tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter tópico.' });
    }
};

exports.atualizarTopico = async (req, res) => {
    try {
        const resultado = await TopicoService.atualizarTopico(req.params.id, req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao atualizar tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar tópico.' });
    }
};

exports.apagarTopico = async (req, res) => {
    try {
        const resultado = await TopicoService.apagarTopico(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao apagar tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar tópico.' });
    }
};