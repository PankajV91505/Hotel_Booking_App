import { Star, X } from 'lucide-react'

export default function Filters({
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
  clearAllFilters
}) {
  return (
    <div className={`lg:w-80 ${isMobileFilterOpen ? "fixed inset-0 z-50 bg-white dark:bg-gray-800 p-4 overflow-y-auto" : "hidden lg:block"}`}>
      {/* Mobile Filter Header */}
      {isMobileFilterOpen && (
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white hidden lg:block">Filters</h2>

        {/* Price Range */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Price Range</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">₹{priceRange[0]}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="500"
              max="15000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Star Rating</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRating.includes(rating)}
                  onChange={() => toggleRating(rating)}
                  className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <div className="flex items-center">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {rating} Star{rating !== 1 ? "s" : ""}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Room Type */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Room Type</h3>
          <div className="space-y-3">
            {["Single", "Double", "Deluxe", "Suite"].map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRoomTypes.includes(type)}
                  onChange={() => toggleRoomType(type)}
                  className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Amenities</h3>
          <div className="space-y-3">
            {["WiFi", "Pool", "AC", "Gym", "Parking", "Restaurant", "Pet-friendly"].map((amenity) => (
              <label key={amenity} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="mr-3 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mobile Filter Actions */}
        {isMobileFilterOpen && (
          <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 lg:hidden">
            <button
              onClick={clearAllFilters}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}