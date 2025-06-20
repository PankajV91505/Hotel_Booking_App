import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import HotelCard from "../components/HotelCard";
import BookingModal from "../components/BookingModal";
import Footer from "../components/Footer";
import { hotels } from "../constants/hotelData";

function Home() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleHotels, setVisibleHotels] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("1");
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
    console.log("Searching with:", {
      location: searchLocation,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests,
    });
  };

  const handleBookNow = (hotel) => {
    setSelectedHotel(hotel);
    setIsBookingModalOpen(true);
    setBookingStep(1);
    setFormData({
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
    setFormErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar isLoaded={isLoaded} />
      <div className={`bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-12 transition-all duration-1000 ${
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}>
        <div className="container mx-auto px-4">
          <div className={`text-center mb-8 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-pulse">Find Your Perfect Stay</h1>
            <p className="text-xl text-blue-100">Discover amazing hotels at unbeatable prices</p>
          </div>
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
        </div>
      </div>
      <div className={`container mx-auto px-4 py-8 transition-all duration-1000 delay-700 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Filter className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
              <span>Filters</span>
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
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Available Hotels</h2>
              <p className="text-gray-600 dark:text-gray-400">{hotels.length} properties found</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {hotels.map((hotel, index) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  index={index}
                  visibleHotels={visibleHotels}
                  handleBookNow={handleBookNow}
                />
              ))}
            </div>
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
              >
                <ChevronLeft className="h-5 w-5 transition-transform duration-300 hover:-translate-x-1" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <ChevronRight className="h-5 w-5 transition-transform duration-300 hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer isLoaded={isLoaded} />
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

export default Home;