

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function VolunteerRegisterForm() {
  const navigate = useNavigate();
  const blue = "#1877f2";

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    org: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation & submission logic
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", overflow: "auto" }}>
      <div className="container py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <motion.div
          style={{ width: "100%", maxWidth: "520px", margin: "0 auto" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Back */}
          <motion.div
            className="mb-3 d-flex align-items-center"
            whileHover={{ x: -5 }}
            style={{ cursor: "pointer", fontWeight: 500, color: blue }}
            onClick={() => navigate("/register")}
          >
            &#8592; Back to role selection
          </motion.div>

          {/* Header */}
          <motion.div
            className="d-flex flex-column align-items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <motion.div
              className="d-flex align-items-center justify-content-center mb-2"
              style={{
                backgroundColor: blue,
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
              Register as Volunteer
            </h2>
            <div className="text-muted text-center mb-3" style={{ fontSize: "1.08rem" }}>
              Help register cases for those in need
            </div>
          </motion.div>

          {/* Form */}
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
              style={{ border: "1px solid #dadada", background: "#fff" }}
              whileHover={{ scale: 1.01, boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}
            >
              {/* Full Name */}
              <motion.div className="mb-3" whileFocus={{ scale: 1.02 }}>
                <label className="form-label">Full Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="fullName" placeholder="Enter your full name" required value={form.fullName} onChange={handleChange} />
              </motion.div>

              {/* Phone & Email */}
              <div className="row g-3 mb-3">
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="phone" placeholder="+1 (555) 000-0000" required value={form.phone} onChange={handleChange} />
                </motion.div>
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">Email <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" name="email" placeholder="your.email@example.com" required value={form.email} onChange={handleChange} />
                </motion.div>
              </div>

              {/* City & State */}
              <div className="row g-3 mb-3">
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">City <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="city" placeholder="Your city" required value={form.city} onChange={handleChange} />
                </motion.div>
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">State <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="state" placeholder="Your state" required value={form.state} onChange={handleChange} />
                </motion.div>
              </div>

              {/* Organization */}
              <motion.div className="mb-3" whileFocus={{ scale: 1.02 }}>
                <label className="form-label">Organization (Optional)</label>
                <input type="text" className="form-control" name="org" placeholder="Your organization or NGO" value={form.org} onChange={handleChange} />
              </motion.div>

              {/* Password */}
              <div className="row g-3 mb-3">
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">Password <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="password" placeholder="Min. 8 characters" required value={form.password} onChange={handleChange} />
                </motion.div>
                <motion.div className="col-md-6" whileFocus={{ scale: 1.02 }}>
                  <label className="form-label">Confirm Password <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="confirm" placeholder="Confirm password" required value={form.confirm} onChange={handleChange} />
                </motion.div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn w-100"
                style={{ background: blue, color: "#fff", fontWeight: 500, fontSize: "1.09rem" }}
                whileHover={{ scale: 1.03, boxShadow: "0 6px 15px rgba(0,0,0,0.12)" }}
                whileTap={{ scale: 0.97 }}
              >
                Create Volunteer Account
              </motion.button>
            </motion.div>

            {/* Sign In */}
            <motion.div className="text-center mt-2 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Already have an account?{" "}
              <span className="text-primary text-decoration-underline" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                Sign in
              </span>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
