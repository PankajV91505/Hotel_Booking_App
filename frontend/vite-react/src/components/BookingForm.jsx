import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotel, price, checkInDate, checkOutDate, guests, image } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: formData,
          hotel: {
            name: hotel,
            price: price,
          },
          dates: {
            checkIn: checkInDate,
            checkOut: checkOutDate,
          },
          guests: guests,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Booking confirmed! Check your email for confirmation.');
        navigate('/');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error(error);
    }
  };

  if (!hotel) return null;

  return (
    <div className="booking-form-container">
      <h2>Complete Your Booking</h2>
      
      <div className="booking-summary">
        <h3>{hotel}</h3>
        <p>Dates: {checkInDate} to {checkOutDate}</p>
        <p>Guests: {guests}</p>
        <p>Total: ₹{price}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
        
        <textarea
          name="specialRequests"
          placeholder="Special Requests"
          value={formData.specialRequests}
          onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
        />
        
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}