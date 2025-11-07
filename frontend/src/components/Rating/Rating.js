import React, { useState } from 'react';
import styles from './Rating.module.css';
import Stars from './Stars';
import { clientReviews } from './ReviewsData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';





function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalReviews = clientReviews.length;
    const currentReview = clientReviews[currentIndex];

    const nextReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalReviews);
    };


    const prevReview = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalReviews) % totalReviews);
    };
    
    if (totalReviews === 0) {
        return null;
    }

    return (
        <section className={styles.reviewsSection}>
            <div className={styles.verticalLine}></div> 

            <h3 className={styles.subTitle}>OUR CUSTOMER REVIEW</h3>
            <h1 className={styles.mainTitle}>What Our Client Says</h1>
            

            <div className={styles.sliderContainer}>
                <button className={styles.arrowLeft} onClick={prevReview}>
                    <FaChevronLeft />

                </button>

                <div className={styles.reviewCard}>
                    
                    <div className={styles.starsWrapper}>
                        <Stars rating={currentReview.rating} color="#FFC952" />
                    </div>

                    <p className={styles.reviewText}>{currentReview.text}</p>
                    
       
                    <div className={styles.clientInfo}>
                        <img 
                            src={currentReview.photoUrl} 
                            alt={currentReview.name} 
                            className={styles.clientPhoto} 
                        />
                        <div className={styles.clientText}>
                            <h4 className={styles.clientName}>{currentReview.name}</h4>
                            <p className={styles.clientTitle}>{currentReview.title}</p>
                        </div>
                    </div>
                </div>

                <button className={styles.arrowRight} onClick={nextReview}>
                    <FaChevronRight />

                </button>

            </div>
            
           <div className={styles.dotsContainer}>
              {clientReviews.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={() => setCurrentIndex(index)}
           ></span>
        ))}
</div>

        </section>
    );
}

export default Reviews;
