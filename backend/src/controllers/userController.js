const User = require('../models/classes/userModel');
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

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter utilizadores.' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilizador não encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter utilizador.' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'Utilizador não encontrado' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar utilizador.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Utilizador não encontrado' });
        res.json({ message: 'Utilizador eliminado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao eliminar utilizador.' });
    }
};

