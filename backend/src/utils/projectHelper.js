const Projeto = require('../models/mongoose/projetoSchema');

const adicionarCategoriaAoProjeto = async (idProjeto, idCategoria) => {
    const projeto = await Projeto.findById(idProjeto);
    if (!projeto) return { sucesso: false, mensagem: 'Projeto não encontrado.' };

    projeto.listaCategorias.push(idCategoria);
    await projeto.save();

    return { sucesso: true, mensagem: 'Categoria adicionada ao projeto.' };
};

const adicionarUtilizadorAoProjeto = async (idProjeto, idUtilizador) => {
    const projeto = await Projeto.findById(idProjeto);
    if (!projeto) return { sucesso: false, mensagem: 'Projeto não encontrado.' };

    if (!projeto.listaUtilizadores.includes(idUtilizador)) {
        projeto.listaUtilizadores.push(idUtilizador);
        await projeto.save();
    }

    return { sucesso: true, mensagem: 'Utilizador adicionado ao projeto.' };
};

module.exports = {
    adicionarCategoriaAoProjeto,
    adicionarUtilizadorAoProjeto
};
