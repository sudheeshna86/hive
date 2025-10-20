import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ShieldCheck, DollarSign, Package, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function RegisterForm() {
  const navigate = useNavigate();

  const roles = [
    {
      key: "volunteer",
      label: "Volunteer",
      desc: "Register cases and help those in need",
      bg: "#1877f2",
      Icon: Users,
      text: "#fff",
      route: "/register/volunteer",
    },
    {
      key: "ngo",
      label: "NGO Verifier",
      desc: "Verify cases and ensure legitimacy",
      bg: "#228b57",
      Icon: ShieldCheck,
      text: "#fff",
      route: "/register/ngo",
    },
    {
      key: "donor",
      label: "Donor",
      desc: "Contribute funds to verified cases",
      bg: "#ffc107",
      Icon: DollarSign,
      text: "#222",
      route: "/register/donor",
    },
    {
      key: "service",
      label: "Service Provider",
      desc: "Provide services through vouchers",
      bg: "#e34141",
      Icon: Package,
      text: "#fff",
      route: "/register/serviceprovider",
    },
  ];

  const green = "#257a47";
  const headingColor = "#1e3928";

  // Background slideshow logic
  const slides = [
    "linear-gradient(135deg, #fcfcfb 0%, #f6f8f7 100%)",
    "linear-gradient(135deg, #f0f8ff 0%, #e6f0fa 100%)",
    "linear-gradient(135deg, #fff0f5 0%, #fde6f7 100%)",
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        background: slides[bgIndex],
        transition: "background 1.5s ease-in-out",
        padding: "40px 0",
      }}
    >
      {/* Logo and Heading */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: -60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{ backgroundColor: "#ecf5ef", width: "70px", height: "70px" }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Heart style={{ color: green }} size={40} />
        </motion.div>

        <motion.h1
          className="fw-bold mb-2"
          style={{ fontSize: "2.6rem", color: headingColor }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          HelpHive
        </motion.h1>

        <motion.p
          className="mx-auto mt-1"
          style={{ color: "#2d3b35", fontSize: "1.1rem", maxWidth: "420px" }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transparent humanitarian aid tracking platform connecting volunteers,
          NGOs, donors, and service providers
        </motion.p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="d-flex justify-content-center mt-3 mb-4 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline-success"
          style={{ width: "120px", fontWeight: 500 }}
          onClick={() => navigate("/")}
        >
          Sign In
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline-secondary" // ← Neutral outlined button
          style={{ width: "120px", fontWeight: 500 }}
          onClick={() => navigate("/register")}
        >
          Register
        </motion.button>
      </motion.div>

      {/* Role cards */}
      <h4
        className="text-center mb-4 fw-bold"
        style={{ color: headingColor, fontSize: "1.5rem" }}
      >
        Choose your role to get started
      </h4>

      <motion.div
        className="d-flex flex-wrap justify-content-center gap-3"
        style={{ rowGap: "18px", maxWidth: "950px" }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {roles.map(({ key, label, desc, bg, Icon, text, route }, index) => (
          <motion.div
            key={key}
            style={{
              background: bg,
              color: text,
              width: "210px",
              height: "210px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              cursor: "pointer",
              textAlign: "center",
              padding: "20px",
              boxSizing: "border-box",
            }}
            onClick={() => route && navigate(route)}
            whileHover={{ scale: 1.07, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Icon size={40} className="mb-3" />
            </motion.div>
            <div style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "8px" }}>
              {label}
            </div>
            <div style={{ fontWeight: 400, fontSize: "0.95rem" }}>{desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}