const Log = require('../models/mongoose/Log');

const criarLog = async ({ userId, projetoId, tipo, detalhe }) => {
  try {
    const novoLog = new Log({
      userId: userId || null,
      projetoId: projetoId || null,
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
};

const listarLogsPorTipo = async (tipo) => {
  try {
    const logs = await Log.find({ tipo })
      .populate('userId', 'nome email')
      .populate('projetoId', 'nome');
      
    return { status: 200, resposta: logs };
  } catch (erro) {
    console.error('Erro ao listar logs:', erro);
    return { status: 500, resposta: 'Erro ao listar logs' };
  }
};

const listarLogsPorProjetos = async (projetoIds) => {
  try {
    const logs = await Log.find({ projetoId: { $in: projetoIds } })
      .sort({ data: -1 })
      .limit(10)
      .populate('userId', 'nome')
      .populate('projetoId', 'nome');

    return { status: 200, resposta: logs };
  } catch (erro) {
    console.error('Erro ao listar logs por projetos:', erro);
    return { status: 500, resposta: 'Erro ao listar logs por projetos' };
  }
};

module.exports = {
  criarLog,
  listarLogsPorTipo,
  listarLogsPorProjetos
};
