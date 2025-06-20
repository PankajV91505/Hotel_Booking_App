import { Filter, X, Star, Wifi, Car, Utensils, Dumbbell, Waves, PawPrint, Snowflake } from "lucide-react";

const Filters = ({
  priceRange,
  setPriceRange,
  selectedRating,
  toggleRating,
  selectedRoomTypes,
  toggleRoomType,
  selectedAmenities,
  toggleAmenity,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
}) => {
  return (
    <div className={`lg:w-80 transition-all duration-500 ${
      isMobileFilterOpen ? "fixed inset-0 z-50 bg-white dark:bg-gray-800 p-4 overflow-y-auto" : "hidden lg:block"
    }`}>
      {isMobileFilterOpen && (
        <div className="flex items-center justify-between mb-6 lg:hidden animate-slideInLeft">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white hidden lg:block">Filters</h2>
        <div className="group">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-blue-600">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:text-blue-600">
                ₹{priceRange[0]}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:text-blue-600">
                ₹{priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Star Rating</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-all duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedRating.includes(rating)}
                  onChange={() => toggleRating(rating)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 hover:scale-110"
                />
                <div className="flex items-center">
                  {[...Array(rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current transition-transform duration-300 group-hover:scale-110"
                    />
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-gray-300 transition-transform duration-300 group-hover:scale-110"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-blue-600">
                    {rating} Star{rating !== 1 ? "s" : ""}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Room Type</h3>
          <div className="space-y-3">
            {["Single", "Double", "Deluxe", "Suite"].map((type) => (
              <label
                key={type}
                className="flex items-center cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-all duration-300"
              >
                <input
                  type="checkbox"
                  checked={selectedRoomTypes.includes(type)}
                  onChange={() => toggleRoomType(type)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 hover:scale-110"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-blue-600">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Amenities</h3>
          <div className="space-y-3">
            {["WiFi", "Pool", "AC", "Gym", "Parking", "Restaurant", "Pet-friendly"].map((amenity) => {
              const IconComponent = {
                WiFi: Wifi,
                Pool: Waves,
                AC: Snowflake,
                Gym: Dumbbell,
                Parking: Car,
                Restaurant: Utensils,
                "Pet-friendly": PawPrint,
              }[amenity];

              return (
                <label
                  key={amenity}
                  className="flex items-center cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 hover:scale-110"
                  />
                  <span className="flex items-center text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300 group-hover:text-blue-600">
                    <IconComponent className="h-4 w-4 mr-2" />
                    {amenity}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        {isMobileFilterOpen && (
          <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 lg:hidden">
            <button
              onClick={() => {
                setSelectedRating([]);
                setSelectedRoomTypes([]);
                setSelectedAmenities([]);
                setPriceRange([1000, 10000]);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;