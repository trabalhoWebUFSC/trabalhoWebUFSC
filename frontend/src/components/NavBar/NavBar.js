import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import HotelLogo from "../../assets/images/logo-hotel.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../services/api";

function ProfileDropdown({ onClose, onLogout }) {
  return (
    <div 
      className={styles.dropdownContent}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Link to="/profile" onClick={onClose}>View Profile</Link>
      <Link to="/profile/edit" onClick={onClose}>Edit Profile</Link>
      <button 
        onClick={(e) => {
          e.stopPropagation(); // ao clicar, nao fecha prematuramente
          onLogout();
          onClose(); 
        }}
      >
        Log Out
      </button>
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isPortalPage =
    location.pathname.startsWith("/portal") ||
    location.pathname.startsWith("/profile");

  const profileDropdownRef = useRef(null);

  
  const navLinks = isPortalPage
    ? [
        { to: "/portal", label: "Portal" },
        { to: "/services", label: "Services" },
        { to: "/profile/my-reservations", label: "Reservations" },
        { to: "/profile", label: "Profile" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact Us" },
        { to: "/login", label: "Login" },
      ];

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = (e) => {
    // impede propagação para não fechar ao abrir
    if(e) e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout(); // limpa o token (em api.js)
    navigate("/login"); // redireciona para o login
  };

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
      document.documentElement.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
      document.documentElement.classList.remove("menu-open");
    }
  }, [isMenuOpen]);

  // Fechar dropdown ao mudar de rota
  useEffect(() => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Renderizar links (desktop + mobile)
  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile ? styles.mobilenavLink : styles.navLink;

    return navLinks.map((link) => {
      if (link.label === "Profile" && isPortalPage) {
        return (
          <li
            key="profile-dropdown"
            className={styles.dropdownContainer}
            ref={profileDropdownRef}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={toggleProfileMenu}
              className={`${linkClass} ${styles.profileBtn}`}
            >
              Profile <span className={styles.arrow}>&#9660;</span>
            </button>

            {isProfileOpen && (
              <ProfileDropdown 
                onClose={() => setIsProfileOpen(false)} 
                onLogout={handleLogout}
              />
            )}
          </li>
        );
      }

      return (
        <li key={link.to}>
          <Link
            to={link.to}
            className={linkClass}
            onClick={isMobile ? toggleMenu : undefined}
          >
            {link.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      
      <nav className={styles.navbarContainer}>
        <div className={styles.logo}>
          <img src={HotelLogo} alt="Logo do Hotel" className={styles.logo} />
        </div>
        <ul className={styles.navLinks}>{renderNavLinks(false)}</ul>
      </nav>

      
      <section className={styles.mobileNavbar}>
        <button className={styles.mobilebtn} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul
          className={`${styles.mobilenavLinks} ${
            isMenuOpen ? styles.open : ""
          }`}
        >
          {renderNavLinks(true)}
        </ul>
      </section>
    </>
  );
}

export default Navbar;

