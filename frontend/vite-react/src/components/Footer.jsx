// src/components/Footer.jsx
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer = ({ isLoaded }) => {
  return (
    <footer
      className={`bg-gray-900 text-white py-12 transition-all duration-1000 delay-1000 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="group">
            <div className="text-2xl font-bold text-blue-400 mb-4 transition-all duration-300 group-hover:scale-105">
              StayEasy
            </div>
            <p className="text-gray-400 mb-4 transition-colors duration-300 group-hover:text-gray-300">
              Your trusted partner for finding the perfect accommodation worldwide.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12" />
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              {["Our Story", "Careers", "Press", "Blog"].map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {["Help Center", "Contact Us", "Safety", "Cancellation"].map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
            © 2024 StayEasy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;