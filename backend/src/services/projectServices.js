
const ProjetoModel = require('../models/classes/projetoModel');
const Projeto = require('../models/database/projetoSchema');

const criarProjeto = async (dados) => {
    try {
        const novoProjeto = new ProjetoModel(dados.nome, dados.descricao, dados.owner);

        const projetoMongo = new Projeto({
            nome: novoProjeto.nome,
            descricao: novoProjeto.descricao,
            owner: novoProjeto.owner,
            listaUtilizadores: [],
            listaCategorias: []
        });

        await projetoMongo.save();

        return {
            status: 201,
            resposta: { sucesso: true, mensagem: 'Projeto criado com sucesso.', projeto: projetoMongo }
        };
    } catch (error) {
        console.error("❌ Erro no serviço ao criar projeto:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao criar projeto.' }
        };
    }
};

const listarProjetos = async () => {
    const projetos = await Projeto.find().populate('owner', 'nome email');
    return { sucesso: true, projetos };
};

const obterProjetoPorId = async (id) => {
    try {
        const projeto = await Projeto.findById(id).populate('owner', 'nome email');
        if (!projeto) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, projeto }
        };
    } catch (error) {
        console.error("❌ Erro ao obter projeto:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao obter projeto.' }
        };
    }
};

const atualizarProjeto = async (id, dados) => {
    try {
        const projeto = await Projeto.findByIdAndUpdate(id, dados, { new: true });
        if (!projeto) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Projeto atualizado com sucesso.', projeto }
        };
    } catch (error) {
        console.error("❌ Erro ao atualizar projeto:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao atualizar projeto.' }
        };
    }
};

const apagarProjeto = async (id) => {
    try {
        const projeto = await Projeto.findByIdAndDelete(id);
        if (!projeto) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Projeto apagado com sucesso.' }
        };
    } catch (error) {
        console.error("❌ Erro ao apagar projeto:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao apagar projeto.' }
        };
    }
};

module.exports = {
    criarProjeto,
    listarProjetos,
    obterProjetoPorId,
    atualizarProjeto,
    apagarProjeto
};
