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
