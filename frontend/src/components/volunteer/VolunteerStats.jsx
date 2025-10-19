import { useState, useEffect } from "react";

export function VolunteerStats() {
  const [stats, setStats] = useState({
    totalCases: 0,
    verifiedCases: 0,
    pendingCases: 0,
    completedCases: 0,
  });

  useEffect(() => {
    const cases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const newStats = {
      totalCases: cases.length,
      verifiedCases: cases.filter(
        (c) => c.status === "verified" || c.status === "funded"
      ).length,
      pendingCases: cases.filter((c) => c.status === "pending").length,
      completedCases: cases.filter((c) => c.status === "completed").length,
    };
    setStats(newStats);
  }, []);

  return (
    <div className="row g-3">
      {/* Total Cases */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Total Cases</span>
            <i className="bi bi-people-fill"></i>
          </div>
          <div className="card-body text-center">
            <h3 className="card-title">{stats.totalCases}</h3>
            <p className="text-muted small">Cases registered by you</p>
          </div>
        </div>
      </div>

      {/* Verified Cases */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Verified Cases</span>
            <i className="bi bi-check-circle-fill text-success"></i>
          </div>
          <div className="card-body text-center">
            <h3 className="card-title text-success">{stats.verifiedCases}</h3>
            <p className="text-muted small">Approved by NGOs</p>
          </div>
        </div>
      </div>

      {/* Pending Cases */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Pending Cases</span>
            <i className="bi bi-clock-fill text-warning"></i>
          </div>
          <div className="card-body text-center">
            <h3 className="card-title text-warning">{stats.pendingCases}</h3>
            <p className="text-muted small">Awaiting verification</p>
          </div>
        </div>
      </div>

      {/* Completed Cases */}
      <div className="col-12 col-md-6 col-lg-3">
        <div className="card shadow-sm h-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Completed</span>
            <i className="bi bi-bar-chart-fill text-success"></i>
          </div>
          <div className="card-body text-center">
            <h3 className="card-title text-success">{stats.completedCases}</h3>
            <p className="text-muted small">Successfully helped</p>
          </div>
        </div>
      </div>
    </div>
  );
}
