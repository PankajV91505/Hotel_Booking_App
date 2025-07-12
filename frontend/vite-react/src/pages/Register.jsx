import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register({ setUser, isLoaded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        name,
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      alert(response.data.msg);

      // Store user and token
      localStorage.setItem('token', response.data.access_token);
      setUser({ name, email });

      navigate('/profile'); // Redirect to profile page after successful register

    } catch (error) {
      alert(error.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
