import { useState, useEffect } from "react";
import { FaCheckCircle, FaDollarSign, FaClock, FaChartLine } from "react-icons/fa";

export function ProviderStats() {
  const [stats, setStats] = useState({
    totalServices: 0,
    completedServices: 0,
    pendingVouchers: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    const mockStats = {
      totalServices: 15,
      completedServices: 12,
      pendingVouchers: 3,
      totalEarnings: 2250,
    };
    setStats(mockStats);
  }, []);

  const cardClass = "card text-center shadow-sm animate__animated animate__fadeInRight";

  return (
    <div className="row g-3">
      <div className="col-12 col-md-6 col-lg-3">
        <div className={cardClass} style={{ animationDelay: "0s" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <small className="fw-medium">Total Services</small>
            <FaChartLine />
          </div>
          <div className="card-body">
            <h2 className="card-title text-primary">{stats.totalServices}</h2>
            <p className="text-muted small mb-0">Services provided</p>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className={cardClass} style={{ animationDelay: "0.1s" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <small className="fw-medium">Completed</small>
            <FaCheckCircle />
          </div>
          <div className="card-body">
            <h2 className="card-title text-success">{stats.completedServices}</h2>
            <p className="text-muted small mb-0">Successfully completed</p>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className={cardClass} style={{ animationDelay: "0.2s" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <small className="fw-medium">Pending</small>
            <FaClock />
          </div>
          <div className="card-body">
            <h2 className="card-title text-warning">{stats.pendingVouchers}</h2>
            <p className="text-muted small mb-0">Awaiting service</p>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-3">
        <div className={cardClass} style={{ animationDelay: "0.3s" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <small className="fw-medium">Total Earnings</small>
            <FaDollarSign />
          </div>
          <div className="card-body">
            <h2 className="card-title text-success">${stats.totalEarnings.toLocaleString()}</h2>
            <p className="text-muted small mb-0">Service fees earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
