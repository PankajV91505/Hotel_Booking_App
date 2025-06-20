// src/components/BookingModal.jsx
import { useState, useEffect } from "react";
import { X, AlertCircle, Check, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";

export const BookingModal = ({
  isBookingModalOpen,
  setIsBookingModalOpen,
  selectedHotel,
  bookingStep,
  setBookingStep,
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  isSubmitting,
  setIsSubmitting,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isBookingModalOpen) {
      setIsLoaded(true);
    }
  }, [isBookingModalOpen]);

  const validateForm = (step) => {
    const errors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
      }
      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        errors.phone = "Phone number must be 10 digits";
      }
      if (!formData.checkIn) errors.checkIn = "Check-in date is required";
      if (!formData.checkOut) errors.checkOut = "Check-out date is required";
      if (formData.checkIn && formData.checkOut && new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        errors.checkOut = "Check-out date must be after check-in date";
      }
    }

    if (step === 2) {
      if (!formData.cardNumber.trim()) {
        errors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        errors.cardNumber = "Card number must be 16 digits";
      }
      if (!formData.expiryDate.trim()) {
        errors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = "Expiry date must be in MM/YY format";
      }
      if (!formData.cvv.trim()) {
        errors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = "CVV must be 3 or 4 digits";
      }
      if (!formData.cardName.trim()) errors.cardName = "Cardholder name is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleNextStep = () => {
    if (validateForm(bookingStep)) {
      setBookingStep(2);
    }
  };

  const handleSubmitBooking = async () => {
    if (!validateForm(2)) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setBookingStep(3);
  };

  const closeModal = () => {
    setIsBookingModalOpen(false);
    setBookingStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: "1",
      specialRequests: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    });
    setFormErrors({});
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 1;
  };

  const calculateTotal = () => {
    if (!selectedHotel) return 0;
    const nights = calculateNights();
    const subtotal = selectedHotel.price * nights;
    const taxes = subtotal * 0.18; // 18% GST
    return subtotal + taxes;
  };

  if (!isBookingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 animate-fadeIn"
          onClick={closeModal}
        />

        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg animate-slideInUp">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {bookingStep === 3 ? "Booking Confirmed!" : "Complete Your Booking"}
            </h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {selectedHotel && (
              <>
                {/* Hotel Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedHotel.image || "/placeholder.svg"}
                      alt={selectedHotel.name}
                      className="w-20 h-20 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{selectedHotel.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedHotel.location}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                          {selectedHotel.rating} ({selectedHotel.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹{selectedHotel.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">per night</div>
                    </div>
                  </div>
                </div>

                {/* Step 1: Guest Details */}
                {bookingStep === 1 && (
                  <div className="space-y-6 animate-slideInLeft">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Guest Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                              formErrors.firstName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="Enter first name"
                          />
                          {formErrors.firstName && (
                            <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.firstName}
                            </p>
                          )}
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                              formErrors.lastName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="Enter last name"
                          />
                          {formErrors.lastName && (
                            <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                            formErrors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="Enter email address"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                            formErrors.phone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                          placeholder="Enter phone number"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Booking Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                            Check-in Date *
                          </label>
                          <input
                            type="date"
                            value={formData.checkIn}
                            onChange={(e) => handleInputChange("checkIn", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                              formErrors.checkIn ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                          />
                          {formErrors.checkIn && (
                            <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.checkIn}
                            </p>
                          )}
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                            Check-out Date *
                          </label>
                          <input
                            type="date"
                            value={formData.checkOut}
                            onChange={(e) => handleInputChange("checkOut", e.target.value)}
                            min={formData.checkIn || new Date().toISOString().split("T")[0]}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                              formErrors.checkOut ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                          />
                          {formErrors.checkOut && (
                            <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.checkOut}
                            </p>
                          )}
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                            Guests
                          </label>
                          <select
                            value={formData.guests}
                            onChange={(e) => handleInputChange("guests", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105"
                          >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105"
                        placeholder="Any special requests or preferences..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Details */}
                {bookingStep === 2 && (
                  <div className="space-y-6 animate-slideInRight">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Details</h3>

                      {/* Booking Summary */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow duration-300">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Booking Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">
                              {calculateNights()} night{calculateNights() !== 1 ? "s" : ""} × ₹
                              {selectedHotel.price.toLocaleString()}
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              ₹{(selectedHotel.price * calculateNights()).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Taxes & Fees (18%)</span>
                            <span className="text-gray-900 dark:text-white">
                              ₹{(selectedHotel.price * calculateNights() * 0.18).toLocaleString()}
                            </span>
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between font-semibold">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <span className="text-gray-900 dark:text-white">
                              ₹{calculateTotal().toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                            Card Number *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                              maxLength={19}
                              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                                formErrors.cardNumber ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                              }`}
                              placeholder="1234 5678 9012 3456"
                            />
                            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 transition-all duration-300 group-focus-within:text-blue-600 group-focus-within:scale-110" />
                          </div>
                          {formErrors.cardNumber && (
                            <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "");
                                if (value.length >= 2) {
                                  value = value.substring(0, 2) + "/" + value.substring(2, 4);
                                }
                                handleInputChange("expiryDate", value);
                              }}
                              maxLength={5}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                                formErrors.expiryDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                              }`}
                              placeholder="MM/YY"
                            />
                            {formErrors.expiryDate && (
                              <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {formErrors.expiryDate}
                              </p>
                            )}
                          </div>

                          <div className="group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                              CVV *
                            </label>
                            <input
                              type="text"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                              maxLength={4}
                              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                                formErrors.cvv ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                              }`}
                              placeholder="123"
                            />
                            {formErrors.cvv && (
                              <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                {formErrors.cvv}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="group">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 focus:scale-105 ${
                              formErrors.cardName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                            placeholder="Name as it appears on card"
                          />
                          {formErrors.cardName && (
                            <p className="mt-1 text-sm text-red-600 flex items-center animate-slideInLeft">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {formErrors.cardName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {bookingStep === 3 && (
                  <div className="text-center space-y-6 animate-bounceIn">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400 animate-bounce" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Booking Confirmed!
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Your booking has been confirmed. You will receive a confirmation email shortly.
                      </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-left hover:shadow-lg transition-shadow duration-300">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Booking Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Booking ID:</span>
                          <span className="text-gray-900 dark:text-white font-mono">
                            BK{Date.now().toString().slice(-6)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Guest:</span>
                          <span className="text-gray-900 dark:text-white">
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                          <span className="text-gray-900 dark:text-white">
                            {new Date(formData.checkIn).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
                          <span className="text-gray-900 dark:text-white">
                            {new Date(formData.checkOut).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Total Paid:</span>
                          <span className="text-gray-900 dark:text-white font-semibold">
                            ₹{calculateTotal().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            {bookingStep === 1 && (
              <>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 text-white rounded-lg"
                >
                  Continue to Payment
                </button>
              </>
            )}

            {bookingStep === 2 && (
              <>
                <button
                  onClick={() => setBookingStep(1)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${calculateTotal().toLocaleString()}`
                  )}
                </button>
              </>
            )}

            {bookingStep === 3 && (
              <button
                onClick={closeModal}
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 text-white rounded-lg"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingModal;