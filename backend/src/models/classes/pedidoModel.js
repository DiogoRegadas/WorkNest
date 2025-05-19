class PedidoModel {
    #tipo;
    #de;
    #para;
    #idProjeto;
    #mensagem;
    #estado;
  
    constructor(tipo, de, para, idProjeto = null, mensagem = '') {
      this.#tipo = tipo;
      this.#de = de;
      this.#para = para;
      this.#idProjeto = idProjeto;
      this.#mensagem = mensagem;
      this.#estado = 'pendente';
    }
  
    get tipo() { return this.#tipo; }
    get de() { return this.#de; }
    get para() { return this.#para; }
    get idProjeto() { return this.#idProjeto; }
    get mensagem() { return this.#mensagem; }
    get estado() { return this.#estado; }
  
    set estado(novoEstado) { this.#estado = novoEstado; }
  }
  
  module.exports = PedidoModel;
  