class UserModel {
    #uid;
    #firstName;
    #lastName;
    #email;
    #localidade;
    #nivelAcesso;
    #dataCriacao;

    constructor(uid, firstName, lastName, email, localidade, nivelAcesso, dataCriacao) {
        this.#uid = uid;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#localidade = localidade;
        this.#nivelAcesso = nivelAcesso;
        this.#dataCriacao = dataCriacao;
    }

    // Getters
    get uid() {
        return this.#uid;
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName;
    }

    get email() {
        return this.#email;
    }

    get localidade() {
        return this.#localidade;
    }

    get nivelAcesso() {
        return this.#nivelAcesso;
    }

    get dataCriacao() {
        return this.#dataCriacao;
    }

    // Setters
    set firstName(nome) {
        this.#firstName = nome;
    }

    set lastName(apelido) {
        this.#lastName = apelido;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    set localidade(novaLocalidade) {
        this.#localidade = novaLocalidade;
    }

    set nivelAcesso(novoNivel) {
        this.#nivelAcesso = novoNivel;
    }

    set dataCriacao(novaData) {
        this.#dataCriacao = novaData;
    }
}

module.exports = UserModel;
