import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import HotelLogo from "../../assets/images/logo-hotel.png";

// Componente separado pro Dropdown
function ProfileDropdown() {
  return (
    <div className={styles.dropdownContent}>
      <Link to="/profile">View Profile</Link>
      <Link to="/profile/edit">Edit Profile</Link>
      <Link to="/logout">Log Out</Link>
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const isPortalPage =
    location.pathname.startsWith("/portal") ||
    location.pathname.startsWith("/profile");

  const profileDropdownRef = useRef(null);

  const navLinks = isPortalPage
    ? [
        { to: "/portal", label: "Portal" },
        { to: "/services", label: "Services" },
        { to: "/reservations", label: "Reservations" },
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

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef]);

  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile ? styles.mobilenavLink : styles.navLink;

    return navLinks.map((link) => {
      if (link.label === "Profile" && isPortalPage) {
        return (
          <li
            key="profile-dropdown"
            className={styles.dropdownContainer}
            ref={profileDropdownRef}
          >
            <button
              onClick={toggleProfileMenu}
              className={`${linkClass} ${styles.profileBtn}`}
            >
              Profile {/* <--- MUDANÇA AQUI */}
              <span className={styles.arrow}>&#9660;</span>
            </button>
            {isProfileOpen && <ProfileDropdown />}
          </li>
        );
      }

      return (
        <li key={link.to}>
          <Link to={link.to} className={linkClass}>
            {link.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      {/* Navbar Desktop*/}
      <nav className={styles.navbarContainer}>
        <div className={styles.logo}>
          <img src={HotelLogo} alt="Logo do Hotel" className={styles.logo} />
        </div>
        <ul className={styles.navLinks}>{renderNavLinks(false)}</ul>
      </nav>

      {/*Navbar Mobile*/}
      <section className={styles.mobileNavbar}>
        <button className={styles.mobilebtn} onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
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
