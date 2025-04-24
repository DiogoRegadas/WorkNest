const CategoriaService = require('../services/CategoriaService');

exports.criarCategoria = async (req, res) => {
    try {
        const resultado = await CategoriaService.criarCategoria(req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao criar categoria:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar categoria.' });
    }
};

exports.listarCategorias = async (req, res) => {
    try {
        const resultado = await CategoriaService.listarCategorias();
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("❌ Erro ao listar categorias:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar categorias.' });
    }
};

exports.obterCategoriaPorId = async (req, res) => {
    try {
        const resultado = await CategoriaService.obterCategoriaPorId(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao obter categoria:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter categoria.' });
    }
};

exports.atualizarCategoria = async (req, res) => {
    try {
        const resultado = await CategoriaService.atualizarCategoria(req.params.id, req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao atualizar categoria:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar categoria.' });
    }
};

exports.apagarCategoria = async (req, res) => {
    try {
        const resultado = await CategoriaService.apagarCategoria(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao apagar categoria:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar categoria.' });
    }
};