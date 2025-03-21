class UserRegisterModel {
    #nome;
    #email;
    #password;

    constructor(nome, email, password) {
        this.nome = nome;
        this.email = email;
        this.password = password; // Passa pelo setter
        
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

    
    // Setter para validar a password
    set password(novaPassword) {
        if (!this.#validarPassword(novaPassword)) {
            throw new Error('A palavra-passe não cumpre os requisitos de segurança.');
        }
        this.#password = novaPassword;
    }

    // Setters
    set nome(nome) {
        this.#nome = nome;;
    }

    set email(email) {
        this.#email = email;;
    }


    // Método privado para validar a password
    #validarPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }
}

module.exports = UserRegisterModel;
