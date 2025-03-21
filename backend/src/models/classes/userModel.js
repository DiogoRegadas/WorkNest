class UserModel {
    #uid;
    #nome;
    #email;
    #nivelAcesso;
    #dataCriacao;

    constructor(uid, nome, email, nivelAcesso, dataCriacao) {
        Uid = uid;
        Nome = nome;
        Email = email;
        NivelAcesso = nivelAcesso;
        DataCriacao = dataCriacao;
    }

    // Getters
    get Uid() {
        return this.#uid;
    }

    get Nome() {
        return this.#nome;
    }

    get Email() {
        return this.#email;
    }

    get NivelAcesso() {
        return this.#nivelAcesso;
    }

    get DataCriacao() {
        return this.#dataCriacao;
    }

    // Setters
    set Nome(novoNome) {
        this.#nome = novoNome;
    }

    set Email(novoEmail) {
        this.#email = novoEmail;
    }

    set NivelAcesso(novoNivel) {
        this.#nivelAcesso = novoNivel;
    }

    set DataCriacao(novaData) {
        this.#dataCriacao = novaData;
    }
}

module.exports = UserModel;