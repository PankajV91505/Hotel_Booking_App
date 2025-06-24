import API from './axiosInstance'; // Make sure your Axios instance is configured with baseURL

// Book Hotel
export const bookHotel = async (hotelId, checkIn, checkOut, guests, token) => {
  try {
    const response = await API.post('/api/bookings/create-booking', 
      { room_id: hotelId, check_in: checkIn, check_out: checkOut, guests },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return { success: true, message: response.data.msg, bookingId: response.data.booking_id };

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
    const response = await API.get('/api/bookings/my', {
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
