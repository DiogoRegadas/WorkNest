class UserRegisterModel {
    #firstName;
    #lastName;
    #localidade;
    #email;
    #password;
  
    constructor(firstName, lastName, localidade, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.localidade = localidade;
      this.email = email;
      this.password = password; // Validação feita no setter
    }
  
    // Getters
    get firstName() {
      return this.#firstName;
    }
  
    get lastName() {
      return this.#lastName;
    }
  
    get localidade() {
      return this.#localidade;
    }
  
    get email() {
      return this.#email;
    }
  
    get password() {
      return this.#password;
    }
  
    // Setters
    set firstName(value) {
      this.#firstName = value;
    }
  
    set lastName(value) {
      this.#lastName = value;
    }
  
    set localidade(value) {
      this.#localidade = value;
    }
  
    set email(value) {
      this.#email = value;
    }
  
    set password(value) {
      this.#password = value;
    }
  
    
  }
  
  module.exports = UserRegisterModel;
  