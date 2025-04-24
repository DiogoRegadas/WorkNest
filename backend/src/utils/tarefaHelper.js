// backend/src/utils/tarefaHelper.js

const Tarefa = require('../models/mongoose/tarefaSchema');

const adicionarAnexoATarefa = async (idTarefa, caminhoFicheiro) => {
  const tarefa = await Tarefa.findById(idTarefa);
  if (!tarefa) return { sucesso: false, mensagem: 'Tarefa não encontrada.' };

  tarefa.anexos.push(caminhoFicheiro);
  await tarefa.save();

  return { sucesso: true, mensagem: 'Anexo adicionado com sucesso.' };
};

const removerAnexoDaTarefa = async (idTarefa, nomeFicheiro) => {
  const tarefa = await Tarefa.findById(idTarefa);
  if (!tarefa) return { sucesso: false, mensagem: 'Tarefa não encontrada.' };

  tarefa.anexos = tarefa.anexos.filter(anexo => !anexo.includes(nomeFicheiro));
  await tarefa.save();

  return { sucesso: true, mensagem: 'Anexo removido com sucesso.' };
};

module.exports = {
  adicionarAnexoATarefa,
  removerAnexoDaTarefa
};
