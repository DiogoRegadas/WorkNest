const User = require('../models/classes/userModel');
const UserLoginModel = require('../models/classes/userLoginModel');
const UserRegisterModel = require('../models/classes/userRegisterModel');
const userHelper = require('../utils/userHelper');
const { registerUserSchema, loginUserSchema } = require('../validations/userValidations');
const bcrypt = require('bcrypt');


// Registar um novo utilizador
exports.registerUser = async (req, res) => {
    try {
        console.log("📥 Pedido recebido:", req.body); // 👈 1. Ver se os dados chegaram

        const { error } = registerUserSchema.validate(req.body);
        if (error) {
            console.log("❌ Erro de validação Joi:", error.details[0].message); // 👈 2. Ver se falha aqui
            return res.status(400).json({ sucesso: false, mensagem: error.details[0].message });
        }

        const { nome, email, password } = req.body;
        const newUser = new UserRegisterModel(nome, email, password);
        console.log("🧱 UserRegisterModel criado:", newUser); // 👈 3. Ver se chegou até aqui

        const resultado = await userHelper.createUser(newUser);
        console.log("✅ Resultado do helper:", resultado); // 👈 4. Ver o retorno

        if (resultado.sucesso) {
            return res.status(201).json({ sucesso: true, mensagem: resultado.mensagem });
        } else {
            return res.status(400).json({ sucesso: false, mensagem: resultado.mensagem });
        }
    } catch (error) {
        console.error("❌ Erro no controller:", error); // 👈 5. Apanhar qualquer falha
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao registar utilizador.' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { error } = loginUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ sucesso: false, mensagem: error.details[0].message });
        }

        const user = new UserLoginModel(req.body.email, req.body.password);
        
        const resultado = await userHelper.loginUser(user);

        if (resultado.sucesso) {
            return res.status(200).json({
                sucesso: true,
                mensagem: resultado.mensagem,
                token: resultado.token,
                utilizador: resultado.utilizador
            });
        } else {
            return res.status(401).json({ sucesso: false, mensagem: resultado.mensagem });
        }
    } catch (error) {
        console.error("❌ Erro no login controller:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao efetuar login.' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const { id, email, nome, nivelAcesso, dataCriacao } = req.user;
        return res.status(200).json({
            sucesso: true,
            utilizador: { id, email, nome, nivelAcesso, dataCriacao }
        });
    } catch (error) {
        console.error("❌ Erro ao obter perfil:", error);
        return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter perfil.' });
    }
};


