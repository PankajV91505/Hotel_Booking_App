import API from './axiosInstance'; // Ensure baseURL is set here

// Book Hotel with Customer Details
export const bookHotel = async (hotelId, checkIn, checkOut, guests, customerEmail, customerPhone, token) => {
  try {
    const response = await API.post('/api/book', 
      {
        hotelId,              // Hotel ID
        checkIn,              // Check-in date
        checkOut,             // Check-out date
        guests,               // Number of guests
        customer_email: customerEmail,   // Customer Email
        customer_phone: customerPhone    // Customer Phone
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return { 
      success: true, 
      message: response.data.message 
    };

  } catch (error) {
    console.error('Booking error:', error);
    return { 
      success: false, 
      message: error.response?.data?.msg || 'Booking failed'
    };
  }
};

// Get User Bookings
export const getMyBookings = async (token) => {
  try {
    const response = await API.get('/api/mybookings', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};
