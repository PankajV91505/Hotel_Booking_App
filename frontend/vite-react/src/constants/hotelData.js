// src/constants/hotelData.js
export const hotels = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "Mumbai, Maharashtra",
    rating: 4.5,
    price: 3500,
    originalPrice: 4200,
    image: "/placeholder.svg?height=200&width=300",
    roomType: "Deluxe",
    amenities: ["WiFi", "AC", "Pool", "Gym"],
    discount: 17,
    reviews: 1250,
  },
  {
    id: 2,
    name: "Ocean View Resort",
    location: "Goa, India",
    rating: 4.8,
    price: 5200,
    originalPrice: 6000,
    image: "/placeholder.svg?height=200&width=300",
    roomType: "Suite",
    amenities: ["WiFi", "AC", "Pool", "Restaurant"],
    discount: 13,
    reviews: 890,
  },
  // ... rest of the hotel data
];

export const amenityIcons = {
  WiFi: "Wifi",
  AC: "Snowflake",
  Pool: "Waves",
  Gym: "Dumbbell",
  Parking: "Car",
  Restaurant: "Utensils",
  "Pet-friendly": "PawPrint",
};