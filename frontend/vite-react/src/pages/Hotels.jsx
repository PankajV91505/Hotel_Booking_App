import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Filter, AlertCircle, X } from "lucide-react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import HotelCard from "../components/HotelCard";
import { hotels } from "../constants/hotelData";

function Hotels({ user, setIsAuthModalOpen, setAuthTab }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([500, 15000]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleHotels, setVisibleHotels] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchError, setSearchError] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSearchLocation(location.state.searchLocation || "");
      setCheckInDate(location.state.checkInDate || "");
      setCheckOutDate(location.state.checkOutDate || "");
      setGuests(location.state.guests || "1");
      handleSearch();
    }
  }, [location.state]);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      filteredHotels.forEach((_, index) => {
        setTimeout(() => {
          setVisibleHotels((prev) => [...prev, index]);
        }, index * 150);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [filteredHotels]);

  const handleSearch = () => {
    setSearchError("");
    if (!searchLocation || !checkInDate || !checkOutDate) {
      setSearchError("Please fill all search fields");
      return;
    }
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkIn >= checkOut) {
      setSearchError("Check-out date must be after check-in date");
      return;
    }
    if (checkIn < new Date().setHours(0, 0, 0, 0)) {
      setSearchError("Check-in date cannot be in the past");
      return;
    }

    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredHotels(filtered.length ? filtered : []);
    setCurrentPage(1);
    setVisibleHotels([]);
  };

  const applyFilters = () => {
    let filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
    );

    if (priceRange[0] !== 500 || priceRange[1] !== 15000) {
      filtered = filtered.filter(
        (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
      );
    }

    if (selectedRating.length) {
      filtered = filtered.filter((hotel) =>
        selectedRating.includes(Math.floor(hotel.rating))
      );
    }

    if (selectedRoomTypes.length) {
      filtered = filtered.filter((hotel) =>
        selectedRoomTypes.includes(hotel.roomType)
      );
    }

    if (selectedAmenities.length) {
      filtered = filtered.filter((hotel) =>
        selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))
      );
    }

    setFilteredHotels(filtered.length ? filtered : []);
    setCurrentPage(1);
    setVisibleHotels([]);
  };

  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedRating, selectedRoomTypes, selectedAmenities, searchLocation]);

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

  const handleBookNow = (hotel) => {
    alert(`✅ Booking confirmed for ${hotel.name}!`);
  };

  const hotelsPerPage = 9;
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const paginatedHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
  );
  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="container mx-auto px-4 py-12">
        <SearchBar
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          guests={guests}
          setGuests={setGuests}
          handleSearch={handleSearch}
          isLoaded={isLoaded}
        />
        {searchError && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {searchError}
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-6 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="h-5 w-5 transition-transform duration-300 hover:rotate-90" />
              <span className="font-medium">Filters</span>
            </button>
          </div>
          <Filters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRating={selectedRating}
            toggleRating={(rating) => {
              setSelectedRating((prev) =>
                prev.includes(rating)
                  ? prev.filter((r) => r !== rating)
                  : [...prev, rating]
              );
            }}
            selectedRoomTypes={selectedRoomTypes}
            toggleRoomType={(type) => {
              setSelectedRoomTypes((prev) =>
                prev.includes(type)
                  ? prev.filter((t) => t !== type)
                  : [...prev, type]
              );
            }}
            selectedAmenities={selectedAmenities}
            toggleAmenity={(amenity) => {
              setSelectedAmenities((prev) =>
                prev.includes(amenity)
                  ? prev.filter((a) => a !== amenity)
                  : [...prev, amenity]
              );
            }}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
          />
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Available Hotels
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredHotels.length} properties found
              </p>
            </div>
            {filteredHotels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No hotels found for your search criteria.
                </p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedHotels.map((hotel, index) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    index={index}
                    visibleHotels={visibleHotels}
                    handleBookNow={() => handleBookNow(hotel)}
                    handleViewDetails={() => handleViewDetails(hotel)}
                  />
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-xl overflow-hidden shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={selectedHotel.image || "/placeholder.svg"}
              alt={selectedHotel.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {selectedHotel.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {selectedHotel.location}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-blue-600">
                  ₹{selectedHotel.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  Rating: {selectedHotel.rating}
                </span>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hotels;
