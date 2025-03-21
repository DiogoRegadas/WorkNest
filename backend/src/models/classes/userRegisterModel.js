class UserRegisterModel {
    #nome;
    #email;
    #password;
    #dataCriacao;

    constructor(nome, email, password) {
        this.#nome = nome;
        this.#email = email;
        this.password = password; // Passa pelo setter
        this.#dataCriacao = new Date(); // Define automaticamente a data de criação
    }

    // Getters
    get nome() {
        return this.#nome;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    get dataCriacao() {
        return this.#dataCriacao;
    }

    // Setter para validar a password
    set password(novaPassword) {
        if (!this.#validarPassword(novaPassword)) {
            throw new Error('A palavra-passe não cumpre os requisitos de segurança.');
        }
        this.#password = novaPassword;
    }

    // Método privado para validar a password
    #validarPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }
}
