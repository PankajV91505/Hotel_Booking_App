export const fetchHotels = async () => {
  try {
    const response = await API.get('/api/hotels');
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};
