import { useState, useEffect } from "react";
import styles from "./AuthPage.module.css";

export default function SignUp({ formData, onChange, onSubmit, mensagem }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  useEffect(() => {
    setPasswordValidation({
      length: formData.password.length >= 8,
      lowercase: /[a-z]/.test(formData.password),
      uppercase: /[A-Z]/.test(formData.password),
      number: /\d/.test(formData.password),
      special: /[!@#$%^&*]/.test(formData.password),
    });
  }, [formData.password]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.leftSection}>
        <h1 className={styles.titleMain}>SIGN UP</h1>
        <h2 className={styles.titleSub}>WORKNEST</h2>
      </div>

      <div className={styles.formSection}>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.nameRow}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={onChange}
              className={styles.input}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={onChange}
              className={styles.input}
            />
          </div>

          <input
            type="text"
            name="localidade"
            placeholder="Localidade"
            value={formData.localidade}
            onChange={onChange}
            className={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            className={styles.input}
          />

          {/* Campo password com toggle e validação por baixo */}
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.toggleButton}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className={styles.passwordRules}>
            <p
              className={
                passwordValidation.length ? styles.valid : styles.invalid
              }
            >
              • Mínimo 8 caracteres
            </p>
            <p
              className={
                passwordValidation.lowercase ? styles.valid : styles.invalid
              }
            >
              • Letra minúscula
            </p>
            <p
              className={
                passwordValidation.uppercase ? styles.valid : styles.invalid
              }
            >
              • Letra maiúscula
            </p>
            <p
              className={
                passwordValidation.number ? styles.valid : styles.invalid
              }
            >
              • Um número
            </p>
            <p
              className={
                passwordValidation.special ? styles.valid : styles.invalid
              }
            >
              • Um símbolo (!@#$%^&*)
            </p>
          </div>

          {/* Campo de confirmação de password */}
          <div className={styles.inputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar Password"
              value={formData.confirmPassword}
              onChange={onChange}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.toggleButton}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className={styles.button}>
            Criar Conta
          </button>

          {mensagem && <p>{mensagem}</p>}
        </form>
      </div>
    </div>
  );
}
