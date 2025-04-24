// backend/src/models/classes/mensagemModel.js

class MensagemModel {
    #conteudo;
    #autor;
    #idTopico;
  
    constructor(conteudo, autor, idTopico) {
      this.#conteudo = conteudo;
      this.#autor = autor;
      this.#idTopico = idTopico;
    }
  
    get conteudo() { return this.#conteudo; }
    get autor() { return this.#autor; }
    get idTopico() { return this.#idTopico; }
  
    set conteudo(value) { this.#conteudo = value; }
    set autor(value) { this.#autor = value; }
    set idTopico(value) { this.#idTopico = value; }
  
    editarMensagem(novoConteudo) {
      this.#conteudo = novoConteudo;
    }
  
    excluirMensagem() {
      this.#conteudo = '';
    }
  }
  
  module.exports = MensagemModel;
  