import { useState, useEffect } from "react"; // Explicitly import React and hooks
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState(null); // Store authenticated user data
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // Modal state
  const [authTab, setAuthTab] = useState("login"); // Track login/register tab
  const [isLoaded, setIsLoaded] = useState(false); // Loading state

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  // Handle login click to open modal
  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
    setAuthTab("login");
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setAuthTab("login");
    localStorage.removeItem("token"); // Clear token on logout
  };

  return (
    <>
      <Navbar
        isLoaded={isLoaded}
        user={user}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogout}
      />

      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                setUser={setUser}
                isAuthModalOpen={isAuthModalOpen}
                setIsAuthModalOpen={setIsAuthModalOpen}
                authTab={authTab}
                setAuthTab={setAuthTab}
                isLoaded={isLoaded}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                user={user}
                setUser={setUser}
                isAuthModalOpen={isAuthModalOpen}
                setIsAuthModalOpen={setIsAuthModalOpen}
                authTab={authTab}
                setAuthTab={setAuthTab}
                isLoaded={isLoaded}
              />
            }
          />
          <Route
            path="/hotels"
            element={
              <Hotels
                user={user}
                setIsAuthModalOpen={setIsAuthModalOpen}
                setAuthTab={setAuthTab}
                isLoaded={isLoaded}
              />
            }
          />
          <Route path="/about" element={<About isLoaded={isLoaded} />} />
          <Route path="/contact" element={<Contact isLoaded={isLoaded} />} />
          <Route
            path="/profile"
            element={<Profile user={user} onLogout={handleLogout} isLoaded={isLoaded} />}
          />
          <Route
            path="/register"
            element={<Register setUser={setUser} isLoaded={isLoaded} />}
          />
        </Routes>
      </ErrorBoundary>

      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;