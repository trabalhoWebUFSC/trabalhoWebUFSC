import React from "react";
import styles from "./HeroHotel.module.css";

import heroBg from "../../assets/images/hero-hotel-bg.jpg";

function HeroHotel() {
  return (
    <section
      className={styles.heroSection}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={styles.heroOverlay}>
        {" "}
        <div className={styles.heroContent}>
          <p className={styles.subtitle}>MELHOR LUGAR PARA CURTIR E RELAXAR</p>
          <h1 className={styles.title}>
            O Lugar Perfeito Para <br /> Aproveitar sua Vida
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroHotel;
