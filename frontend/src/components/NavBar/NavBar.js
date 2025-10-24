import React, { useState } from "react"; 
import styles from "./NavBar.module.css";
import HotelLogo from "../../assets/images/logo_hotel.svg";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <>
            <nav className={styles.navbarContainer}>
                <div className={styles.logo}>
                    <img
                        src={HotelLogo}
                        alt="Logo do Hotel"
                        className={styles.logoImg}
                    />
                </div>
                <ul className={styles.navLinks}>
                    <li><a href="/" className={styles.navLink}>Home</a></li>
                    <li><a href="/services" className={styles.navLink}>Services</a></li>
                    <li><a href="/contact" className={styles.navLink}>Contact Us</a></li>
                    <li><a href="/login" className={styles.navLink}>Login</a></li>
                </ul>
            </nav>

            <section className={styles.mobileNavbar}>
                <button className={styles.mobilebtn} onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                
                <ul className={`${styles.mobilenavLinks} ${isMenuOpen ? styles.open : ''}`}>
                    <li><a href="/" className={styles.mobilenavLink}>Home</a></li>
                    <li><a href="/services" className={styles.mobilenavLink}>Services</a></li>
                    <li><a href="/contact" className={styles.mobilenavLink}>Contact Us</a></li>
                    <li><a href="/login" className={styles.mobilenavLink}>Login</a></li>
                </ul>
            </section>
        </>
    );
}

export default Navbar;
