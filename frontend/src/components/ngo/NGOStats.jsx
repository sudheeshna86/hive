import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";

export function NGOStats() {
  const [stats, setStats] = useState({
    totalCases: 0,
    verifiedCases: 0,
    rejectedCases: 0,
    pendingCases: 0,
  });

  useEffect(() => {
    const cases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const newStats = {
      totalCases: cases.length,
      verifiedCases: cases.filter((c) => c.status === "verified").length,
      rejectedCases: cases.filter((c) => c.status === "rejected").length,
      pendingCases: cases.filter((c) => c.status === "pending").length,
    };
    setStats(newStats);
  }, []);

  const statCards = [
    {
      title: "Total Cases",
      value: stats.totalCases,
      icon: <TrendingUp size={16} className="text-muted" />,
      text: "All submitted cases",
      color: "text-primary",
      delay: "0s",
    },
    {
      title: "Verified",
      value: stats.verifiedCases,
      icon: <CheckCircle size={16} className="text-muted" />,
      text: "Approved cases",
      color: "text-success",
      delay: "0.1s",
    },
    {
      title: "Pending",
      value: stats.pendingCases,
      icon: <Clock size={16} className="text-muted" />,
      text: "Awaiting review",
      color: "text-warning",
      delay: "0.2s",
    },
    {
      title: "Rejected",
      value: stats.rejectedCases,
      icon: <XCircle size={16} className="text-muted" />,
      text: "Declined cases",
      color: "text-danger",
      delay: "0.3s",
    },
  ];

  return (
    <div className="row g-3">
      {statCards.map((card) => (
        <div key={card.title} className="col-12 col-md-6 col-lg-3" style={{ animation: `slide-in-right 0.5s ease ${card.delay} forwards`, opacity: 0 }}>
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center pb-2">
              <h6 className="mb-0">{card.title}</h6>
              {card.icon}
            </div>
            <div className="card-body">
              <div className={`fs-3 fw-bold ${card.color}`}>{card.value}</div>
              <p className="small text-muted mb-0">{card.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
