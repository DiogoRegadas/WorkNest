// services/LogService.js
const Log = require('../models/mongoose/Log');

async function criarLog({ userId, tipo, detalhe }) {
  try {
    const novoLog = new Log({
      userId,
      tipo,
      detalhe,
      data: new Date()
    });

    await novoLog.save();
    return { status: 201, resposta: 'Log criado com sucesso' };
  } catch (erro) {
    console.error('Erro ao criar log:', erro);
    return { status: 500, resposta: 'Erro ao criar log' };
  }
}

async function listarLogsPorTipo(tipo) {
  try {
    const logs = await Log.find({ tipo }).populate('userId', 'nome email');
    return { status: 200, resposta: logs };
  } catch (erro) {
    console.error('Erro ao listar logs:', erro);
    return { status: 500, resposta: 'Erro ao listar logs' };
  }
}

module.exports = {
  criarLog,
  listarLogsPorTipo
};
