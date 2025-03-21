const User = require('../models/database/userMongo'); // Mongoose schema
const bcrypt = require('bcrypt');

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

module.exports = {
    createUser
};