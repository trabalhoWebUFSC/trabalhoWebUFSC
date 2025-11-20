import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../../services/api";
import sharedStyles from '../../styles/auth/AuthShared.module.css';
import styles from './Login.module.css';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // validação básica
    if (!email || !password) {
      setError("Please fill in email and password.");
      setLoading(false);
      return;
    }

    try {
      // chamada à api para realizar login
      const response = await api.post('/auth/login', {
        email,
        password
      });

      // salva o token e faz login
      setAuthToken(response.data.token);
      navigate("/portal"); 

    } catch (err) {
      // exibe mensagem de erro
      const errorMessage = err.response?.data?.message || "Failed to login. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className={sharedStyles.authContainer}>
      <form onSubmit={handleSubmit} className={sharedStyles.authForm}>
        <h2 className={sharedStyles.formTitle}>Sign In</h2>

        {/* CAMPO EMAIL */}
        <div className={sharedStyles.formGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
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
            disabled={loading}
            className={sharedStyles.inputField}
          />
        </div>

        {/* BOTÃO SUBMIT */}
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"} 
        </button>

        {error && <p className={sharedStyles.errorMessage}>{error}</p>}

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
