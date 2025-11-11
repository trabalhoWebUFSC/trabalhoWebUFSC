import React from "react";
import styles from "./HeroHotel.module.css";

import heroBg from "../../assets/images/hero-hotel-bg2.svg";

function HeroHotel() {
  return (
    <section
      className={styles.heroSection}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={styles.heroOverlay}>
        {" "}
        <div className={styles.heroContent}>
          <p className={styles.subtitle}>BEST PLACE TO RELAX AND ENJOY</p>
          <h1 className={styles.title}>
            The Perfect Place To <br /> Enjoy Your Life
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroHotel;
