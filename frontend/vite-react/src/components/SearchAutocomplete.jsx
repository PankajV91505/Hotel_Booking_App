// src/components/SearchAutocomplete.jsx
import { useState, useEffect, useRef } from "react";
import { MapPin, Clock, TrendingUp, Search } from "lucide-react";

export function SearchAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Where are you going?",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Sample data - in real app, this would come from an API
  const allSuggestions = [
    // Popular destinations
    { id: "mumbai", type: "popular", title: "Mumbai", subtitle: "Maharashtra, India", icon: TrendingUp },
    { id: "goa", type: "popular", title: "Goa", subtitle: "India", icon: TrendingUp },
    { id: "delhi", type: "popular", title: "Delhi", subtitle: "India", icon: TrendingUp },
    { id: "bangalore", type: "popular", title: "Bangalore", subtitle: "Karnataka, India", icon: TrendingUp },
    { id: "jaipur", type: "popular", title: "Jaipur", subtitle: "Rajasthan, India", icon: TrendingUp },
    { id: "kerala", type: "popular", title: "Kerala", subtitle: "India", icon: TrendingUp },
    { id: "shimla", type: "popular", title: "Shimla", subtitle: "Himachal Pradesh, India", icon: TrendingUp },
    { id: "udaipur", type: "popular", title: "Udaipur", subtitle: "Rajasthan, India", icon: TrendingUp },

    // Recent searches (would be stored in localStorage)
    { id: "recent-mumbai", type: "recent", title: "Mumbai Central", subtitle: "Recent search", icon: Clock },
    { id: "recent-goa", type: "recent", title: "Goa Beach Resort Area", subtitle: "Recent search", icon: Clock },
    { id: "recent-delhi", type: "recent", title: "Delhi Airport", subtitle: "Recent search", icon: Clock },

    // Location-based suggestions
    {
      id: "loc-mumbai-bandra",
      type: "location",
      title: "Bandra, Mumbai",
      subtitle: "Maharashtra, India",
      icon: MapPin,
    },
    {
      id: "loc-mumbai-andheri",
      type: "location",
      title: "Andheri, Mumbai",
      subtitle: "Maharashtra, India",
      icon: MapPin,
    },
    { id: "loc-goa-calangute", type: "location", title: "Calangute Beach, Goa", subtitle: "India", icon: MapPin },
    { id: "loc-goa-anjuna", type: "location", title: "Anjuna Beach, Goa", subtitle: "India", icon: MapPin },
    { id: "loc-delhi-cp", type: "location", title: "Connaught Place, Delhi", subtitle: "India", icon: MapPin },
    { id: "loc-delhi-karol", type: "location", title: "Karol Bagh, Delhi", subtitle: "India", icon: MapPin },
  ];

  // Filter suggestions based on input
  useEffect(() => {
    if (!value.trim()) {
      // Show popular and recent when no input
      const popularSuggestions = allSuggestions.filter((s) => s.type === "popular").slice(0, 4);
      const recentSuggestions = allSuggestions.filter((s) => s.type === "recent").slice(0, 3);
      setSuggestions([...recentSuggestions, ...popularSuggestions]);
      setHighlightedIndex(-1);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = allSuggestions
        .filter(
          (suggestion) =>
            suggestion.title.toLowerCase().includes(value.toLowerCase()) ||
            (suggestion.subtitle && suggestion.subtitle.toLowerCase().includes(value.toLowerCase())),
        )
        .slice(0, 8);

      setSuggestions(filtered);
      setHighlightedIndex(-1);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [value]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
            handleSelect(suggestions[highlightedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, suggestions]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (suggestion) => {
    onChange(suggestion.title);
    onSelect(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow for click events
    setTimeout(() => setIsOpen(false), 150);
  };

  const getSuggestionTypeLabel = (type) => {
    switch (type) {
      case "recent":
        return "Recent searches";
      case "popular":
        return "Popular destinations";
      case "location":
        return "Locations";
      default:
        return "";
    }
  };

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.type]) {
      acc[suggestion.type] = [];
    }
    acc[suggestion.type].push(suggestion);
    return acc;
  }, {});

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-blue-600 group-focus-within:scale-110" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105"
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl transition-all duration-300 origin-top ${
          isOpen && (suggestions.length > 0 || isLoading)
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {isLoading ? (
          <div className="p-4">
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : suggestions.length > 0 ? (
          <ul ref={listRef} className="max-h-80 overflow-y-auto py-2">
            {Object.entries(groupedSuggestions).map(([type, typeSuggestions], groupIndex) => (
              <div key={type}>
                {/* Group Header */}
                <div
                  className={`px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 transition-all duration-300 ${
                    isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${groupIndex * 50}ms` }}
                >
                  {getSuggestionTypeLabel(type)}
                </div>

                {/* Suggestions */}
                {typeSuggestions.map((suggestion, index) => {
                  const globalIndex = suggestions.indexOf(suggestion);
                  const IconComponent = suggestion.icon;

                  return (
                    <li
                      key={suggestion.id}
                      className={`transition-all duration-200 ${
                        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                      style={{ transitionDelay: `${groupIndex * 100 + index * 50}ms` }}
                    >
                      <button
                        onClick={() => handleSelect(suggestion)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-3 transition-all duration-200 group ${
                          highlightedIndex === globalIndex
                            ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500"
                            : ""
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 transition-all duration-300 ${
                            highlightedIndex === globalIndex
                              ? "text-blue-600 dark:text-blue-400 scale-110"
                              : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                          }`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-medium transition-colors duration-200 ${
                              highlightedIndex === globalIndex
                                ? "text-blue-900 dark:text-blue-100"
                                : "text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            }`}
                          >
                            {suggestion.title}
                          </div>
                          {suggestion.subtitle && (
                            <div
                              className={`text-sm transition-colors duration-200 ${
                                highlightedIndex === globalIndex
                                  ? "text-blue-600 dark:text-blue-300"
                                  : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {suggestion.subtitle}
                            </div>
                          )}
                        </div>

                        {/* Hover indicator */}
                        <div
                          className={`flex-shrink-0 transition-all duration-300 ${
                            highlightedIndex === globalIndex
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        >
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    </li>
                  );
                })}
              </div>
            ))}
          </ul>
        ) : value.trim() && !isLoading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No destinations found for "{value}"</p>
            <p className="text-sm mt-1">Try searching for a city or landmark</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default SearchAutocomplete;