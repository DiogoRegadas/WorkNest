const User = require('../models/database/User');
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


// Obter todos os utilizadores
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Excluir password
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar utilizadores.' });
    }
};
