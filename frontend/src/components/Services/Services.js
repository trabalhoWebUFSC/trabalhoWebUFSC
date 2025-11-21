import React from "react";
import styles from "./Services.module.css";

import service1 from "../../assets/images/services.1.jpg";
import service2 from "../../assets/images/services.2.jpg";
import service3 from "../../assets/images/services.3.jpg";
import service4 from "../../assets/images/services.4.jpg";

export const services = [
  {
    id: 1,
    title: "Activities & Leisure",
    description:
      "Experience curated activities that blend adventure, elegance, and unforgettable memories.",
    image: service4
  },
  {
    id: 2,
    title: "Gourmet Dining & Lounge Bar",
    description:
      "Indulge in refined cuisine, crafted cocktails, and a sophisticated ambiance that blends flavor, artistry, and unforgettable moments.",
    image: service3
  },
  {
    id: 3,
    title: "Luxurious Chauffeur Service",
    description:
      "Travel with maximum comfort and privacy through our exclusive chauffeur-driven service, available for airport pick-ups and city journeys.",
    image: service2
  },
  {
    id: 4,
    title: "Wellness & Relax",
    description:
      "Reconnect with yourself through therapeutic massages, serene spa environments, and wellness experiences designed to restore mind and body.",
    image: service1
  }
];

export default function Services() {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.header}>
        <h2 className={styles.SectionTitle}>Services</h2>
        <p className={styles.sectionSubtitle}>
          Discover exclusive experiences tailored for your comfort and enjoyment
        </p>
      </div>

      <div className={styles.gridContainer}>
        {services.map((service) => (
          <div key={service.id} className={styles.card}>
            <img
              src={service.image}
              alt={service.title}
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
