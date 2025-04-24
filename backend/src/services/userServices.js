const UserRegisterModel = require('../models/classes/userRegisterModel');
const UserLoginModel = require('../models/classes/userLoginModel');
const userHelper = require('../utils/userHelper');
const { registerUserSchema, loginUserSchema } = require('../validations/userValidations');

const registerUser = async (dados) => {
    const { error } = registerUserSchema.validate(dados);
    if (error) {
        return {
            status: 400,
            resposta: { sucesso: false, mensagem: error.details[0].message }
        };
    }

    const { nome, email, password } = dados;
    const newUser = new UserRegisterModel(nome, email, password);

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
                utilizador: resultado.utilizador
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

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
