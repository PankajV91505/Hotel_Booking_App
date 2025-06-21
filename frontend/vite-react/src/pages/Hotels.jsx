import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import HotelCard from "../components/HotelCard";
import BookingModal from "../components/BookingModal";
import { hotels } from "../constants/hotelData";

function Hotels({ user, setIsAuthModalOpen, setAuthTab }) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 10000]);
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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    specialRequests: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      hotels.forEach((_, index) => {
        setTimeout(() => {
          setVisibleHotels((prev) => [...prev, index]);
        }, index * 150);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleRating = (rating) => {
    setSelectedRating((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const toggleRoomType = (type) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSearch = () => {
    if (!searchLocation || !checkInDate || !checkOutDate) {
      console.warn("Please fill all search fields");
      return;
    }
    console.log("Searching with:", { location: searchLocation, checkIn: checkInDate, checkOut: checkOutDate, guests });
  };

  const handleBookNow = (hotel) => {
    if (!user) {
      setIsAuthModalOpen(true);
      setAuthTab("login");
      return;
    }
    setSelectedHotel(hotel);
    setIsBookingModalOpen(true);
    setBookingStep(1);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: "",
      checkIn: checkInDate || "",
      checkOut: checkOutDate || "",
      guests: guests || "1",
      specialRequests: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    });
    setFormErrors({});
  };

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
            toggleRating={toggleRating}
            selectedRoomTypes={selectedRoomTypes}
            toggleRoomType={toggleRoomType}
            selectedAmenities={selectedAmenities}
            toggleAmenity={toggleAmenity}
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
          />
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Available Hotels</h2>
              <p className="text-gray-600 dark:text-gray-400">{hotels.length} properties found</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {hotels.map((hotel, index) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  index={index}
                  visibleHotels={visibleHotels}
                  handleBookNow={() => handleBookNow(hotel)}
                />
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}
      <BookingModal
        isBookingModalOpen={isBookingModalOpen}
        setIsBookingModalOpen={setIsBookingModalOpen}
        selectedHotel={selectedHotel}
        bookingStep={bookingStep}
        setBookingStep={setBookingStep}
        formData={formData}
        setFormData={setFormData}
        formErrors={formErrors}
        setFormErrors={setFormErrors}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />
    </div>
  );
}

export default Hotels;