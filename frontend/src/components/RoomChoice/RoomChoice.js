import React, { useState } from "react";
import styles from "./RoomChoice.module.css";
import room1 from "../../assets/images/room1.png";
import room2 from "../../assets/images/room2.png";
import room3 from "../../assets/images/room3.png";
import room4 from "../../assets/images/room4.png";
import room5 from "../../assets/images/room5.png";


import { 
  FaUsers, FaBath, FaCoffee, FaBed, FaWifi, FaSnowflake, 
  FaBinoculars, FaDesktop, FaGamepad, FaCar, FaBell, FaKey,
  FaMountain, FaSwimmingPool, FaGlassCheers, FaRegQuestionCircle
} from "react-icons/fa";

function RoomChoice() {
  const iconMap = {
    users: <FaUsers />,
    bath: <FaBath />,
    mug: <FaCoffee />,
    bed: <FaBed />,
    wifi: <FaWifi />,
    ac: <FaSnowflake />,
    binoculars: <FaBinoculars />,
    desktop: <FaDesktop />,
    gamepad: <FaGamepad />,
    car: <FaCar />,
    bell: <FaBell />,
    key: <FaKey />,
    mountain: <FaMountain />,
    pool: <FaSwimmingPool />,
    champagne: <FaGlassCheers />,
    unknown: <FaRegQuestionCircle />
  };

  const rooms = [
    {
      id: 1,
      name: "Deluxe Room",
      price: "$300/night",
      image: room1,
      features: [
        { iconKey: "users", text: "1-2 Persons" },
        { iconKey: "bath", text: "Bathtub" },
        { iconKey: "mug", text: "Free Breakfast" },
        { iconKey: "bed", text: "King Size Bed" },
        { iconKey: "wifi", text: "Free Wifi" },
        { iconKey: "ac", text: "Air Conditioner" }
      ]
    },
    {
      id: 2,
      name: "Superior Ocean View",
      price: "$450/night",
      image: room2,
      features: [
        { iconKey: "users", text: "1-2 Persons" },
        { iconKey: "binoculars", text: "Ocean View Balcony" },
        { iconKey: "mug", text: "Premium Breakfast" },
        { iconKey: "bed", text: "Two Queen Beds" },
        { iconKey: "wifi", text: "High Speed Wifi" },
        { iconKey: "ac", text: "Air Conditioner" }
      ]
    },
    {
      id: 3,
      name: "Executive Suite",
      price: "$650/night",
      image: room3,
      features: [
        { iconKey: "users", text: "2-3 Persons" },
        { iconKey: "pool", text: "Jacuzzi" },
        { iconKey: "mug", text: "Room Service Breakfast" },
        { iconKey: "desktop", text: "Dedicated Work Area" },
        { iconKey: "wifi", text: "Private Network" },
        { iconKey: "champagne", text: "Mini Bar Included" }
      ]
    },
    {
      id: 4,
      name: "Family Apartment",
      price: "$790/night",
      image: room4,
      features: [
        { iconKey: "users", text: "2-3 Persons" },
        { iconKey: "desktop", text: "Full Kitchenette" }, 
        { iconKey: "mug", text: "Room Service Breakfast" },
        { iconKey: "bath", text: "Two Bathrooms" },
        { iconKey: "gamepad", text: "Kids Entertainment" },
        { iconKey: "car", text: "Private Parking" }
      ]
    },
    {
      id: 5,
      name: "Presidential Penthouse",
      price: "$1200/night",
      image: room5,
      features: [
        { iconKey: "users", text: "3-4 Persons" },
        { iconKey: "pool", text: "Private Plunge Pool" },
        { iconKey: "champagne", text: "Premium Stocked Bar" },
        { iconKey: "key", text: "Private Elevator Access" },
        { iconKey: "bell", text: "24h Personal Butler" },
        { iconKey: "mountain", text: "360° Panoramic View" }
      ]
    }
  ];

  // slider card
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  const nextRoom = () => {
    setCurrentRoomIndex((prev) => (prev === rooms.length - 1 ? 0 : prev + 1));
  };
  const prevRoom = () => {
    setCurrentRoomIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  const currentRoom = rooms[currentRoomIndex];

  return (
    <section className={styles.roomSection}>
      <div className={styles.header}>
        <p className={styles.Title}>OUR ROOM CHOICES</p>
        <h2 className={styles.subTitle}>Luxury Rooms & Suites</h2>
      </div>

      <div className={styles.sliderContainer}>
        <button className={styles.arrowBtn} onClick={prevRoom}>
          &lt;
        </button>

        <div className={styles.roomCard}>
          <p className={styles.suiteName}>{currentRoom.name}</p>
          <p className={styles.price}>{currentRoom.price}</p>

          <hr className={styles.Line} />
          <div className={styles.featuresContainer}>
            {currentRoom.features.map((feature, index) => {
              const IconComponent = iconMap[feature.iconKey] || iconMap["unknown"];
              return (
                <div key={index} className={styles.featureItem}>
                  <span className={styles.iconWrapper}>{IconComponent}</span>
                  <span className={styles.featureText}>{feature.text}</span>
                </div>
              );
            })}
          </div>

          <div className={styles.cardActions}>
            <a href="/about" className={styles.detailsLink}>
              Details &gt;
            </a>

            <button
              className={styles.bookBtn}
              onClick={() => alert(`Reservando ${currentRoom.name}!`)}
            >
              Book Now &gt;
            </button>
          </div>
        </div>

        <div className={styles.roomImage}>
          <img
            src={currentRoom.image}
            alt={`Imagem da ${currentRoom.name}`}
            className={styles.roomImg}
          />
        </div>

        <button className={styles.arrowBtn} onClick={nextRoom}>
          &gt;
        </button>
      </div>

      <div className={styles.dotsContainer}>
        {rooms.map((room, index) => (
          <button
            key={room.id}
            className={`${styles.dot} ${index === currentRoomIndex ? styles.activeDot : ""}`}
            onClick={() => setCurrentRoomIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default RoomChoice;

