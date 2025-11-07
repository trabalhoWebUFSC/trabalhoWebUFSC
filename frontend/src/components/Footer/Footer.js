import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../assets/images/logo-hotel.png";

// Importar ícones
import { FaFacebookF, FaInstagram, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Coluna 1 - Logo, Texto, etc*/}
        <div className={styles.footerCol}>
          <img src={logo} alt="Imperial Grand Hotel" className={styles.logo} />
          <p className={styles.description}>
            Com lindos apartamentos, o Imperial Grand Hotel tornou-se um ícone
            de charme e elegância ao Sul do Brasil, na Ilha de Santa Catarina,
            oferecendo um ambiente acolhedor com uma vista privilegiada.
          </p>
          <hr className={styles.divider} />
          <div className={styles.legalContainer}>
            <p className={styles.copyright}>
              © 2025 Imperial Grand Hotel. Todos os direitos reservados.
            </p>
            <div className={styles.legalLinks}>
              <Link to="/privacy">Política de Privacidade</Link>
              <Link to="/terms">Termos de Uso</Link>
            </div>
          </div>
        </div>

        {/* Coluna 2 -  Links e Redes sociais */}
        <div className={styles.footerCol}>
          <ul className={styles.linksList}>
            <li>
              <a href="/">INÍCIO</a>
            </li>
            <li>
              <Link to="/about">SOBRE NÓS</Link>
            </li>
            <li>
              <a href="/#services">SERVIÇOS</a>
            </li>
            <li>
              <a href="/#services">QUARTOS</a>
            </li>
          </ul>
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/majesticpalacehotel/?locale=pt_BR"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/majesticpalacehotel/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:contato@imperialgrandhotel.com"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
