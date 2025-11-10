import React, { useState } from "react"; 
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import HotelLogo from "../../assets/images/logo-hotel.png";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isPortalPage = location.pathname === '/portal';
    
    // Configuracao dos links baseado na pagina
    const navLinks = isPortalPage 
        ? [
            { to: "/portal", label: "Portal" },
            { to: "/services", label: "Services" },
            { to: "/reservations", label: "Reservations" },
            { to: "/profile", label: "Profile" }
          ]
        : [
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact Us" },
            { to: "/login", label: "Login" }
          ];
    
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
                        className={styles.logo}
                    />
                </div>
                <ul className={styles.navLinks}>
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className={styles.navLink}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <section className={styles.mobileNavbar}>
                <button className={styles.mobilebtn} onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                
                <ul className={`${styles.mobilenavLinks} ${isMenuOpen ? styles.open : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className={styles.mobilenavLink}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Navbar;