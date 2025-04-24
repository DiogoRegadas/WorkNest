import { useState } from "react";
import styles from "./AuthPage.module.css";

export default function SignIn({ email, setEmail, password, setPassword, onSubmit, mensagem }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.authContainer}>
      {/* Lado esquerdo - Título */}
      <div className={styles.leftSection}>
        <h1 className={styles.titleMain}>SIGN IN</h1>
        <h2 className={styles.titleSub}>WORKNEST</h2>
      </div>

      {/* Lado direito - Formulário */}
      <div className={styles.formSection}>
        <form onSubmit={onSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />

<div className={styles.inputGroup}>
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className={styles.input}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className={styles.toggleButton}
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>


          <span className={styles.forgotPassword}>Forgot your password?</span>

          <button type="submit" className={styles.button}>Entrar</button>

          {mensagem && <p style={{ color: "#ff8888", marginTop: "10px" }}>{mensagem}</p>}
        </form>
      </div>
    </div>
  );
}
