const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const axios = require("axios");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZpcmViYXNlLWZ1bmN0aW9ucyIsInJvbGUiOiJzeXN0ZW0iLCJhY2Vzc28iOiJmdW7Dp8O1ZXMtYXV0b23DoXRpY2FzIiwiaWF0IjoxNzQ4MzUyNjY3LCJleHAiOjE3NDg0MzkwNjd9.9Bb5SR71a8GixXxDNpW-hnWaDZeiJ-R68DPC1BvTXEQ";

exports.onNovaMensagem = onDocumentCreated(
  // Agora a base (default) já existe, não é preciso especificar
  "mensagens/{mensagemId}",
  async (event) => {
    const dados = event.data?.data();
    if (!dados) {
      console.error("❌ Nenhuma mensagem recebida.");
      return;
    }

    try {
      const resposta = await axios.post("https://worknest-0i8a.onrender.com/api/mensagens", {
        conteudo: dados.conteudo,
        autor: dados.autorId,
        topico: dados.topicoId,
        encriptada: dados.encriptada || false,
        meta: dados.meta || {}
      }, {
        headers: {
          Authorization: token
        }
      });

      console.log("✅ Mensagem enviada para o backend:", resposta.data);
    } catch (erro) {
      console.error("❌ Erro ao enviar para backend:", erro.message);
    }
  }
);
