import React, { useState } from "react";
import styles from "./NewsSection.module.css";
import { FaArrowRight } from "react-icons/fa";

import img1 from "../../assets/images/news.section1.1.jpg";
import img2 from "../../assets/images/news.section1.2.jpg";
import img3 from "../../assets/images/news.section2.1.jpg";
import img4 from "../../assets/images/news.section2.2.jpg";
import img5 from "../../assets/images/news.section.3.1.jpg";
import img6 from "../../assets/images/news.section3.2.jpg";
import img7 from "../../assets/images/news.section4.1.jpg";
import img8 from "../../assets/images/news.section4.2.jpg";
import img9 from "../../assets/images/news.section.bathroom.img2.jpg";
import img10 from "../../assets/images/news.section.bathroom.img3.jpg";

const NewsSection = () => {
  const blocks = [
    {
      images: [img1, img2],
      title: "Retore Lighting Design",
      date: "20 November 2025",
      category: "Interior",
    },
    {
      images: [img3, img4],
      title: "Classy  and Luxurious Rooms",
      date: "22 November 2025",
      category: "Design",
    },
    {
      images: [img5, img6],
      title: "A Nice And Clean Rooms",
      date: "22 November 2025",
      category: "Interior",
    },
    {
      images: [img7, img8],
      title: "Explore Interior Design",
      date: "20 November 2023",
      category: "Interior",
    },
    {
      images: [img9, img10],
      title: "Luxury Bathroom Interior",
      date: "22 November 2025",
      category: "Design",
    },
  ];

  const [currentIndexes, setCurrentIndexes] = useState(blocks.map(() => 0));

  const nextImage = (blockIndex) => {
    setCurrentIndexes((prev) =>
      prev.map((index, i) =>
        i === blockIndex ? (index + 1) % blocks[i].images.length : index
      )
    );
  };

  return (
    <section className={styles.newsSection}>
      <div className={styles.newsHeader}>
       <div className={styles.headerTitles}>
         <p className={styles.newsSubtitle}>LOCAL NEWS AND ACTIVITIES</p>
        <h2 className={styles.newsTitle}>Latest News Update</h2>
       </div>
        <button className={styles.discoverBtn}>
          Discover More &gt; 
        </button>
      </div>

      <div className={styles.newsGrid}>
        {blocks.map((block, blockIndex) => (
          <div
            className={`${styles.newsCard} ${styles[`block${blockIndex + 1}`]}`}
            key={blockIndex}
          >
            <img
              src={block.images[currentIndexes[blockIndex]]}
              alt={`news-${blockIndex}`}
              className={styles.newsImage}
            />

            <button
              className={styles.arrowBtn}
              onClick={() => nextImage(blockIndex)}
            >
              <FaArrowRight />
            </button>

            <div className={styles.newsInfo}>
              <p className={styles.newsCategory}>{block.category}</p>
              <span className={styles.separator}>|</span>
              <p className={styles.newsDate}>{block.date}</p>
            </div>

            <h3 className={styles.newsBlockTitle}>{block.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
