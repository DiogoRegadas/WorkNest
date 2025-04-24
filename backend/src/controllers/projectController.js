const ProjetoService = require('../services/ProjetoService');

exports.criarProjeto = async (req, res) => {
    try {
        const resultado = await ProjetoService.criarProjeto(req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao criar projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar projeto.' });
    }
};

exports.listarProjetos = async (req, res) => {
    try {
        const resultado = await ProjetoService.listarProjetos();
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("❌ Erro ao listar projetos:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar projetos.' });
    }
};

exports.obterProjetoPorId = async (req, res) => {
    try {
        const resultado = await ProjetoService.obterProjetoPorId(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao obter projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter projeto.' });
    }
};

exports.atualizarProjeto = async (req, res) => {
    try {
        const resultado = await ProjetoService.atualizarProjeto(req.params.id, req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao atualizar projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar projeto.' });
    }
};

exports.apagarProjeto = async (req, res) => {
    try {
        const resultado = await ProjetoService.apagarProjeto(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao apagar projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar projeto.' });
    }
};
