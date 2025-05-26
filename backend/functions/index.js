const { MongoClient } = require('mongodb');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const uri = "mongodb+srv://ddiogoregadas:lQ67b36rDKe27I1i@cluster0.mrjblkp.mongodb.net/worknest?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

exports.onNovaMensagem = functions.firestore
  .document('mensagens/{mensagemId}')
  .onCreate(async (snap, context) => {
    const dadosMensagem = snap.data();

    try {
      await client.connect();
      const database = client.db('worknest');
      const collection = database.collection('t_mensagens');

      const resultado = await collection.insertOne({
        conteudo: dadosMensagem.conteudo,
        autor: dadosMensagem.autorId,
        topico: dadosMensagem.topicoId,
        encriptada: dadosMensagem.encriptada || false,
        meta: dadosMensagem.meta || {},
        dataRecebida: new Date()
      });

      console.log('✅ Mensagem inserida no MongoDB com ID:', resultado.insertedId);
    } catch (erro) {
      console.error('❌ Erro ao guardar no MongoDB Atlas:', erro.message);
    } finally {
      await client.close();
    }
  });
