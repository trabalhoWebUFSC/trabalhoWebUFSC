import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import styles from './Login.module.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    navigate("/portal");
  };

  return (
   <div className={sharedStyles.authContainer}>
      <form onSubmit={handleSubmit} className={sharedStyles.authForm}>
        <h2 className={sharedStyles.formTitle}>Sign In</h2>

        {error && <p className={sharedStyles.errorMessage}>{error}</p>}

        {/* CAMPO EMAIL */}
        <div className={sharedStyles.formGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={sharedStyles.inputField}
          />
        </div>

        {/* CAMPO SENHA */}
        <div className={sharedStyles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={sharedStyles.inputField}
          />
        </div>

        {/* BOTÃO SUBMIT */}
        <button type="submit" className={styles.submitButton}>
          Submit 
        </button>

        {/* LINKS DE RECUPERAÇÃO E CADASTRO */}
        <p className={styles.forgotPassword}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>

        {/* Link para o Cadastro */}
        <p className={styles.registerLink}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
