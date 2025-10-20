import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function VolunteerStats() {
  const [stats, setStats] = useState({
    totalCases: 0,
    verifiedCases: 0,
    fundedCases: 0,
    vouchersIssued: 0,
    servicesDelivered: 0,
    beneficiariesHelped: 0,
  });

  useEffect(() => {
    const cases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const newStats = {
      totalCases: cases.length,
      verifiedCases: cases.filter(
        (c) => c.status === "verified" || c.status === "funded"
      ).length,
      fundedCases: cases.filter((c) => c.status === "funded").length,
      vouchersIssued: cases.filter((c) =>
        c.timeline && c.timeline.some(t => (t.step && t.step.toLowerCase().includes("voucher")))
      ).length,
      servicesDelivered: cases.filter((c) => c.status === "completed").length,
      beneficiariesHelped: cases.length, // Adjust if you have beneficiaries per case
    };
    setStats(newStats);
  }, []);

  const cardData = [
    {
      title: "Total Cases",
      value: stats.totalCases,
      text: "Cases registered by you",
      icon: "bi-people-fill",
      color: "primary",
    },
    {
      title: "Verified Cases",
      value: stats.verifiedCases,
      text: "Approved by NGOs",
      icon: "bi-check-circle-fill",
      color: "success",
    },
    {
      title: "Funded Cases",
      value: stats.fundedCases,
      text: "Funding achieved",
      icon: "bi-currency-rupee",
      color: "success",
    },
    {
      title: "Vouchers Issued",
      value: stats.vouchersIssued,
      text: "Voucher distributed",
      icon: "bi-ticket-perforated-fill",
      color: "warning",
    },
    {
      title: "Services Delivered",
      value: stats.servicesDelivered,
      text: "Successfully helped",
      icon: "bi-graph-up",
      color: "info",
    },
    {
      title: "Beneficiaries Helped",
      value: stats.beneficiariesHelped,
      text: "People impacted",
      icon: "bi-person-hearts",
      color: "success",
    },
  ];

  return (
    <div className="row g-3">
      {cardData.map((card, idx) => (
        <motion.div
          key={idx}
          className="col-12 col-md-6 col-lg-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.15, duration: 0.5 }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 5px 20px rgba(0,0,0,0.15)",
            }}
            className={`card border-${card.color} h-100 shadow-sm`}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="card-title">{card.title}</h6>
                <h2 className={`fw-bold text-${card.color}`}>{card.value}</h2>
                <p className="text-muted small mb-0">{card.text}</p>
              </div>
              <i className={`bi ${card.icon} fs-2 text-${card.color}`}></i>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
