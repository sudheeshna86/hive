import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const green = "#257a47";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate login
    await new Promise((resolve) => setTimeout(resolve, 500));

    // User data object
    const userData = {
      email: emailOrPhone,
      role: role,
      name: emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : emailOrPhone,
      id: Math.random().toString(36).substr(2, 9),
    };

    // Save session
    if (rememberMe) localStorage.setItem("user", JSON.stringify(userData));
    else sessionStorage.setItem("user", JSON.stringify(userData));

    // Navigate based on role
    switch (role) {
      case "volunteer":
        navigate("/volunteer");
        break;
      case "ngo":
        navigate("/ngo");
        break;
      case "donor":
        navigate("/donor");
        break;
      case "service-provider":
        navigate("/service-provider");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        setError("Please select a valid role");
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      className="bg-white rounded-4 shadow p-4 d-flex flex-column align-items-center mx-auto"
      style={{ maxWidth: "370px" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="d-flex align-items-center justify-content-center mb-3"
        style={{ width: "70px", height: "70px", backgroundColor: green, borderRadius: "16px" }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Heart size={32} color="#fff" fill="#fff" />
      </motion.div>

      <motion.h2 className="fw-bold mb-1 text-center" style={{ color: "#222", fontSize: "1.7rem" }}>
        Login to HopeLink
      </motion.h2>

      <motion.div className="text-center text-muted mb-3" style={{ fontSize: "1.08rem" }}>
        Sign in to continue making a difference
      </motion.div>

      {error && <div className="alert alert-danger w-100 text-center">{error}</div>}

      <form onSubmit={handleLogin} className="w-100">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Email or Phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="form-select mb-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="volunteer">Volunteer</option>
          <option value="ngo">NGO</option>
          <option value="donor">Donor</option>
          <option value="service-provider">Service Provider</option>
          <option value="admin">Admin</option>
        </select>

        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember Me
          </label>
        </div>

        <button
          type="submit"
          className="btn w-100 mb-2"
          style={{ background: green, color: "#fff" }}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center mt-2">
        <Link to="/forgot-password" style={{ color: green }}>
          Forgot Password?
        </Link>
      </div>

      <div className="text-center mt-2">
        <Link to="/register" style={{ color: green }}>
          Don't have an account? Register here
        </Link>
      </div>
    </motion.div>
  );
}
