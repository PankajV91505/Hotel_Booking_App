import {
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  PawPrint,
  Snowflake,
} from "lucide-react";

const HotelCard = ({ hotel, index, visibleHotels, handleBookNow, handleViewDetails }) => {
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
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden transition-all duration-500 transform hover:-translate-y-2 group ${
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
          className="w-full h-40 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {hotel.discount && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded text-sm font-semibold animate-pulse">
            {hotel.discount}% OFF
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
            {hotel.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-700 dark:text-gray-300">{hotel.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {hotel.location}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs sm:text-sm">
            {hotel.roomType}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {hotel.reviews} reviews
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return Icon ? (
              <div
                key={amenity}
                title={amenity}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"
              >
                <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
              </div>
            ) : null;
          })}
          {hotel.amenities.length > 4 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              ₹{hotel.price.toLocaleString()}
            </span>
            {hotel.originalPrice && (
              <span className="text-sm line-through text-gray-500 dark:text-gray-400">
                ₹{hotel.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">/night</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleViewDetails(hotel)}
              className="px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              View Details
            </button>
            <button
              onClick={() => handleBookNow(hotel)}
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow hover:shadow-lg"
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
