class UserLogin {
    
    #email;
    #password;

    constructor(email, password) {
        
        this.email = email;
        this.password = password; // Passa pelo setter
        
    }

   
    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    
    // Setter para validar a password
    set password(Password) {
        this.#password = Password;
    }

    // Setters
    set email(email) {
        this.#email = email;;
    }


    
}

module.exports = UserLogin;
