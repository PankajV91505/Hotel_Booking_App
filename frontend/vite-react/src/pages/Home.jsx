import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Login from "../components/Login";
import Register from "../components/Register";
import { Search, X } from "lucide-react";

export default function Home({
  user,
  setUser,
  isAuthModalOpen,
  setIsAuthModalOpen,
  authTab,
  setAuthTab,
  handleLogin,
  handleRegister,
  isLoaded,
}) {
  const [searchLocation, setSearchLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchLocation || !checkInDate || !checkOutDate) {
      alert("Please fill all search fields");
      return;
    }
    navigate("/hotels", {
      state: { searchLocation, checkInDate, checkOutDate, guests },
    });
  };

  const cities = ["Mumbai", "Goa", "Delhi"];

  const openCityModal = (city) => {
    setSelectedCity({
      name: city,
      description: `Explore top-rated hotels and exclusive deals in ${city}.`,
      image: `/images/${city.toLowerCase()}.jpg`,
      price: Math.floor(1500 + Math.random() * 3000),
      rating: (4 + Math.random()).toFixed(1),
    });
  };

  const closeModal = () => {
    setSelectedCity(null);
  };

  const handleBookCity = () => {
    alert(`✅ Booking confirmed for ${selectedCity.name}!`);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Discover Your Perfect Stay
          </h1>
          <p
            className={`text-lg text-gray-600 dark:text-gray-400 mb-8 transition-all duration-1000 delay-200 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            Book hotels with ease and comfort at StayEasy
          </p>
          <div
            className={`transition-all duration-1000 delay-400 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
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
        </section>

        {/* Popular Destinations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cities.map((city, index) => (
              <div
                key={city}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <img
                  src={`/images/${city.toLowerCase()}.jpg`}
                  alt={`Hotels in ${city}`}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg";
                  }}
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{city}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore hotels in {city}
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => openCityModal(city)}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchLocation(city);
                      handleSearch();
                    }}
                    className="text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className={`bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full shadow-lg transition-all duration-300 ${
              isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {authTab === "login" ? (
              <Login
                onLogin={handleLogin}
                setAuthTab={setAuthTab}
                setIsAuthModalOpen={setIsAuthModalOpen}
              />
            ) : (
              <Register
                onRegister={handleRegister}
                setAuthTab={setAuthTab}
                setIsAuthModalOpen={setIsAuthModalOpen}
              />
            )}
          </div>
        </div>
      )}

      {/* City Modal */}
      {selectedCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-xl overflow-hidden shadow-lg relative">
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={selectedCity.image}
              alt={selectedCity.name}
              className="w-full h-56 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg";
              }}
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {selectedCity.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {selectedCity.description}
              </p>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-blue-600">
                  ₹{selectedCity.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  Rating: {selectedCity.rating}
                </span>
              </div>

              <button
                onClick={handleBookCity}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
