// backend/src/controllers/topicoController.js

const TopicoService = require('../services/topicoServices');

exports.criarTopico = async (req, res) => {
    try {
        const resultado = await TopicoService.criarTopico(req.body);
        console.log("Resultado do serviço:", resultado);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao criar tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar tópico.' });
    }
};

exports.listarTopicos = async (req, res) => {
    try {
        const resultado = await TopicoService.listarTopicos();
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("❌ Erro ao listar tópicos:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar tópicos.' });
    }
};

exports.obterTopicoPorId = async (req, res) => {
    try {
        const resultado = await TopicoService.obterTopicoPorId(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao obter tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter tópico.' });
    }
};

exports.atualizarTopico = async (req, res) => {
    console.log(122222222);
    try {
        const resultado = await TopicoService.atualizarTopico(req.params.id, req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao atualizar tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar tópico.' });
    }
};

exports.apagarTopico = async (req, res) => {
    try {
        const resultado = await TopicoService.apagarTopico(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao apagar tópico:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar tópico.' });
    }
};

exports.arquivar = async (req, res) => {
    try {
      const resultado = await TopicoService.arquivarTopico(req.params.id, req.body);
      return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
      console.error("❌ Erro ao arquivar tópico:", error);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao arquivar tópico.' });
    }
  };
  
  exports.desarquivar = async (req, res) => {
    console.log("-----------------------------");
    console.log("Desarquivar tópico:", req.body);
    try {
      const resultado = await TopicoService.desarquivarTopico(req.params.id, req.body);
      return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
      console.error("❌ Erro ao desarquivar tópico:", error);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao desarquivar tópico.' });
    }
  };
  