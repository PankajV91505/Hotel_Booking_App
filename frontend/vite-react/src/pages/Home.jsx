import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Register from "../components/Register";
import { Search } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
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
        </div>

        {/* Featured Section Placeholder */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Mumbai", "Goa", "Delhi"].map((city, index) => (
              <div
                key={city}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <img
                  src={`/images/${city.toLowerCase()}.jpg`}
                  alt={city}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  onError={(e) => (e.target.src = "/placeholder.svg")}
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{city}</h3>
                <p className="text-gray-600 dark:text-gray-400">Explore hotels in {city}</p>
                <button
                  onClick={() => {
                    setSearchLocation(city);
                    handleSearch();
                  }}
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
                >
                  <Search className="h-4 w-4 mr-1" />
                  Search Hotels
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
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

      <Footer isLoaded={isLoaded} />
    </div>
  );
}