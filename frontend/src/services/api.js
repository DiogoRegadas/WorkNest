import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


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
  
    return resposta.data
    
  };

  export const pesquisarUtilizadores = async (query) => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.get(`${API_URL}/users/search?query=${query}`, {
        headers: {
          Authorization: token
        }
      });
  
      return resposta.data.utilizadores; // devolve array
    } catch (erro) {
      throw erro.response?.data || { mensagem: 'Erro ao procurar utilizadores.' };
    }
  };

  export const enviarPedidoAmizade = async (idDestino) => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.post(`${API_URL}/pedidos/enviar`, {
        tipo: 'amizade',          // ← obrigatório
        para: idDestino           // ← nome correto no schema
      }, {
        headers: { Authorization: token }
      });
  
      return resposta.data;
    } catch (erro) {
      throw erro.response?.data || { mensagem: 'Erro ao enviar pedido.' };
    }
  };

  export const listarPedidosPendentes = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.get(`${API_URL}/pedidos/pendentes`, {
        headers: {
          Authorization: token
        }
      });
  
      return resposta.data;
    } catch (erro) {
      throw erro.response?.data || { mensagem: 'Erro ao listar pedidos pendentes.' };
    }
  };

  export const responderPedido = async (idPedido, resposta) => {
    const token = localStorage.getItem('token');
  
    const respostaApi = await axios.post(
      `${API_URL}/pedidos/responder/${idPedido}`,
      { resposta }, // 'aceite' ou 'recusado'
      { headers: { Authorization: token } }
    );
  
    return respostaApi.data;
  };

  export const obterAmigos = async () => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.get(`${API_URL}/users/amigos`, {
        headers: { Authorization: token }
      });
      return resposta.data;
    } catch (erro) {
      throw erro.response?.data || { mensagem: 'Erro ao obter amigos.' };
    }
  };


  export const obterProjetoCompleto = async (idProjeto) => {
    const token = localStorage.getItem('token');
    try {
      const resposta = await axios.get(`${API_URL}/projects/${idProjeto}/completo`, {
        headers: { Authorization: token }
      });
      //console.log('🚀 Dados do projeto completo:', resposta.data.projeto.resposta);
      return resposta.data.projeto.resposta;
    } catch (erro) {
      console.error('❌ Erro ao obter projeto completo:', erro);
      throw erro.response?.data || { mensagem: 'Erro ao obter dados do projeto.' };
    }
  };

  export const criarTopico = async (dados) => {
    const token = localStorage.getItem('token');
    console.log('🚀 Dados do tópico:', dados);
    const resposta = await axios.post(`${API_URL}/topicos`, dados, {
      headers: { Authorization: token }
    });
    return resposta.data;
  };
  
  
  
  export const apagarTopico = async (idTopico) => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.delete(`${API_URL}/topicos/topicoDL/${idTopico}`, {
        headers: { Authorization: token }
      });
      return resposta.data;
    } catch (erro) {
      console.error('❌ Erro ao apagar tópico:', erro);
      throw erro.response?.data || { mensagem: 'Erro ao apagar tópico.' };
    }
  };

  export const criarCategoria = async (dadosCategoria) => {
    const token = localStorage.getItem('token');
  
    try {
      const resposta = await axios.post(`${API_URL}/categorias/criarcategoria`, dadosCategoria, {
        headers: { Authorization: token }
      });
      return resposta.data;
    } catch (erro) {
      console.error("❌ Erro ao criar categoria:", erro);
      throw erro.response?.data || { mensagem: 'Erro ao criar categoria.' };
    }
  };
  

// Atualizar nome da categoria
export const atualizarCategoria = async (idCategoria, dados) => {
  const token = localStorage.getItem('token');

  try {
    const resposta = await axios.put(
      `${API_URL}/categorias/categoriaUP/${idCategoria}`,
      dados,
      {
        headers: { Authorization: token }
      }
    );
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao atualizar categoria:", erro);
    throw erro.response?.data || { mensagem: 'Erro ao atualizar categoria.' };
  }
};

export const apagarCategoria = async (idCategoria) => {
  const token = localStorage.getItem('token');
  try {
    const resposta = await axios.delete(`${API_URL}/categorias/categoriaDL/${idCategoria}`, {
      headers: { Authorization: token }
    });
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao apagar categoria:", erro);
    return erro.response?.data || { sucesso: false, mensagem: 'Erro ao apagar categoria.' };
  }
};

