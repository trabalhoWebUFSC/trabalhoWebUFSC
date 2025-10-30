import React, { useState } from 'react';
import styles from './RoomChoice.module.css';
import room1 from '../../assets/images/room1.png';
import room2 from '../../assets/images/room2.png';
import room3 from '../../assets/images/room3.png';
import room4 from '../../assets/images/room4.png';
import room5 from '../../assets/images/room5.png';


   function RoomChoice () {
    const rooms = [ {
        id: 1,
        name: 'Deluxe Room',
        price : '$300/night',
        image: room1, 
        features: [
            { icon: "fa-users", text: "1-2 Persons" },
            { icon: "fa-bath", text: "Bathtub" },
            { icon: "fa-mug-hot", text: "Free Breakfast" },
            { icon: "fa-bed", text: "King Size Bed" },
            { icon: "fa-wifi", text: "Free Wifi" },
            { icon: "fa-snowflake", text: "Air Conditioner" }
        ]
    },
{
        id: 2,
        name: 'Superior Ocean View',
        price: '$450/night',
        image: room2,
        features: [
            { icon: "fa-users", text: "1-2 Persons" },
            { icon: "fa-binoculars", text: "Ocean View Balcony" }, 
            { icon: "fa-mug-hot", text: "Premium Breakfast" },     
            { icon: "fa-bed", text: "Two Queen Beds" },             
            { icon: "fa-wifi", text: "High Speed Wifi" },
            { icon: "fa-snowflake", text: "Air Conditioner" }
        ]
    },

    {
        id: 3,
        name: 'Executive Suite',
        price: '$650/night',
        image: room3,
        features: [
            { icon: "fa-users", text: "2-3 Persons" },
            { icon: "fa-hot-tub", text: "Jacuzzi" },
            { icon: "fa-mug-hot", text: "Room Service Breakfast" }, 
            { icon: "fa-desktop", text: "Dedicated Work Area" },    
            { icon: "fa-wifi", text: "Private Network" },          
            { icon: "fa-champagne-glasses", text: "Mini Bar Included" } 
        ]
    },
   
    {
        id: 4,
        name: 'Family Apartment',
        price: '$790/night',
        image: room4,
        features: [
            { icon: "fa-users", text: "2-3 Persons" },
            { icon: "fa-kitchen-set", text: "Full Kitchenette" },  
            { icon: "fa-mug-hot", text: "Room Service Breakfast" },
            { icon: "fa-bath", text: "Two Bathrooms" },
            { icon: "fa-gamepad", text: "Kids Entertainment" },   
            { icon: "fa-car", text: "Private Parking" }
        ]
    },

    {
        id: 5,
        name: 'Presidential Penthouse',
        price: '$1200/night',
        image: room5,
        features: [
            { icon: "fa-users", text: "3-4 Persons" },
            { icon: "fa-water-ladder", text: "Private Plunge Pool" }, 
            { icon: "fa-wine-bottle", text: "Premium Stocked Bar" },
            { icon: "fa-key", text: "Private Elevator Access" },    
            { icon: "fa-bell", text: "24h Personal Butler" },      
            { icon: "fa-mountain-sun", text: "360° Panoramic View" } 
        ]
    }
]        
  //slider card 
        
    const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

    const nextRoom = () => {
        setCurrentRoomIndex((prevIndex) => 
            (prevIndex === rooms.length - 1 ? 0 : prevIndex + 1)
        );
    };

    const prevRoom = () => {
        setCurrentRoomIndex((prevIndex) => 
            (prevIndex === 0 ? rooms.length - 1 : prevIndex - 1)
        );
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
                        {currentRoom.features.map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                                <i className={`fa-solid ${feature.icon}`}></i> 
                                <span className={styles.featureText}>{feature.text}</span>
                            </div>
                        ))}
                    </div>
                    
                    
                    <div className={styles.cardActions}>
                        <a href="/details" className={styles.detailsLink}>Details &gt;</a>
                        
                        
                        <button className={styles.bookBtn} onClick={() => alert(`Reservando ${currentRoom.name}!`)}>
                            Book Now  &gt;
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
                        className={`${styles.dot} ${index === currentRoomIndex ? styles.activeDot : ''}`}
                        onClick={() => setCurrentRoomIndex(index)}
                    />
                ))}
            </div>
        </section>
    );
}

export default RoomChoice;
