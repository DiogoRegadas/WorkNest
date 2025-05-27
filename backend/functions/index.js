const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

exports.onNovaMensagem = functions.firestore
  .document('mensagens/{mensagemId}')
  .onCreate(async (snap, context) => {
    const dadosMensagem = snap.data();

    try {
      const resposta = await axios.post('https://worknest-0i8a.onrender.com/api/mensagens', {
        conteudo: dadosMensagem.conteudo,
        autor: dadosMensagem.autorId,
        topico: dadosMensagem.topicoId,
        encriptada: dadosMensagem.encriptada || false,
        meta: dadosMensagem.meta || {}
      });

      console.log('✅ Mensagem enviada para backend Render → MongoDB:', resposta.data);
    } catch (erro) {
      console.error('❌ Erro ao enviar mensagem para backend:', erro.message);
    }
  });
