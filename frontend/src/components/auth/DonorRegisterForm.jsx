
import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function DonorRegisterForm() {
  const navigate = useNavigate();
  const yellow = "#ffc107";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and registration logic here
  };

  return (
    <motion.div
      style={{ minHeight: "100vh", background: "#f8f9fa", overflow: "auto" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="container py-5 d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          style={{ width: "100%", maxWidth: "520px", margin: "0 auto" }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Back to Role Selection */}
          <motion.div
            className="mb-3 d-flex align-items-center"
            whileHover={{ scale: 1.02 }}
          >
            <span
              className="text-warning"
              style={{
                cursor: "pointer",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                fontSize: "1.08rem",
              }}
              onClick={() => navigate("/register")}
            >
              <span style={{ fontSize: "1.4rem", marginRight: "5px" }}>
                &#8592;
              </span>
              Back to role selection
            </span>
          </motion.div>

          {/* Header Section */}
          <motion.div
            className="d-flex flex-column align-items-center mb-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="d-flex align-items-center justify-content-center mb-2"
              style={{
                backgroundColor: yellow,
                borderRadius: "50%",
                width: "70px",
                height: "70px",
              }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Heart color="#fff" size={38} />
            </motion.div>
            <h2
              className="fw-bold text-center mb-1"
              style={{ fontSize: "2rem" }}
            >
              Register as Donor
            </h2>
            <motion.div
              className="text-muted text-center mb-3"
              style={{ fontSize: "1.1rem" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Make a difference with secure contributions
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="mx-auto"
            style={{ maxWidth: "660px" }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="p-4 rounded-3 shadow-sm mb-3"
              style={{ border: "1px solid #dadada", background: "#fff" }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
            >
              <motion.div className="mb-3" whileFocus={{ scale: 1.01 }}>
                <label className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div className="mb-3" whileFocus={{ scale: 1.01 }}>
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div className="mb-3" whileFocus={{ scale: 1.01 }}>
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
              </motion.div>

              <div className="row g-3 mb-3">
                <motion.div className="col-md-6" whileFocus={{ scale: 1.01 }}>
                  <label className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Min. 8 characters"
                    required
                    value={form.password}
                    onChange={handleChange}
                  />
                </motion.div>
                <motion.div className="col-md-6" whileFocus={{ scale: 1.01 }}>
                  <label className="form-label">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirm"
                    placeholder="Confirm password"
                    required
                    value={form.confirm}
                    onChange={handleChange}
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                className="btn w-100"
                style={{
                  background: yellow,
                  color: "#222",
                  fontWeight: 500,
                  fontSize: "1.08rem",
                  border: "none",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 6px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Create Donor Account
              </motion.button>
            </motion.div>

            <motion.div
              className="text-center mt-2 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Already have an account?{" "}
              <span
                className="text-warning text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Sign in
              </span>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}
