const User = require('../models/database/userMongo'); // Mongoose schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userModel) => {
    try {
      // Verifica se já existe um utilizador com este email
      const emailExistente = await User.findOne({ email: userModel.email });
      if (emailExistente) {
        throw { message: 'Já existe um utilizador com este email.', email: emailExistente.email };
      }
  
      // ⚠️ Já vem com hash do frontend! NÃO fazemos bcrypt aqui
  
      // Cria um novo documento com base no schema atualizado
      const novoUser = new User({
        firstName: userModel.firstName,
        lastName: userModel.lastName,
        email: userModel.email,
        password: userModel.password, // já está encriptada
        localidade: userModel.localidade,
        nivelAcesso: 1,
      });
  
      const utilizadorCriado = await novoUser.save();
      console.log('✅ Utilizador criado:', utilizadorCriado);
      return { sucesso: true, mensagem: 'Utilizador criado com sucesso.' };
    } catch (erro) {
      console.error('❌ Erro ao criar utilizador:', erro);
      return { sucesso: false, mensagem: erro.message || 'Erro ao criar utilizador.' };
    }
  };

  const loginUser = async (userModel) => {
    try {
        const user = await User.findOne({ email: userModel.email });
        if (!user) {
            return { sucesso: false, mensagem: 'Utilizador não encontrado.' };
        }
        
        // Aqui já não usamos bcrypt — comparamos hashes diretamente
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
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              localidade: user.localidade,
              nivelAcesso: user.nivelAcesso,
              dataCriacao: user.createdAt
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