import { MapPin, Star } from "lucide-react";
import { Wifi, Car, Utensils, Dumbbell, Waves, PawPrint, Snowflake } from "lucide-react";

const HotelCard = ({ hotel, index, visibleHotels, handleBookNow }) => {
  const amenityIcons = {
    WiFi: Wifi,
    AC: Snowflake,
    Pool: Waves,
    Gym: Dumbbell,
    Parking: Car,
    Restaurant: Utensils,
    "Pet-friendly": PawPrint,
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group cursor-pointer transform hover:-translate-y-2 ${
        visibleHotels.includes(index)
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={hotel.image || "/placeholder.svg"}
          alt={hotel.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded text-sm font-semibold transform transition-all duration-300 hover:scale-110 animate-pulse">
          {hotel.discount}% OFF
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
            {hotel.name}
          </h3>
          <div className="flex items-center group/rating">
            <Star className="h-4 w-4 text-yellow-400 fill-current transition-transform duration-300 group-hover/rating:scale-125" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {hotel.rating}
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center group/location">
          <MapPin className="h-4 w-4 mr-1 transition-transform duration-300 group-hover/location:scale-110" />
          {hotel.location}
        </p>
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm transition-all duration-300 hover:scale-105">
            {hotel.roomType}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{hotel.reviews} reviews</span>
        </div>
        <div className="flex items-center space-x-3 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, amenityIndex) => {
            const IconComponent = amenityIcons[amenity];
            return IconComponent ? (
              <div
                key={amenity}
                className="flex items-center text-gray-500 dark:text-gray-400 transition-all duration-300 hover:text-blue-600 hover:scale-125"
                title={amenity}
                style={{ animationDelay: `${amenityIndex * 100}ms` }}
              >
                <IconComponent className="h-4 w-4" />
              </div>
            ) : null;
          })}
          {hotel.amenities.length > 4 && (
            <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 hover:text-blue-600">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
              ₹{hotel.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ₹{hotel.originalPrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">/night</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              View Details
            </button>
            <button
              onClick={() => handleBookNow(hotel)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 text-white rounded-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;