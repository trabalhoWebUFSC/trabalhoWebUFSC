import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import HotelLogo from "../../assets/images/logo-hotel.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbarContainer}>
        <div className={styles.logo}>
          <img src={HotelLogo} alt="Logo do Hotel" className={styles.logo} />
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>

          <li>
            <a href="/#services" className={styles.navLink}>
              Services
            </a>
          </li>
          <li>
            <a href="/#contact" className={styles.navLink}>
              Contact Us
            </a>
          </li>

          <li>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </li>
        </ul>
      </nav>

      <section className={styles.mobileNavbar}>
        <button className={styles.mobilebtn} onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <ul
          className={`${styles.mobilenavLinks} ${
            isMenuOpen ? styles.open : ""
          }`}
        >
          <li>
            <Link to="/" className={styles.mobilenavLink}>
              Home
            </Link>
          </li>

          <li>
            <a href="/#services" className={styles.mobilenavLink}>
              Services
            </a>
          </li>
          <li>
            <a href="/#contact" className={styles.mobilenavLink}>
              Contact Us
            </a>
          </li>

          <li>
            <Link to="/login" className={styles.mobilenavLink}>
              Login
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Navbar;
