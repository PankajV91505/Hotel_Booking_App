import { Calendar, Users, ChevronDown, Search } from "lucide-react";
import SearchAutocomplete from "./SearchAutocomplete";

const SearchBar = ({
  searchLocation,
  setSearchLocation,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  handleSearch,
  isLoaded,
}) => {
  const handleLocationSelect = (suggestion) => {
    console.log("Selected location:", suggestion);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-6xl mx-auto transition-all duration-1000 delay-500 hover:shadow-2xl hover:shadow-blue-500/20 ${
      isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
            Location
          </label>
          <SearchAutocomplete
            value={searchLocation}
            onChange={setSearchLocation}
            onSelect={handleLocationSelect}
            placeholder="Where are you going?"
          />
        </div>
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-blue-600 group-focus-within:scale-110" />
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105"
            />
          </div>
        </div>
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-blue-600 group-focus-within:scale-110" />
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105"
            />
          </div>
        </div>
        <div className="relative group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-blue-600 group-focus-within:scale-110" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none transition-all duration-300 hover:border-blue-400 focus:scale-105"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="2-1">2 Adults, 1 Child</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none transition-transform duration-300 group-focus-within:rotate-180" />
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center group"
        >
          <Search className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
          Search Hotels
        </button>
      </div>
    </div>
  );
};

export default SearchBar;