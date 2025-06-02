const TarefaService = require('../services/tarefaServices');

exports.criarTarefa = async (req, res) => {
  try {
    const resultado = await TarefaService.criarTarefa(req.body);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao criar tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar tarefa.' });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const resultado = await TarefaService.listarTarefas();
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao listar tarefas:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar tarefas.' });
  }
};

exports.obterTarefaPorId = async (req, res) => {
  try {
    const resultado = await TarefaService.obterTarefaPorId(req.params.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao obter tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter tarefa.' });
  }
};

exports.atualizarTarefa = async (req, res) => {
  try {
    const resultado = await TarefaService.atualizarTarefa(req.params.id, req.body);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao atualizar tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar tarefa.' });
  }
};

exports.apagarTarefa = async (req, res) => {
  try {
    const resultado = await TarefaService.apagarTarefa(req.params.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao apagar tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar tarefa.' });
  }
};

// ✅ Novo controlador para upload de anexos
exports.uploadAnexos = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Nenhum ficheiro enviado.' });
    }

    const resultado = await TarefaService.uploadFicheirosParaTarefa(id, req.files);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao enviar anexos:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao enviar anexos.' });
  }
};
