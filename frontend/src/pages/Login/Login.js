import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // LÓGICA DE LOGIN
    if (!email || !password) {
      setError("Por favor, preencha E-mail e Senha.");
      return;
    }

    console.log("Tentativa de Login:", { email, password });

    // chamada FETCH para API
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.formTitle}>Acesso ao Portal</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}

        {/* CAMPO EMAIL */}
        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

        {/* CAMPO SENHA */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>

        {/* BOTÃO SUBMIT */}
        <button type="submit" className={styles.submitButton}>
          Entrar no Portal
        </button>

        {/* LINKS DE RECUPERAÇÃO E CADASTRO */}
        <p className={styles.forgotPassword}>
          <Link to="/forgot-password">Esqueceu a senha?</Link>
        </p>

        {/* Link para o Cadastro */}
        <p className={styles.registerLink}>
          Não tem cadastro? <Link to="/register">Registre-se aqui</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
