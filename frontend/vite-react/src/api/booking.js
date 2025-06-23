//Book Hotel

export const bookHotel = async (hotelId, checkIn, checkOut, guests) => {
  try {
    const response = await API.post('/api/book', { hotelId, checkIn, checkOut, guests });
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error('Booking error:', error);
    return { success: false, message: 'Booking failed' };
  }
};


//Get User Bookings

export const getMyBookings = async () => {
  try {
    const response = await API.get('/api/mybookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};
