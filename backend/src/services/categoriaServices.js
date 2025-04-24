const CategoriaModel = require('../models/classes/categoriaModel');
const Categoria = require('../models/mongoose/categoriaSchema');

const criarCategoria = async (dados) => {
    try {
        const novaCategoria = new CategoriaModel(dados.nome, dados.descricao, dados.idProjeto);

        const categoriaMongo = new Categoria({
            nome: novaCategoria.nome,
            descricao: novaCategoria.descricao,
            idProjeto: novaCategoria.idProjeto,
            listaTopicos: []
        });

        await categoriaMongo.save();

        return {
            status: 201,
            resposta: { sucesso: true, mensagem: 'Categoria criada com sucesso.', categoria: categoriaMongo }
        };
    } catch (error) {
        console.error("❌ Erro no serviço ao criar categoria:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao criar categoria.' }
        };
    }
};

const listarCategorias = async () => {
    const categorias = await Categoria.find().populate('idProjeto', 'nome');
    return { sucesso: true, categorias };
};

const obterCategoriaPorId = async (id) => {
    try {
        const categoria = await Categoria.findById(id).populate('idProjeto', 'nome');
        if (!categoria) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, categoria }
        };
    } catch (error) {
        console.error("❌ Erro ao obter categoria:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao obter categoria.' }
        };
    }
};

const atualizarCategoria = async (id, dados) => {
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, dados, { new: true });
        if (!categoria) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Categoria atualizada com sucesso.', categoria }
        };
    } catch (error) {
        console.error("❌ Erro ao atualizar categoria:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao atualizar categoria.' }
        };
    }
};

const apagarCategoria = async (id) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(id);
        if (!categoria) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Categoria apagada com sucesso.' }
        };
    } catch (error) {
        console.error("❌ Erro ao apagar categoria:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao apagar categoria.' }
        };
    }
};

module.exports = {
    criarCategoria,
    listarCategorias,
    obterCategoriaPorId,
    atualizarCategoria,
    apagarCategoria
};
