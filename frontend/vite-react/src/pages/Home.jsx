import { useState } from 'react'
import { ChevronLeft, ChevronRight, Filter, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import HotelCard from '../components/HotelCard'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([1000, 10000])
  const [selectedRating, setSelectedRating] = useState([])
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // Sample hotel data
  const hotels = [
    {
      id: 1,
      name: "Grand Plaza Hotel",
      location: "Mumbai, Maharashtra",
      rating: 4.5,
      price: 3500,
      originalPrice: 4200,
      image: "/placeholder.svg",
      roomType: "Deluxe",
      amenities: ["WiFi", "AC", "Pool", "Gym"],
      discount: 17,
      reviews: 1250,
    },
    // ... (other hotel objects from your original code)
  ]

  const toggleRating = (rating) => {
    setSelectedRating((prev) => 
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    )
  }

  const toggleRoomType = (type) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    )
  }

  const clearAllFilters = () => {
    setSelectedRating([])
    setSelectedRoomTypes([])
    setSelectedAmenities([])
    setPriceRange([1000, 10000])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <SearchBar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Sidebar */}
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
            clearAllFilters={clearAllFilters}
          />

          {/* Hotel Listings */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Available Hotels</h2>
              <p className="text-gray-600 dark:text-gray-400">{hotels.length} properties found</p>
            </div>

            {/* Hotel Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? "bg-red-600 text-white"
                      : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold text-red-400 mb-4">StayEasy</div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for finding the perfect accommodation worldwide.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Our Story</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cancellation</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 StayEasy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}
    </div>
  )
}