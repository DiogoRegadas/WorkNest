import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const registarUtilizador = async (dados) => {
  try {
    const resposta = await axios.post(`${API_URL}/users/register`, dados);
    return resposta.data;
  } catch (erro) {
    // Reencaminha o erro para o componente tratar
    throw erro.response?.data || { message: 'Erro desconhecido' };
  }
};

export const loginUtilizador = async (dados) => {
    try {
      const resposta = await axios.post(`${API_URL}/users/login`, dados);
      return resposta.data;
    } catch (erro) {
      // Reencaminha o erro para o componente tratar
      throw erro.response?.data || { message: 'Erro desconhecido' };
    }
  };

export const obterPerfil = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: token }
      });
      return resposta.data;
    } catch (erro) {
      throw erro.response?.data || { mensagem: 'Erro ao obter perfil.' };
    }
  };

  export const criarProjeto = async (dadosProjeto) => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.post(`${API_URL}/projects/criarprojetos`, dadosProjeto, {
        headers: { Authorization: token }
      });
      return resposta.data;
    } catch (erro) {
      throw erro.response?.data || { mensagem: 'Erro ao criar projeto.' };
    }
  };


  export const listarProjetos = async () => {
    const token = localStorage.getItem('token');
  
    const resposta = await axios.get(`${API_URL}/projects/projetos`, {
      headers: {
        Authorization: token
      }
    });
  
    return resposta.data;
  };
