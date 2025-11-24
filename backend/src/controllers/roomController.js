const Room = require('../models/Room');

const getAllRooms = async (request, response, next) => {
  try {
    const rooms = await Room.find().select('name pricePerNight capacity photos amenities');
    
    response.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

const getRoomById = async (request, response, next) => {
  try {
    const room = await Room.findById(request.params.id);
    if (!room) {
      return response.status(404).json({ message: 'Quarto não encontrado' });
    }

    response.status(200).json(room);
  } catch (err) {
    next(err);
  }
};


// const insertRoom = async (request, response) => {
//   try {
//     await Room.deleteMany({});

//     const rooms = [
//       {
//         name: "Deluxe Room",
//         description: "Luxo básico",
//         pricePerNight: 300,
//         capacity: 2,
//         photos: ["/public/rooms/room1.jpg"],
//         amenities: ["1-2 Persons", "Bathtub", "Free Breakfast", "King Size Bed", "Free Wifi", "Air Conditioner"]
//       },
//       {
//         name: "Superior Ocean View",
//         description: "Vista para o mar",
//         pricePerNight: 450,
//         capacity: 2,
//         photos: ["/public/rooms/room2.jpg"],
//         amenities: ["1-2 Persons", "Ocean View Balcony", "Premium Breakfast", "Two Queen Beds", "High Speed Wifi", "Air Conditioner"]
//       },
//       {
//         name: "Executive Suite",
//         description: "Executivo completo",
//         pricePerNight: 650,
//         capacity: 3,
//         photos: ["/public/rooms/room3.jpg"],
//         amenities: ["2-3 Persons", "Jacuzzi", "Room Service Breakfast", "Dedicated Work Area", "Private Network", "Mini Bar Included"]
//       },
//       {
//         name: "Family Apartment",
//         description: "Apartamento familiar",
//         pricePerNight: 790,
//         capacity: 3,
//         photos: ["/public/rooms/room4.jpg"],
//         amenities: ["2-3 Persons", "Full Kitchenette", "Room Service Breakfast", "Two Bathrooms", "Kids Entertainment", "Private Parking"]
//       },
//       {
//         name: "Presidential Penthouse",
//         description: "Penthouse presidencial",
//         pricePerNight: 1200,
//         capacity: 4,
//         photos: ["/public/rooms/room5.jpg"],
//         amenities: ["3-4 Persons", "Private Plunge Pool", "Premium Stocked Bar", "Private Elevator Access", "24h Personal Butler", "360° Panoramic View"]
//       }
//     ];

//     await Room.insertMany(rooms);
//     response.json({ ok: true, inserted: rooms.length });
//   } catch (err) {
//     response.status(500).json(err);
//   }
// };

module.exports = { getAllRooms, getRoomById };