const User = require('../models/database/userMongo'); // Mongoose schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userModel) => {
        
    try {
    // Verifica se já existe um utilizador com este email
        const emailExistente = await User.findOne({ email: userModel.email });
        if (emailExistente) {
            throw { message: 'Já existe um utilizador com este email :', emailExistente };
        }

        // Encripta a password antes de guardar
        const hashedPassword = await bcrypt.hash(userModel.password, 10);

        // Cria um novo documento com base no schema do MongoDB
        const novoUser = new User({
            username: userModel.nome,
            email: userModel.email,
            password: hashedPassword,
            nivelAcesso: 1,
        });

        const utilizadorCriado = await novoUser.save();
        console.log('✅ Utilizador criado:', utilizadorCriado);
            return { sucesso: true, mensagem: 'Utilizador criado com sucesso.' };
    } catch (erro) {
        console.error('❌ Erro ao criar utilizador:', erro);
        return { sucesso: false, mensagem: 'Erro ao criar utilizador.' };
    }
};

const loginUser = async (userModel) => {
    try {
        const user = await User.findOne({ email: userModel.email });
        if (!user) {
            return { sucesso: false, mensagem: 'Utilizador não encontrado.' };
        }

        const passwordMatch = await bcrypt.compare(userModel.password, user.password);
        if (!passwordMatch) {
            return { sucesso: false, mensagem: 'Palavra-passe incorreta.' };
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, nivelAcesso: user.nivelAcesso },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '1h' }
        );

        return {
            sucesso: true,
            mensagem: 'Login efetuado com sucesso.',
            token,
            utilizador: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                nivelAcesso: user.nivelAcesso,
                dataCriacao: user.dataCriacao
            }
        };
    } catch (erro) {
        console.error('❌ Erro no login:', erro);
        return { sucesso: false, mensagem: 'Erro ao efetuar login.' };
    }
};

module.exports = {
    createUser,
    loginUser
};