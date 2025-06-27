const LogService = require('../services/LogService');

exports.obterTaxaRetorno = async (req, res) => {
  try {
    const resultado = await LogService.obterTaxaRetorno();
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error("❌ Erro ao calcular taxa de retorno:", erro);
    return res.status(500).json({ erro: "Erro ao calcular taxa de retorno" });
  }
};

exports.listarLogsPorProjetos = async (req, res) => {
  try {
    const { projetoIds } = req.body;
    const resultado = await LogService.listarLogsPorProjetos(projetoIds);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error("❌ Erro ao listar logs por projetos:", erro);
    return res.status(500).json({ erro: "Erro interno no servidor" });
  }
};

exports.obterTaxaAdesaoFuncionalidades = async (req, res) => {
  try {
    const resultado = await LogService.obterTaxaAdesaoFuncionalidades();
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error("❌ Erro ao obter taxa de adesão:", erro);
    return res.status(500).json({ erro: "Erro ao obter taxa de adesão" });
  }
};

