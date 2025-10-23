import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, TrendingUp, Gift } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export function NGOStats() {
  const [stats, setStats] = useState({
    totalCases: 0,
    verifiedCases: 0,
    rejectedCases: 0,
    pendingCases: 0,
    vouchersIssued: 0,
  });

  useEffect(() => {
    const cases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const totalVouchers = cases.reduce((acc, c) => acc + (c.vouchersIssued || 0), 0);
    const newStats = {
      totalCases: cases.length,
      verifiedCases: cases.filter((c) => c.status === "verified").length,
      rejectedCases: cases.filter((c) => c.status === "rejected").length,
      pendingCases: cases.filter((c) => c.status === "pending").length,
      vouchersIssued: totalVouchers,
    };
    setStats(newStats);
  }, []);

  const statCards = [
    {
      title: "Total Cases",
      value: stats.totalCases,
      icon: <TrendingUp size={22} className="text-muted" />,
      color: "text-success",
      subtitle: "All submitted cases",
    },
    {
      title: "Verified",
      value: stats.verifiedCases,
      icon: <CheckCircle size={22} className="text-muted" />,
      color: "text-success",
      subtitle: "Approved cases",
    },
    {
      title: "Pending",
      value: stats.pendingCases,
      icon: <Clock size={22} className="text-warning" />,
      color: "text-warning",
      subtitle: "Awaiting review",
    },
    {
      title: "Rejected",
      value: stats.rejectedCases,
      icon: <XCircle size={22} className="text-danger" />,
      color: "text-danger",
      subtitle: "Declined cases",
    },
    {
      title: "Vouchers Issued",
      value: stats.vouchersIssued,
      icon: <Gift size={22} className="text-info" />,
      color: "text-info",
      subtitle: "Issued vouchers",
    },
  ];

  return (
    <div className="container my-3">
      <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between gap-3 overflow-auto">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="card shadow-sm border-0 flex-fill"
            style={{
              minWidth: "200px",
              borderRadius: 16,
              animation: `fadeInUp 0.4s ease ${index * 0.1}s both`,
              background: "#fff",
              minHeight: 136,
              flex: "1 1 0",
            }}
          >
            <div className="card-body d-flex flex-column justify-content-between h-100">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-semibold mb-0">{card.title}</h6>
                {card.icon}
              </div>
              <h2
                className={`fw-bold ${card.color} mb-1`}
                style={{ fontSize: "2.2rem" }}
              >
                {card.value}
              </h2>
              <p className="text-muted small mb-0">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px);}
          to   { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
