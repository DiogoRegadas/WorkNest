const User = require('../models/mongoose/userMongo'); // Mongoose schema
const bcrypt = require('bcryptjs');
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
        nivelAcesso: userModel.nivelAcesso || 1, // acesso básico por defeito
      });

      console.log('Criando novo utilizador:', novoUser);
  
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
      return { sucesso: false, mensagem: '❌ Invalid credentials.' };
    }

    const passwordMatch = await bcrypt.compare(userModel.password, user.password);

    if (!passwordMatch) {
      return { sucesso: false, mensagem: '❌ Invalid credentials.' };
    }

        const token = jwt.sign(
            { id: user._id, email: user.email, nivelAcesso: user.nivelAcesso },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '1h' }
        );

        const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_SECRET, { expiresIn: '12h' });

        console.log('refresh token', refreshToken);

        const identificador = `#${user._id.toString().slice(-4)}`;
        return {
            sucesso: true,
            mensagem: 'Login efetuado com sucesso.',
            token,
            refreshToken,
            utilizador: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              localidade: user.localidade,
              nivelAcesso: user.nivelAcesso,
              dataCriacao: user.createdAt,
              identificador
            }
          };
    } catch (erro) {
        console.error('❌ Erro no login:', erro);
        return { sucesso: false, mensagem: '❌ An unexpected error occurred.' };
    }
};


module.exports = {
    createUser,
    loginUser
};