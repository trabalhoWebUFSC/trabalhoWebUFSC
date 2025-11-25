import React, { useState, useEffect } from "react";
import styles from "./RoomChoice.module.css";
import api from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import room1 from "../../assets/images/room1.jpg";
import room2 from "../../assets/images/room2.jpg";
import room3 from "../../assets/images/room3.jpg";
import room4 from "../../assets/images/room4.jpg";
import room5 from "../../assets/images/room5.jpg";
import Reservations from "../../pages/Reservations/Reservations";

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

  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [backendRooms, setBackendRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/rooms');
        if (Array.isArray(response.data)) {
          setBackendRooms(response.data);
        }
      } catch (error) {
        console.error("Error loading rooms:", error);
        toast.error("Error connecting to rooms server.");
      }
    };
    fetchRooms();
  }, []);

  // Mapeia imagem local pelo nome do arquivo enviado
  const imageMap = {
    "room1.png": room1,
    "room2.png": room2,
    "room3.png": room3,
    "room4.png": room4,
    "room5.png": room5
  };

  const currentRoom = backendRooms[currentRoomIndex] || null;

  const nextRoom = () => {
    setCurrentRoomIndex((prev) => 
      backendRooms.length > 0 ? (prev === backendRooms.length - 1 ? 0 : prev + 1) : 0
    );
  };
  const prevRoom = () => {
    setCurrentRoomIndex((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  const currentRoom = rooms[currentRoomIndex];
  
  const matchedBackendRoom = backendRooms.find(r => r.name === currentRoom.name);
  const roomId = matchedBackendRoom ? matchedBackendRoom._id : null;
    setCurrentRoomIndex((prev) => 
      backendRooms.length > 0 ? (prev === 0 ? backendRooms.length - 1 : prev - 1) : 0
    );
  };

  const realRoomId = currentRoom ? currentRoom._id : null;

  const handleBookClick = () => {
    if (roomId) {
      setShowReservationModal(true);
    } else {
      toast.warn("Server temporarily unavailable: Rooms not found.");
      console.warn(`Room "${currentRoom.name}" not found:`, backendRooms);
    }
  };

  return (
    <section className={styles.roomSection}>
      <ToastContainer position="top-right" icon={false} toastStyle={{backgroundColor: "#d5a874ff"}}
        autoClose={3000} theme="colored" hideProgressBar={true} newestOnTop={false} closeOnClick
        rtl={false} pauseOnFocusLoss draggable pauseOnHover 
      />

      <div className={styles.header}>
        <p className={styles.Title}>OUR ROOM CHOICES</p>
        <h2 className={styles.subTitle}>Luxury Rooms & Suites</h2>
      </div>

      <div className={styles.sliderContainer}>
        <button className={styles.arrowBtn} onClick={prevRoom}>&lt;</button>

        {currentRoom && (
          <div className={styles.roomCard}>
            <p className={styles.suiteName}>{currentRoom.name}</p>
            <p className={styles.price}>${currentRoom.pricePerNight}/night</p>

            <hr className={styles.Line} />
            <div className={styles.featuresContainer}>
              {currentRoom.amenities.map((text, index) => (
                <div key={index} className={styles.featureItem}>
                  <span className={styles.iconWrapper}>{iconMap["mug"]}</span>
                  <span className={styles.featureText}>{text}</span>
                </div>
              ))}
            </div>

          <div className={styles.cardActions}>

            <button
              className={styles.bookBtn}
              onClick={handleBookClick}
              style={{ 
                opacity: roomId ? 1 : 0.6, 
                cursor: roomId ? 'pointer' : 'not-allowed' 
              }}
            >
              {localStorage.getItem('authToken') ? "Book Now >" : ""}
            </button>
          </div>
          
          {showReservationModal && (
            <Reservations 
              onClose={() => setShowReservationModal(false)} 
              roomId={roomId}
              pricePerNight={matchedBackendRoom ? matchedBackendRoom.pricePerNight : 0}
            />
          )}
        </div>
            <div className={styles.cardActions}>
              <button
                className={styles.bookBtn}
                onClick={handleBookClick}
                style={{ opacity: realRoomId ? 1 : 0.6, cursor: realRoomId ? "pointer" : "not-allowed" }}
              >
                Book Now &gt;
              </button>
            </div>

            {showReservationModal && (
              <Reservations
                onClose={() => setShowReservationModal(false)}
                roomId={realRoomId}
                pricePerNight={currentRoom.pricePerNight}
              />
            )}
          </div>
        )}

        <div className={styles.roomImage}>
          {currentRoom && (
            <img
              src={imageMap[currentRoom.photos[0]]}
              alt={`Imagem da ${currentRoom.name}`}
              className={styles.roomImg}
            />
          )}
        </div>

        <button className={styles.arrowBtn} onClick={nextRoom}>&gt;</button>
      </div>

      <div className={styles.dotsContainer}>
        {backendRooms.map((room, index) => (
          <button
            key={room._id}
            className={`${styles.dot} ${index === currentRoomIndex ? styles.activeDot : ""}`}
            onClick={() => setCurrentRoomIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default RoomChoice;
