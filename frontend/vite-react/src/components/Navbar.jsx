import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ isLoaded }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-all duration-700 ${
      isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className={`text-2xl font-bold text-blue-600 dark:text-blue-400 transition-all duration-500 ${
              isLoaded ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}>
              StayEasy
            </div>
          </div>
          <div className={`hidden md:flex items-center space-x-8 transition-all duration-700 delay-200 ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}>
            {["Home", "Hotels", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className={`hidden md:flex items-center space-x-4 transition-all duration-700 delay-300 ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}>
            <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-105">
              Login
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25">
              Sign Up
            </button>
          </div>
          <button
            className={`md:hidden p-2 transition-all duration-500 hover:scale-110 ${
              isLoaded ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300 transition-transform duration-300" />
            )}
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {["Home", "Hotels", "About", "Contact"].map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className={`text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-2 transform ${
                    isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item}
                </a>
              ))}
              <div className={`flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 transition-all duration-500 delay-400 ${
                isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}>
                <button className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-2">
                  Login
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 w-fit transition-all duration-300 hover:scale-105">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;