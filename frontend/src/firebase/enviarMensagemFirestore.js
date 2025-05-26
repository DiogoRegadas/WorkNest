// src/firebase/enviarMensagemFirestore.js
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const enviarMensagemParaFirestore = async ({ conteudo, autorId, topicoId, encriptada = false, meta = {} }) => {
  try {
    console.log("📤 Enviando mensagem para o Firestore...");
    console.log("Conteúdo:", conteudo);
    console.log("Autor ID:", autorId);
    console.log("Tópico ID:", topicoId);
    console.log("Encriptada:", encriptada);
    console.log("Meta:", meta);
    
    const docRef = await addDoc(collection(db, "mensagens"), {
      conteudo,
      autorId,
      topicoId,
      encriptada,
      dataEnvio: Timestamp.now()
    });

    console.log("ID gerado pelo Firestore:", docRef.id);


    console.log("✅ Mensagem enviada para Firestore com ID:", docRef.id);
  } catch (erro) {
    console.error("❌ Erro ao enviar mensagem para o Firestore:", erro);
  }
};
