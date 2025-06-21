import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoaded, user, onLoginClick, onLogoutClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className={`text-2xl font-extrabold text-blue-600 dark:text-blue-400 transition-all duration-500 ${isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
              StayEasy
            </Link>
          </div>
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-700 delay-200 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
            {["Home", "Hotels", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
          <div className={`hidden md:flex items-center space-x-4 transition-all duration-700 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
            {user ? (
              <>
                <Link to="/profile" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105">
                  Profile
                </Link>
                <button
                  onClick={onLogoutClick}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/25"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105"
                >
                  Login
                </button>
                <Link
                  to="/register"
                  className="px- escalating py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            className={`md:hidden p-2 transition-all duration-500 hover:scale-110 ${isLoaded ? "rotate-0 opacity-100" : "rotate-180 opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300 transition-transform duration-300" />
            )}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {["Home", "Hotels", "About", "Contact"].map((item, index) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:translate-x-2 transform ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className={`flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 transition-all duration-500 delay-400 ${isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:translate-x-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        onLogoutClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-all duration-300 hover:translate-x-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onLoginClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:translate-x-2"
                    >
                      Login
                    </button>
                    <Link
                      to="/register"
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 w-fit"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;