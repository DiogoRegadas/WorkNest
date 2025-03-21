const User = require('../models/classes/userModel');
const UserRegisterModel = require('../models/classes/userRegisterModel');
const userHelper = require('../utils/userHelper');
//const { registerUserSchema } = require('../validations/userValidations');
const bcrypt = require('bcrypt');

// Registar um novo utilizador
exports.registerUser = async (req, res) => {
    try {
        const { error } = registerUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Criar instância do modelo antes de enviar para o helper
        const { nome, email, password } = req.body;
        const newUser = new UserRegisterModel(nome, email, password);
        
        // Passar a instância para o helper
        const createdUser = await userHelper.createUser(newUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registar utilizador.' });
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

