import { MapPin, Star, Wifi, Car, Utensils, Dumbbell, Waves, PawPrint, Snowflake } from 'lucide-react'

const amenityIcons = {
  WiFi: Wifi,
  AC: Snowflake,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  Restaurant: Utensils,
  "Pet-friendly": PawPrint,
}

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={hotel.image || "/placeholder.svg"}
          alt={hotel.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
          {hotel.discount}% OFF
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{hotel.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {hotel.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {hotel.location}
        </p>

        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
            {hotel.roomType}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{hotel.reviews} reviews</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-3 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity) => {
            const IconComponent = amenityIcons[amenity]
            return IconComponent ? (
              <div
                key={amenity}
                className="flex items-center text-gray-500 dark:text-gray-400"
                title={amenity}
              >
                <IconComponent className="h-4 w-4" />
              </div>
            ) : null
          })}
          {hotel.amenities.length > 4 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{hotel.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ₹{hotel.originalPrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">/night</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              View Details
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}