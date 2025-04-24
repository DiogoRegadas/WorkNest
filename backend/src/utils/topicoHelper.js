// backend/src/utils/topicoHelper.js

const Topico = require('../models/mongoose/topicoSchema');

const adicionarMensagemAoTopico = async (idTopico, idMensagem) => {
    const topico = await Topico.findById(idTopico);
    if (!topico) return { sucesso: false, mensagem: 'Tópico não encontrado.' };

    topico.listaMensagens.push(idMensagem);
    await topico.save();

    return { sucesso: true, mensagem: 'Mensagem adicionada ao tópico.' };
};

const removerMensagemDoTopico = async (idTopico, idMensagem) => {
    const topico = await Topico.findById(idTopico);
    if (!topico) return { sucesso: false, mensagem: 'Tópico não encontrado.' };

    topico.listaMensagens = topico.listaMensagens.filter(mid => mid.toString() !== idMensagem);
    await topico.save();

    return { sucesso: true, mensagem: 'Mensagem removida do tópico.' };
};

const adicionarTarefaAoTopico = async (idTopico, idTarefa) => {
    const topico = await Topico.findById(idTopico);
    if (!topico) return { sucesso: false, mensagem: 'Tópico não encontrado.' };

    topico.listaTarefas.push(idTarefa);
    await topico.save();

    return { sucesso: true, mensagem: 'Tarefa adicionada ao tópico.' };
};

const removerTarefaDoTopico = async (idTopico, idTarefa) => {
    const topico = await Topico.findById(idTopico);
    if (!topico) return { sucesso: false, mensagem: 'Tópico não encontrado.' };

    topico.listaTarefas = topico.listaTarefas.filter(tid => tid.toString() !== idTarefa);
    await topico.save();

    return { sucesso: true, mensagem: 'Tarefa removida do tópico.' };
};

module.exports = {
    adicionarMensagemAoTopico,
    removerMensagemDoTopico,
    adicionarTarefaAoTopico,
    removerTarefaDoTopico
};
