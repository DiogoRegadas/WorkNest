const Categoria = require('../models/mongoose/categoriaSchema');

const adicionarTopicoACategoria = async (idCategoria, idTopico) => {
    const categoria = await Categoria.findById(idCategoria);
    if (!categoria) return { sucesso: false, mensagem: 'Categoria não encontrada.' };

    categoria.listaTopicos.push(idTopico);
    await categoria.save();

    return { sucesso: true, mensagem: 'Tópico adicionado à categoria.' };
};

const removerTopicoDaCategoria = async (idCategoria, idTopico) => {
    const categoria = await Categoria.findById(idCategoria);
    if (!categoria) return { sucesso: false, mensagem: 'Categoria não encontrada.' };

    categoria.listaTopicos = categoria.listaTopicos.filter(tid => tid.toString() !== idTopico);
    await categoria.save();

    return { sucesso: true, mensagem: 'Tópico removido da categoria.' };
};

module.exports = {
    adicionarTopicoACategoria,
    removerTopicoDaCategoria
};
