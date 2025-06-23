import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import Footer from "../components/Footer";

function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!validateForm()) return;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMsg("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setMsg("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="container mx-auto px-4 py-16">
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you! Send us your questions or feedback.
          </p>
        </div>
        <div
          className={`max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 ${
                  errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-600"
                }`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 ${
                  errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-600"
                }`}
                placeholder="Your Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 ${
                  errors.message ? "border-red-500" : "border-gray-200 dark:border-gray-600"
                }`}
                placeholder="Your Message"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.name || !formData.email || !formData.message}
            >
              Send Message
            </button>
          </form>
          {msg && (
            <p className={`mt-4 text-sm flex items-center ${msg.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
              <AlertCircle className="h-4 w-4 mr-2" />
              {msg}
            </p>
          )}
        </div>
      </div>
      {/* <Footer isLoaded={isLoaded} /> */}
    </div>
  );
}

export default Contact;