import API from '../api/api';
// login
export const login = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    const { access_token, user } = response.data;

    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Invalid credentials' };
  }
};

// Register 
export const register = async (name, email, password) => {
  try {
    const response = await API.post('/auth/register', { name, email, password });
    return { success: true, message: response.data.message };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'User already exists' };
  }
};



// Login Page

import { login } from '../api/auth';

const handleLogin = async () => {
  const result = await login(email, password);
  if (result.success) {
    alert('Login Successful');
    navigate('/hotels');
  } else {
    alert(result.message);
  }
};


//Hotels Page
import { useEffect, useState } from 'react';
import { fetchHotels } from '../api/hotel';

useEffect(() => {
  const loadHotels = async () => {
    const hotels = await fetchHotels();
    setHotels(hotels);
  };
  loadHotels();
}, []);


// Booking button

import { bookHotel } from '../api/booking';

const handleBook = async (hotelId) => {
  const result = await bookHotel(hotelId, checkInDate, checkOutDate, guests);
  if (result.success) {
    alert(result.message);
  } else {
    alert(result.message);
  }
};

// logout
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/');
};
