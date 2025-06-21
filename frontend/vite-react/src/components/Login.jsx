import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!validateForm()) return;

    try {
      // Simulate API call (replace with real API call)
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === "test@example.com" && password === "password") {
            resolve();
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000);
      });
      onLogin(email, password);
      setMsg("Login successful!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMsg(err.message || "Login failed");
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 ${
              errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-600"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 ${
              errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-600"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!email || !password}
        >
          Login
        </button>
      </form>
      {msg && (
        <p className={`mt-2 text-sm flex items-center ${msg.includes("successful") ? "text-green-600" : "text-red-600"}`}>
          <AlertCircle className="h-4 w-4 mr-2" />
          {msg}
        </p>
      )}
    </div>
  );
}
