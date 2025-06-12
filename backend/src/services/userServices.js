const UserRegisterModel = require('../models/classes/userRegisterModel');
const UserLoginModel = require('../models/classes/userLoginModel');
const userHelper = require('../utils/userHelper');
const { registerUserSchema, loginUserSchema } = require('../validations/userValidations');
const User = require('../models/mongoose/userMongo');
const Pedido = require('../models/mongoose/PedidoMongo');


const registerUser = async (dados) => {
    const { error } = registerUserSchema.validate(dados);
    if (error) {
        console.log("Erro na validação:", error.details[0].message);
      return {
        status: 400,
        resposta: { sucesso: false, mensagem: error.details[0].message }
      };
    }
    
    console.log("Dados recebidos para registo:", dados);
    const { firstName, lastName, localidade, email, password, nivelAcesso } = dados;
  
    // Criação do utilizador com os novos campos
    const newUser = new UserRegisterModel(firstName, lastName, localidade, email, password, nivelAcesso);
  
    const resultado = await userHelper.createUser(newUser);

    
  
    if (resultado.sucesso) {
      return {
        status: 201,
        resposta: { sucesso: true, mensagem: resultado.mensagem }
      };
    } else {
      return {
        status: 400,
        resposta: { sucesso: false, mensagem: resultado.mensagem }
      };
    }
  };
  

const loginUser = async (dados) => {
    const { error } = loginUserSchema.validate(dados);
    if (error) {
        return {
            status: 400,
            resposta: { sucesso: false, mensagem: error.details[0].message }
        };
    }

    const user = new UserLoginModel(dados.email, dados.password);
    const resultado = await userHelper.loginUser(user);



    if (resultado.sucesso) {
        return {
            status: 200,
            resposta: {
                sucesso: true,
                mensagem: resultado.mensagem,
                token: resultado.token,
                refreshToken: resultado.refreshToken,
                utilizador: resultado.utilizador,
                
            }
        };
    } else {
        return {
            status: 401,
            resposta: { sucesso: false, mensagem: resultado.mensagem }
        };
    }
};

const getUserProfile = async (userData) => {
    const { id, email, nome, nivelAcesso, dataCriacao } = userData;
    return {
        sucesso: true,
        utilizador: { id, email, nome, nivelAcesso, dataCriacao }
    };
};

const pesquisarUtilizadores = async (termo, idAtual) => {
  if (!termo || termo.trim() === '') return [];

  
  const regex = new RegExp(termo, 'i'); // insensitive
  const utilizadores = await User.find({
    $or: [
      { firstName: regex },
      { lastName: regex }
    ],
    _id: { $ne: idAtual }
  }).select('_id firstName lastName email');

  const pedidos = await Pedido.find({
    de: idAtual,
    tipo: 'amizade',
    estado: 'pendente'
  }).select('para');

  const idsComPedido = pedidos.map(p => p.para.toString());

  // Acrescentar identificador virtual
  const resultado = utilizadores.map(u => ({
    _id: u._id,
    firstName: u.firstName,
    lastName: u.lastName,
    identificador: `#${u._id.toString().slice(-4)}`,
    pedidoEnviado: idsComPedido.includes(u._id.toString())
  }));

  return resultado;
};

const obterAmigos = async (idUser) => {
  try {
    const utilizador = await User.findById(idUser).populate('friends', 'firstName lastName _id');
    return {
      status: 200,
      resposta: { sucesso: true, amigos: utilizador.friends || [] }
    };
  } catch (error) {
    console.error("❌ Erro ao obter amigos:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao obter amigos.' }
    };
  }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    pesquisarUtilizadores
    , obterAmigos
};
