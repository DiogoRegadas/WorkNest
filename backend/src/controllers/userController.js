const UserService = require('../services/userServices');
const LogService = require('../services/LogService');

exports.registerUser = async (req, res) => {
    try {
        console.log("Dados recebidos para registo:", req.body);
        const resultado = await UserService.registerUser(req.body);
        
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro no controller:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao registar utilizador.' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const resultado = await UserService.loginUser(req.body);
        await LogService.criarLog({
          userId: resutlado.utilizador._id,
          tipo: 'auth',
          detalhe: 'Login efetuado com sucesso'
        });
        return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
        console.error("❌ Erro no login controller:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao efetuar login.' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const resposta = await UserService.getUserProfile(req.user);
        return res.status(200).json(resposta);
    } catch (error) {
        console.error("❌ Erro ao obter perfil:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter perfil.' });
    }
};

exports.pesquisarUtilizadores = async (req, res) => {
    try {
      const termo = req.query.query;
      console.log("Termo de pesquisa:", termo);
      const resultado = await UserService.pesquisarUtilizadores(termo, req.user.id);
      console.log("Resultado da pesquisa:", resultado);
  
      return res.status(200).json({ sucesso: true, utilizadores: resultado });
    } catch (error) {
      console.error('❌ Erro na pesquisa de utilizadores:', error);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao pesquisar utilizadores.' });
    }
  };

  exports.obterAmigos = async (req, res) => {
    try {
      const resultado = await UserService.obterAmigos(req.user.id);
      return res.status(resultado.status).json(resultado.resposta);
    } catch (error) {
      return res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao obter amigos.' });
    }
  };
