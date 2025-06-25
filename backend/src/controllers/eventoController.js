const EventoService = require('../services/eventoServices');

exports.criarEvento = async (req, res) => {
  try {
    const resultado = await EventoService.criarEvento(req.body);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('❌ Erro ao criar evento:', erro);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar evento.' });
  }
};

exports.listarEventosPorProjeto = async (req, res) => {
  try {
    const resultado = await EventoService.listarEventosPorProjeto(req.params.idProjeto);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('❌ Erro ao listar eventos por projeto:', erro);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar eventos.' });
  }
};

exports.listarEventosPorProjetos = async (req, res) => {
  try {
    const { projetos } = req.body;

    if (!Array.isArray(projetos) || projetos.length === 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Lista de projetos inválida.' });
    }

    const resultado = await EventoService.listarEventosPorProjetos(projetos);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('❌ Erro ao listar eventos por lista de projetos:', erro);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar eventos.' });
  }
};

exports.apagarEvento = async (req, res) => {
  try {
    const resultado = await EventoService.apagarEvento(req.params.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('❌ Erro ao apagar evento:', erro);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar evento.' });
  }
};
