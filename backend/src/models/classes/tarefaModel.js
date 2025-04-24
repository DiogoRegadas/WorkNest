// backend/src/models/classes/tarefaModel.js

class TarefaModel {
    #titulo;
    #descricao;
    #dataEntrega;
    #status;
    #responsavel;
    #idTopico;
  
    constructor(titulo, descricao, idTopico, dataEntrega = null, status = 'pendente', responsavel = null) {
      this.#titulo = titulo;
      this.#descricao = descricao;
      this.#idTopico = idTopico;
      this.#dataEntrega = dataEntrega;
      this.#status = status;
      this.#responsavel = responsavel;
    }
  
    get titulo() { return this.#titulo; }
    get descricao() { return this.#descricao; }
    get idTopico() { return this.#idTopico; }
    get dataEntrega() { return this.#dataEntrega; }
    get status() { return this.#status; }
    get responsavel() { return this.#responsavel; }
  
    set titulo(value) { this.#titulo = value; }
    set descricao(value) { this.#descricao = value; }
    set idTopico(value) { this.#idTopico = value; }
    set dataEntrega(value) { this.#dataEntrega = value; }
    set status(value) { this.#status = value; }
    set responsavel(value) { this.#responsavel = value; }
  
    atribuirResponsavel(responsavel) {
      this.#responsavel = responsavel;
    }
  
    atualizarStatus(novoStatus) {
      this.#status = novoStatus;
    }
  }
  
  module.exports = TarefaModel;
  