// backend/src/models/classes/topicoModel.js

class TopicoModel {
    #titulo;
    #descricao;
    #idCategoria;
    #listaMensagens;
    #listaTarefas;
  
    constructor(titulo, descricao, idCategoria) {
      this.#titulo = titulo;
      this.#descricao = descricao;
      this.#idCategoria = idCategoria;
      this.#listaMensagens = [];
      this.#listaTarefas = [];
    }
  
    get titulo() { return this.#titulo; }
    get descricao() { return this.#descricao; }
    get idCategoria() { return this.#idCategoria; }
    get listaMensagens() { return this.#listaMensagens; }
    get listaTarefas() { return this.#listaTarefas; }
  
    set titulo(value) { this.#titulo = value; }
    set descricao(value) { this.#descricao = value; }
    set idCategoria(value) { this.#idCategoria = value; }
    set listaMensagens(value) { this.#listaMensagens = value; }
    set listaTarefas(value) { this.#listaTarefas = value; }
  }
  
  module.exports = TopicoModel;
  