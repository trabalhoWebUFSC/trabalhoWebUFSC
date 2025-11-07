import React from 'react';
import styles from './About.module.css'; 
import imagemAbout from '../../assets/images/about-us.png'; 
import {ReactComponent as PlayIcon} from '../../assets/icons/play-icon.svg';

function AboutPage() {
  return (
    <section id="about-page" className={styles.discoverSection}>
      <div className={styles.imageContainer}>
        <img
          src={imagemAbout}
          alt="Luxurious reception area of ​​the Imperial Grand hotel." 
          className={styles.discoverImage} 
        />
        <button type="button" className={styles.playButton} aria-label="Play video">
          <PlayIcon className={styles.playIcon} />
        </button>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.subtitleWrapper}>
          <div className={styles.verticalLine}></div> 
          <p className={styles.subtitle}>DISCOVER OUR HOTEL</p>
        </div>
        <h1 className={styles.title}>Enjoy A Luxury Experience</h1>
        <p className={styles.description}>
          Allow yourself to enter a sanctuary of luxury and impeccable service,
          designed exclusively for your well-being and delight in every detail.
          Come create precious memories and enjoy a stay that will redefine your
          concept of exclusivity and comfort.
        </p>

        <a href="#/" className={styles.discoverLink}> {/* Trocar por <Link> do react-router-dom se for navegar */}
          <span>Discover More</span>
          {/* Se usar SVG importado: <ArrowRightIcon className={styles.arrowIcon} /> */}
          {/* Ou usar o caractere > diretamente: */}
           &gt; {/* Representa o ">" */}
        </a>

      </div> 

    </section> 
  );
}

export default AboutPage;