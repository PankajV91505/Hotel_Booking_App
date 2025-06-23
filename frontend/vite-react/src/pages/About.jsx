import { useState, useEffect } from "react";
import Footer from "../components/Footer";

function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="container mx-auto px-4 py-16">
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            About StayEasy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your trusted partner for seamless travel experiences
          </p>
        </div>
        <div
          className={`max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            StayEasy is your trusted partner for finding the perfect accommodation worldwide. Our mission is to make travel planning seamless and enjoyable, offering a curated selection of hotels that cater to every traveler's needs.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Founded in 2024, we strive to provide unbeatable prices, exceptional customer service, and a user-friendly platform to help you discover your ideal stay, whether for business or leisure.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Join thousands of satisfied travelers who have found their perfect stay with StayEasy. Let us help you create unforgettable memories on your next trip!
          </p>
        </div>
      </div>
      {/* <Footer isLoaded={isLoaded} /> */}
    </div>
  );
}

export default About;