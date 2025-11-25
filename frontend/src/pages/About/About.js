import React, { useState, useEffect } from "react";
import styles from "./About.module.css";
import imagemAbout from "../../assets/images/about-us.png";
import { ReactComponent as PlayIcon } from "../../assets/icons/play-icon.svg";

function AboutPage() {
  const [showVideo, setShowVideo] = useState(false);

  // Add uma classe ao body quando a página monta para controlar a Navbar via CSS
  useEffect(() => {
    document.body.classList.add("about-page-active");
    return () => {
      document.body.classList.remove("about-page-active");
    };
  }, []);

  return (
    <>
      <section id="about-page" className={styles.discoverSection}>
        <div className={styles.imageContainer}>
          <img
            src={imagemAbout}
            alt="Luxurious reception area of ​​the Imperial Grand hotel."
            className={styles.discoverImage}
          />
          <button
            type="button"
            className={styles.playButton}
            aria-label="Play video"
            onClick={() => setShowVideo(true)}
          >
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
            Allow yourself to enter a sanctuary of luxury and impeccable
            service, designed exclusively for your well-being and delight in
            every detail. Come create precious memories and enjoy a stay that
            will redefine your concept of exclusivity and comfort.
          </p>

          <a href="#/" className={styles.discoverLink}>
            {" "}
            {/* Trocar por <Link> se for navegar */}
            <span>Discover More</span>
            &gt;
          </a>
        </div>
      </section>

      {/* Modal do Vídeo */}
      {showVideo && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowVideo(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setShowVideo(false)}
            >
              &times;
            </button>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/KqcMUsljgvg?autoplay=1"
              title="Fashion Film 01 HOTEL"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default AboutPage;
