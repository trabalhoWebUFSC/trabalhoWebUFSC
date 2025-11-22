import React from "react";
import styles from "./PromoBanner.module.css";
import promoBannerImage from "../../assets/images/promobanner.png";
import promoBannerImage2 from "../../assets/images/promobanner2.png";
import { useNavigate } from "react-router-dom";

function PromoBanner() {

  const navigate = useNavigate();

  const handlePromoClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");  // usuário sem login
    } else {
      navigate("/reservations"); // usuário logado e ja pode reservar
    }
  };

  return (
    <section className={styles.promoBanner}>
      <div className={styles.promoContent}>
        <div className={styles.promoImages}>
          <img src={promoBannerImage} alt="Promo" className={styles.promoImage} />
          <img src={promoBannerImage2} alt="Promo" className={styles.promoImage} />
        </div> 
        <div className={styles.promoText}>
          <h1 className={styles.promoH1}>Get A Luxurious Experience With 25% Off Now</h1>

          <button 
            className={styles.promoButton}
            onClick={handlePromoClick}
          >
            Book Now &gt; 
          </button>

        </div>
      </div>
    </section>
  );
}

export default PromoBanner;
