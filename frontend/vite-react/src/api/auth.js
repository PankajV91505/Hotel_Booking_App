// src/api/authApi.js

import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/auth/register', userData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.msg || 'Registration Failed';
  }
};

import axios from 'axios';

const loginUser = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/auth/login', {
      email: 'pankaj@example.com',
      password: 'password123'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    console.log('Login Success:', response.data);
    // Save token to localStorage: localStorage.setItem('token', response.data.access_token);
  } catch (error) {
    console.error('Login Failed:', error.response?.data?.msg || 'Server Error');
  }
};
