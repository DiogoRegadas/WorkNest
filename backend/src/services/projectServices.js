
const ProjetoModel = require('../models/classes/ProjectModel');
const Projeto = require('../models/database/projectMongo');
const CategoriaService = require('./categoriaServices');

const criarProjeto = async (dados) => {
    try {
        const novoProjeto = new ProjetoModel(dados.nome, dados.descricao, dados.owner);

        // Primeiro criar o Projeto SEM categorias
        const projetoMongo = new Projeto({
            nome: novoProjeto.nome,
            descricao: novoProjeto.descricao,
            owner: novoProjeto.owner,
            listaUtilizadores: [],
            listaCategorias: []
        });

        await projetoMongo.save();
        console.log('ID DO PROJETO - ', projetoMongo._id);

        const categoriasCriadas = [];

        // Se receber categorias (array de nomes)
        if (dados.categorias && dados.categorias.length > 0) {
            // Criar todas as categorias associadas ao projeto
            for (const categoriaNome of dados.categorias) {
                const novaCategoria = {
                    nome: categoriaNome,
                    descricao: '', // Se quiseres podes receber descrição também
                    idProjeto: projetoMongo._id
                };
                const resultadoCategoria = await CategoriaService.criarCategoria(novaCategoria);

                if (resultadoCategoria.status === 201) {
                    categoriasCriadas.push(resultadoCategoria.resposta.categoria._id);
                }
            }

            // Atualizar o Projeto com as categorias criadas
            projetoMongo.listaCategorias = categoriasCriadas;
            await projetoMongo.save();
        }

        // Popular o projeto atualizado com categorias
        const projetoFinal = await Projeto.findById(projetoMongo._id)
            .populate('listaCategorias', 'nome descricao')
            .populate('owner', 'nome email');

        return {
            status: 201,
            resposta: { sucesso: true, mensagem: 'Projeto criado com sucesso.', projeto: projetoFinal }
        };
    } catch (error) {
        console.error("❌ Erro no serviço ao criar projeto:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao criar projeto.' }
        };
    }
};

const listarProjetos = async (idUser) => {
    const projetos = await Projeto.find({
      $or: [
        { owner: idUser },
        { listaUtilizadores: idUser }
      ]
    }).populate('owner', 'firstName lastName email');

    //console.log(JSON.stringify(projetos, null, 2));

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
