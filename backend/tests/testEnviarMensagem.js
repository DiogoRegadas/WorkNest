// testEnviarMensagem.js


const axios = require('axios');

const mensagemTeste = {
  conteudo: "Mensagem de teste enviada com script",
  autor: "680b645c33b865a71158e844",  // coloca um ID válido
  topico: "68232e026ddc52701b420438", // coloca um ID válido
  encriptada: false,
  meta: {
    tipo: "teste",
    comandos: ["/ajuda"]
  }
};

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGMxMjgxNDc0MjM4MWJkYjNlNzRiZSIsImVtYWlsIjoic2FyYS5yZWdhZGFzQGdtYWlsLmNvbSIsIm5pdmVsQWNlc3NvIjoxLCJpYXQiOjE3NDc4MTkwMzMsImV4cCI6MTc0NzgyOTgzM30.smnutSLjtgYMjPEvN_CAyqqQxo1si1Fbg2bMejLNmG4";

async function enviarMensagem() {
  try {
    const resposta = await axios.post("http://localhost:3000/api/mensagens", mensagemTeste, {
      headers: {
        Authorization: token
      }
    });
    console.log("✅ Mensagem criada:", resposta.data);
  } catch (erro) {
    console.error("❌ Erro ao enviar mensagem:", erro.response?.data || erro.message || erro);
  }
}

enviarMensagem();
