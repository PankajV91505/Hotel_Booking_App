import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Removed BrowserRouter
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
    setAuthTab("login");
  };

  const handleLogin = (email, password) => {
    setUser({ email, firstName: "John", lastName: "Doe" });
    setIsAuthModalOpen(false);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthTab("login");
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
                handleLogin={handleLogin}
                handleRegister={handleRegister}
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
                handleLogin={handleLogin}
                handleRegister={handleRegister}
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
              />
            }
          />
          <Route path="/about" element={<About isLoaded={isLoaded} />} />
          <Route path="/contact" element={<Contact isLoaded={isLoaded} />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} isLoaded={isLoaded} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} isLoaded={isLoaded} />} />
        </Routes>
      </ErrorBoundary>

      <Footer isLoaded={isLoaded} />
    </>
  );
}

export default App;
