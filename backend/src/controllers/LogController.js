const Log = require('../models/mongoose/Log');

async function obterTaxaRetorno(req, res) {
  try {
    const retornaram = await Log.aggregate([
      { $match: { tipo: 'auth' } },
      { $group: { _id: "$userId", total: { $sum: 1 } } },
      { $match: { total: { $gt: 1 } } },
      { $count: "retornaram" }
    ]);

    const totalUsers = await Log.distinct("userId", { tipo: "auth" });

    res.status(200).json({
      total: totalUsers.length,
      retornaram: retornaram[0]?.retornaram || 0
    });
  } catch (erro) {
    console.error("Erro ao calcular taxa de retorno:", erro);
    res.status(500).json({ erro: "Erro ao calcular taxa de retorno" });
  }
}

module.exports = {
  obterTaxaRetorno,
};
