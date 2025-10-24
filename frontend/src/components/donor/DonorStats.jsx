import React, { useState, useEffect } from "react";
import { Heart, Users, TrendingUp, Award } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

export default function DonorStats() {
  const [stats, setStats] = useState({
    totalDonated: 0,
    casesSupported: 0,
    peopleHelped: 0,
    impactScore: 0,
  });

  useEffect(() => {
    const donations = JSON.parse(localStorage.getItem("userDonations") || "[]");
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const casesSupported = donations.length;
    const peopleHelped = casesSupported + Math.floor(casesSupported * 0.3);
    const impactScore = Math.min(
      casesSupported * 10 + Math.floor(totalAmount / 100),
      100
    );

    setStats({
      totalDonated: totalAmount,
      casesSupported,
      peopleHelped,
      impactScore,
    });
  }, []);

  return (
    <div className="row g-4">
      {/* Total Donated */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm border-0 h-100 animate__animated animate__fadeInRight">
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pb-2">
            <h6 className="text-muted mb-0">Total Donated</h6>
            <Heart size={18} className="text-secondary" />
          </div>
          <div className="card-body pt-0">
            <h3 className="fw-bold text-primary">
              ${stats.totalDonated.toLocaleString()}
            </h3>
            <p className="text-muted small mb-0">
              Your generous contributions
            </p>
          </div>
        </div>
      </div>

      {/* Cases Supported */}
      <div className="col-12 col-md-6 col-lg-3">
        <div
          className="card shadow-sm border-0 h-100 animate__animated animate__fadeInRight"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pb-2">
            <h6 className="text-muted mb-0">Cases Supported</h6>
            <TrendingUp size={18} className="text-secondary" />
          </div>
          <div className="card-body pt-0">
            <h3 className="fw-bold text-primary">{stats.casesSupported}</h3>
            <p className="text-muted small mb-0">Individual cases helped</p>
          </div>
        </div>
      </div>

      {/* People Helped */}
      <div className="col-12 col-md-6 col-lg-3">
        <div
          className="card shadow-sm border-0 h-100 animate__animated animate__fadeInRight"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pb-2">
            <h6 className="text-muted mb-0">People Helped</h6>
            <Users size={18} className="text-secondary" />
          </div>
          <div className="card-body pt-0">
            <h3 className="fw-bold text-success">{stats.peopleHelped}</h3>
            <p className="text-muted small mb-0">Lives directly impacted</p>
          </div>
        </div>
      </div>

      {/* Impact Score */}
      <div className="col-12 col-md-6 col-lg-3">
        <div
          className="card shadow-sm border-0 h-100 animate__animated animate__fadeInRight"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center pb-2">
            <h6 className="text-muted mb-0">Impact Score</h6>
            <Award size={18} className="text-secondary" />
          </div>
          <div className="card-body pt-0">
            <h3 className="fw-bold text-info">{stats.impactScore}/100</h3>
            <p className="text-muted small mb-0">Community impact rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
