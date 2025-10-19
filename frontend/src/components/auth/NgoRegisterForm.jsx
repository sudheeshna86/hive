

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function NgoRegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    orgName: "",
    contactName: "",
    phone: "",
    email: "",
    registration: "",
    address: "",
    password: "",
    confirm: "",
  });

  const green = "#228b57";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and registration logic here
  };

  return (
    <div
      style={{ minHeight: "100vh", background: "#f8f9fa", overflow: "auto" }}
    >
      <div
        className="container py-5 d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <motion.div
          style={{ width: "100%", maxWidth: "520px", margin: "0 auto" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* ✅ Back to Role Selection */}
          <motion.div
            className="mb-3 d-flex align-items-center"
            whileHover={{ x: -5 }}
            style={{ cursor: "pointer", fontWeight: 500, color: green }}
            onClick={() => navigate("/register")}
          >
            &#8592; Back to role selection
          </motion.div>

          {/* ✅ Header Section */}
          <motion.div
            className="d-flex flex-column align-items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <motion.div
              className="d-flex align-items-center justify-content-center mb-2"
              style={{
                backgroundColor: green,
                borderRadius: "50%",
                width: "70px",
                height: "70px",
              }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Heart color="#fff" size={38} />
            </motion.div>
            <h2 className="fw-bold text-center mb-1" style={{ fontSize: "2rem" }}>
              Register as NGO
            </h2>
            <div
              className="text-muted text-center mb-3"
              style={{ fontSize: "1.08rem" }}
            >
              Verify cases and ensure legitimacy
            </div>
          </motion.div>

          {/* ✅ Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="mx-auto"
            style={{ maxWidth: "660px" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <motion.div
              className="p-4 rounded-3 shadow-sm mb-3"
              style={{
                border: "1px solid #dadada",
                background: "#fff",
              }}
              whileHover={{ scale: 1.01, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
            >
              {/* Organization Name */}
              <motion.div className="mb-3" whileFocus={{ scale: 1.02 }}>
                <label className="form-label">
                  Organization Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="orgName"
                  placeholder="Your organization's name"
                  required
                  value={form.orgName}
                  onChange={handleChange}
                />
              </motion.div>

              {/* Contact Name & Phone */}
              <div className="row g-3 mb-3">
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">
                    Contact Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactName"
                    placeholder="Primary contact person"
                    required
                    value={form.contactName}
                    onChange={handleChange}
                  />
                </motion.div>
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="+91 98765 43210"
                    required
                    value={form.phone}
                    onChange={handleChange}
                  />
                </motion.div>
              </div>

              {/* Email & Registration Number */}
              <div className="row g-3 mb-3">
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="organization@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </motion.div>
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">
                    Registration Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="registration"
                    placeholder="Official registration number"
                    required
                    value={form.registration}
                    onChange={handleChange}
                  />
                </motion.div>
              </div>

              {/* Address */}
              <motion.div className="mb-3" whileFocus={{ scale: 1.02 }}>
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  placeholder="Full address"
                  required
                  rows={2}
                  value={form.address}
                  onChange={handleChange}
                />
              </motion.div>

              {/* Password & Confirm */}
              <div className="row g-3 mb-3">
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
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
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
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

              {/* Alert */}
              <motion.div
                className="alert alert-warning py-2 mb-3"
                style={{ fontSize: "0.95rem" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Your account will require admin approval before you can start
                verifying cases.
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="btn w-100"
                style={{
                  background: green,
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: "1.09rem",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 6px 15px rgba(0,0,0,0.12)" }}
                whileTap={{ scale: 0.97 }}
              >
                Register NGO
              </motion.button>
            </motion.div>

            {/* Sign In Link */}
            <motion.div
              className="text-center mt-2 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Already have an account?{" "}
              <span
                className="text-success text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Sign in
              </span>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
