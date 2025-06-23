// src/components/Footer.jsx
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  "About Us": ["Our Story", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Contact Us", "Safety", "Cancellation"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"],
};

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
            <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
              Your trusted partner for finding the perfect accommodation worldwide.
            </p>
            <div className="flex space-x-4" aria-label="Social media">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={Icon.name}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <nav key={section} aria-label={section}>
              <h3 className="text-lg font-semibold mb-4">{section}</h3>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={`${section}-${item}`}>
                    <a
                      href="#"
                      className="inline-block text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2"
                      style={{ transitionDelay: `${idx * 50}ms` }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
            © {new Date().getFullYear()} StayEasy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
