import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "../components/auth/LoginForm";

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);

  const green = "#257a47";
  const lightBg = "linear-gradient(135deg,#fcfcfb 0%,#f6f8f7 100%)";
  const borderColor = "#dbe6e0";
  const headingColor = "#363d38";
  const BUTTON_BAR_WIDTH = 410;

  const slides = [
    "Transparent humanitarian aid tracking platform connecting volunteers, NGOs, donors, and service providers",
    "Sign in and start making a difference in your community today",
    "Join a platform where every action counts and every contribution matters",
  ];

  useEffect(() => {
    const interval = setInterval(() => setSlideIndex((prev) => (prev + 1) % slides.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ background: lightBg }}>
      <div className="container text-center py-5">
        <motion.div className="mb-4" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}>
          <motion.div
            className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ backgroundColor: "#ecf5ef", border: `1.5px solid ${borderColor}`, width: "70px", height: "70px" }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <Heart style={{ color: green }} size={40} />
          </motion.div>

          <motion.h1 className="fw-bold mb-2" style={{ fontSize: "2.8rem", color: headingColor }}>
            HelpHive
          </motion.h1>

          <AnimatePresence exitBeforeEnter>
            <motion.p
              key={slideIndex}
              className="mx-auto mt-1"
              style={{ color: "#2d3b35", fontSize: "1.12rem", maxWidth: "420px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {slides[slideIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <div className="mx-auto" style={{ width: BUTTON_BAR_WIDTH + "px" }}>
          {/* Optional: You can include login form on home if needed */}
          {/* <LoginForm /> */}
        </div>
      </div>
    </div>
  );
}
