class CategoriaModel {
    #uid;
    #nome;
    #descricao;
    #idProjeto;
    #listaTopicos;
  
    constructor(nome, descricao, idProjeto) {
      this.#nome = nome;
      this.#descricao = '';
      this.#idProjeto = idProjeto;
      this.#listaTopicos = [];
    }
  
    get uid() { return this.#uid; }
    get nome() { return this.#nome; }
    get descricao() { return this.#descricao; }
    get idProjeto() { return this.#idProjeto; }
    get listaTopicos() { return this.#listaTopicos; }
  
    set uid(value) { this.#uid = value; }
    set nome(value) { this.#nome = value; }
    set descricao(value) { this.#descricao = value; }
    set idProjeto(value) { this.#idProjeto = value; }
    set listaTopicos(value) { this.#listaTopicos = value; }
  }
  
  module.exports = CategoriaModel;