// src/utils/encryptionUtils.js
import CryptoJS from "crypto-js";

/**
 * Encripta uma mensagem de texto com AES e uma chave.
 * @param {string} conteudo - Texto plano a encriptar.
 * @param {string} chave - Chave AES partilhada (por tópico).
 * @returns {string} Mensagem encriptada.
 */
export function encryptMessage(conteudo, chave) {
  try {
    return CryptoJS.AES.encrypt(conteudo, chave).toString();
  } catch (error) {
    console.error("❌ Erro ao encriptar:", error);
    return null;
  }
}

/**
 * Desencripta uma mensagem AES com uma chave.
 * @param {string} mensagemEncriptada - Texto encriptado.
 * @param {string} chave - Chave AES usada na encriptação.
 * @returns {string} Texto original.
 */
export function decryptMessage(mensagemEncriptada, chave) {
  try {
    const bytes = CryptoJS.AES.decrypt(mensagemEncriptada, chave);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("❌ Erro ao desencriptar:", error);
    return null;
  }
}