// Atualizar nome do tópico
export const atualizarTopico = async (idTopico, dados) => {
  const token = localStorage.getItem('token');

  try {
    const resposta = await axios.put(
      `${API_URL}/topicos/topicoUP/${idTopico}`,
      dados,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      }
    );
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao atualizar tópico:", erro);
    throw erro.response?.data || { mensagem: 'Erro ao atualizar tópico.' };
  }
};

export const arquivarCategoria = async (idCategoria) => {
  const token = localStorage.getItem('token');
  try {
    const resposta = await axios.patch(`${API_URL}/categorias/arquivar/${idCategoria}`, null, {
      headers: { Authorization: token }
    });
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao arquivar categoria:", erro);
    return erro.response?.data || { sucesso: false, mensagem: 'Erro ao arquivar categoria.' };
  }
};

export const desarquivarCategoria = async (idCategoria) => {
  const token = localStorage.getItem('token');
  try {
    const resposta = await axios.patch(`${API_URL}/categorias/desarquivar/${idCategoria}`, null, {
      headers: { Authorization: token }
    });
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao desarquivar categoria:", erro);
    return erro.response?.data || { sucesso: false, mensagem: 'Erro ao desarquivar categoria.' };
  }
};

  
export const arquivarTopico = async (idTopico, idProjeto) => {
  const token = localStorage.getItem('token');
  try {
    const resposta = await axios.patch(
      `${API_URL}/topicos/arquivar/${idTopico}`,
      { idProjeto }, // corpo do PATCH
      { headers: { Authorization: token } }
    );
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao arquivar tópico:", erro);
    return erro.response?.data || { sucesso: false, mensagem: 'Erro ao arquivar tópico.' };
  }
};

export const desarquivarTopico = async (idTopico, idProjeto) => {
  const token = localStorage.getItem('token');
  console.log("Desarquivar tópico:", idProjeto);
  try {
    const resposta = await axios.patch(
      `${API_URL}/topicos/desarquivar/${idTopico}`,
      { idProjeto }, // corpo do PATCH
      { headers: { Authorization: token } }
    );
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao desarquivar tópico:", erro);
    return erro.response?.data || { sucesso: false, mensagem: 'Erro ao desarquivar tópico.' };
  }
};


export const enviarPedidoProjeto = async ({ para, idProjeto }) => {
  const token = localStorage.getItem('token');

  try {
    const resposta = await axios.post(`${API_URL}/pedidos/enviar`, {
      tipo: 'projeto',
      para,
      idProjeto
    }, {
      headers: { Authorization: token }
    });

    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao enviar pedido de projeto:", erro);
    throw erro.response?.data || { mensagem: 'Erro ao enviar pedido.' };
  }
};

export const removerColaborador = async (idProjeto, idUtilizador) => {
  const token = localStorage.getItem('token');

  try {
    const resposta = await axios.delete(
      `${API_URL}/projects/projetos/${idProjeto}/colaboradores/${idUtilizador}`,
      {
        headers: { Authorization: token }
      }
    );
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao remover colaborador:", erro);
    throw erro.response?.data || { mensagem: 'Erro ao remover colaborador.' };
  }
};

export const transferirOwnerProjeto = async (idProjeto, novoOwnerId) => {
  const token = localStorage.getItem('token');

  try {
    const resposta = await axios.post(
      `${API_URL}/projects/projetos/${idProjeto}/transferir-owner`,
      { novoOwnerId },
      {
        headers: { Authorization: token }
      }
    );
    return resposta.data;
  } catch (erro) {
    console.error("❌ Erro ao transferir posse do projeto:", erro);
    throw erro.response?.data || { mensagem: 'Erro ao transferir posse do projeto.' };
  }
};



const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');

  if (token) {
    const decoded = jwtDecode(token);
    const expTime = decoded.exp * 1000;
    const agora = Date.now();

    if (expTime - agora < 10 * 60 * 1000 && refreshToken) {
      try {
        const resposta = await axios.post(`${API_URL}/auth/refresh-token`, { refreshToken });
        token = resposta.data.token;
        localStorage.setItem('token', token);
      } catch (erro) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    config.headers['Authorization'] = token;
  }

  return config;
});