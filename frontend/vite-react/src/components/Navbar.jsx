import { Menu, X } from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">StayEasy</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Hotels
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Auth Buttons and Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Login
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                Home
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                Hotels
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                About
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                Contact
              </a>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400">
                  Login
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-fit">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}