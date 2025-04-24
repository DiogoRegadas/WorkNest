const UserService = require('../services/UserService');

exports.registerUser = async (req, res) => {
    try {
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
