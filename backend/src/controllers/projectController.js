const ProjetoService = require('../services/projectServices');

exports.criarProjeto = async (req, res) => {
    try {
        const resultado = await ProjetoService.criarProjeto(req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao criar projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar projeto.' });
    }
};

exports.listarProjetos = async (req, res) => {
    try {
        console.log('🔍 ID do utilizador autenticado:', req.user.id);
        const idUser = req.user.id; 
        const resultado = await ProjetoService.listarProjetos(idUser);
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("❌ Erro ao listar projetos:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar projetos.' });
    }
};


exports.obterProjetoPorId = async (req, res) => {
    try {
      const id = req.params.id;
  
      const resultado = await ProjectService.obterProjetoCompleto(id);
  
      return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
      console.error("❌ Erro ao obter projeto:", error);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao obter projeto.' });
    }
  };

exports.atualizarProjeto = async (req, res) => {
    try {
        const resultado = await ProjetoService.atualizarProjeto(req.params.id, req.body);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao atualizar projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar projeto.' });
    }
};

exports.apagarProjeto = async (req, res) => {
    try {
        const resultado = await ProjetoService.apagarProjeto(req.params.id);
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro ao apagar projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar projeto.' });
    }
};

exports.obterProjetoCompleto = async (req, res) => {
  const { id } = req.params;
    try {
        const projeto = await ProjetoService.obterProjetoCompletoPorId(id);
        if (!projeto) {
            return res.status(404).json({ sucesso: false, mensagem: 'Projeto não encontrado.' });
        }
        return res.status(200).json({ sucesso: true, projeto });
    }
  catch (error) {
        console.error("❌ Erro ao obter projeto:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter projeto.' });
    }
  
};

exports.removerColaborador = async (req, res) => {
    try {
      const { idProjeto, idUtilizador } = req.params;
      const resultado = await ProjetoService.removerColaborador(idProjeto, idUtilizador);
      return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
      console.error("❌ Erro ao remover colaborador:", error);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao remover colaborador.' });
    }
  };
  
  exports.transferirOwner = async (req, res) => {
    try {
      const { idProjeto } = req.params;
      const { novoOwnerId } = req.body;
      const resultado = await ProjetoService.transferirOwner(idProjeto, novoOwnerId);
      return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
      console.error("❌ Erro ao transferir owner:", error);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao transferir posse.' });
    }
  };

