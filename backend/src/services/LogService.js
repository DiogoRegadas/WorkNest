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


    console.log('Logs encontrados:', logs);

    return { status: 200, resposta: logs };
  } catch (erro) {
    console.error('Erro ao listar logs por projetos:', erro);
    return { status: 500, resposta: 'Erro ao listar logs por projetos' };
  }
};

const obterTaxaRetorno = async () => {
  try {
    const logs = await Log.find({ tipo: 'auth' }).sort({ data: 1 });

    const mapaUtilizadores = new Map();

    logs.forEach(log => {
      const userId = log.userId?.toString();
      if (!mapaUtilizadores.has(userId)) {
        mapaUtilizadores.set(userId, 1);
      } else {
        mapaUtilizadores.set(userId, mapaUtilizadores.get(userId) + 1);
      }
    });

    const totalUtilizadores = mapaUtilizadores.size;
    const utilizadoresQueVoltaram = Array.from(mapaUtilizadores.values()).filter(v => v > 1).length;
    const taxa = totalUtilizadores === 0 ? 0 : utilizadoresQueVoltaram / totalUtilizadores;

    console.log('Total de utilizadores:', totalUtilizadores);
    console.log('Utilizadores que voltaram:', utilizadoresQueVoltaram); 
    console.log('Taxa de retorno:', taxa);

    return {
      status: 200,
      resposta: {
        taxaRetorno: taxa,
        totalUtilizadores,
        utilizadoresQueVoltaram
      }
    };
  } catch (erro) {
    console.error('❌ Erro ao calcular taxa de retorno:', erro);
    return {
      status: 500,
      resposta: { mensagem: 'Erro ao calcular taxa de retorno.' }
    };
  }
};

const obterTaxaAdesaoFuncionalidades = async () => {
  try {
    // 1. Buscar todos os logs de tipo 'categoria' ou 'tarefa'
    const logsFuncionais = await Log.find({ tipo: { $in: ['categoria', 'tarefa'] } });

    const utilizadoresUnicos = new Set();

    logsFuncionais.forEach(log => {
      if (log.userId) {
        utilizadoresUnicos.add(log.userId.toString());
      }
    });

    const totalInteragiram = utilizadoresUnicos.size;

    // 2. Obter total de utilizadores da plataforma
    const User = require('../models/mongoose/userMongo'); // Atualiza o caminho se necessário
    const totalUtilizadores = await User.countDocuments();

    const taxa = totalUtilizadores === 0 ? 0 : totalInteragiram / totalUtilizadores;

    return {
      status: 200,
      resposta: {
        taxaAdesao: taxa,
        totalUtilizadores,
        totalInteragiram
      }
    };
  } catch (erro) {
    console.error('❌ Erro ao calcular taxa de adesão:', erro);
    return {
      status: 500,
      resposta: { mensagem: 'Erro ao calcular taxa de adesão às funcionalidades.' }
    };
  }
};

module.exports = {
  criarLog,
  listarLogsPorTipo,
  listarLogsPorProjetos,
    obterTaxaRetorno,
    obterTaxaAdesaoFuncionalidades
};
