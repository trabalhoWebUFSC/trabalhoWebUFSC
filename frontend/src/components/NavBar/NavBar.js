import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import HotelLogo from "../../assets/images/logo-hotel.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../services/api";

//Dropdown exibido dentro do menu Profile,recebe callbacks para fechar o menu e deslogar
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

function LoginDropdown({ onClose }) {
  return (
    <div 
      className={styles.dropdownContent} 
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Link to="/login" onClick={onClose}>Sign In</Link>
      <Link to="/register" onClick={onClose}>Sign Up</Link>
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // controla o menu mobile
  const [isProfileOpen, setIsProfileOpen] = useState(false);   // controla abertura do dropdown "Profile"
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isPortalPage =
    location.pathname.startsWith("/portal") ||   // identifica se estamos no portal do usuário para renderizar links diferentes
    location.pathname.startsWith("/profile") ||
    location.pathname === "/services";
  
  const isServicesPage = location.pathname === "/services";
  const isContactPage = location.pathname === "/contact";

  const profileDropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);

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
    setIsLoginOpen(false);
  };

  const toggleLoginMenu = (e) => {
    if(e) e.stopPropagation();
    setIsLoginOpen(!isLoginOpen);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setIsLoginOpen(false);
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
    setIsLoginOpen(false);
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

      if (link.label === "Login" && !isPortalPage) {
        return (
          <li
            key="login-dropdown"
            className={styles.dropdownContainer}
            ref={loginDropdownRef}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={toggleLoginMenu}
              className={`${linkClass} ${styles.profileBtn}`}
            >
              Account <span className={styles.arrow}>&#9660;</span>
            </button>

            {isLoginOpen && (
              <LoginDropdown 
                onClose={() => setIsLoginOpen(false)} 
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
      
      <nav className={`${styles.navbarContainer} 
        ${isServicesPage ? styles.servicesNavbar : ""} 
        ${isContactPage ? styles.contactNavbar : ""}`}>
        <div className={styles.logo}>
          <img src={HotelLogo} alt="Logo do Hotel" className={styles.logo} />
        </div>
        <ul className={styles.navLinks}>{renderNavLinks(false)}</ul>
      </nav>

      
      <section className={`${styles.mobileNavbar} 
        ${isServicesPage ? styles.servicesNavbar : ""} 
        ${isContactPage ? styles.contactNavbar : ""}`}>
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

