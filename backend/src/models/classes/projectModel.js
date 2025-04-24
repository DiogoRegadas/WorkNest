class ProjetoModel {
    #idProjeto;
    #nome;
    #descricao;
    #dataCriacao;
    #owner; // id do utilizador que criou
    #listaUtilizadores;
    #listaCategorias;
  
    constructor(nome, descricao, ownerId) {
      this.#idProjeto = idProjeto; // ou usa mongoose._id depois
      this.#nome = nome || '';
      this.#descricao = descricao || '';
      this.#dataCriacao = new Date();
      this.#owner = ownerId; // começa com o criador
      this.#listaUtilizadores = []; 
      this.#listaCategorias = [];
    }
  
    get idProjeto() { return this.#idProjeto; }
    get nome() { return this.#nome; }
    get descricao() { return this.#descricao; }
    get dataCriacao() { return this.#dataCriacao; }
    get owner() { return this.#owner; }
    get listaUtilizadores() { return this.#listaUtilizadores; }
    get listaCategorias() { return this.#listaCategorias; }
  
    set nome(value) { this.#nome = value; }
    set descricao(value) { this.#descricao = value; }
    set owner(value) { this.#owner = value; }
    set listaUtilizadores(value) { this.#listaUtilizadores = value; }
    set listaCategorias(value) { this.#listaCategorias = value; }
  }
  
  module.exports = ProjetoModel;
  