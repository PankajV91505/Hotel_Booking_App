import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navbar({ isLoaded, user, onLoginClick, onLogoutClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-all duration-1000 ${
        isLoaded ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          StayEasy
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300">
            Home
          </Link>
          <Link to="/hotels" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300">
            Hotels
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300">
            Contact
          </Link>
          {user && (
            <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300">
              Profile
            </Link>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300 flex items-center">
                <User className="h-5 w-5 mr-1" />
                {user.firstName}
              </span>
              <button
                onClick={onLogoutClick}
                className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-300"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 py-6 space-y-4">
          <Link
            to="/home"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/hotels"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Hotels
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          {user && (
            <Link
              to="/profile"
              className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                onLogoutClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center text-red-600 hover:text-red-700 transition-colors duration-300"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                setIsMenuOpen(false);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}