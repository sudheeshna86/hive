import { useState } from "react";
import { ProviderStats } from "./ProviderStats";
import { VoucherScanner } from "./VoucherScanner";
import { AssignedVouchers } from "./AssignedVouchers";
import { ServiceHistory } from "./ServiceHistory";
import { FaQrcode, FaBell, FaStethoscope, FaSignOutAlt } from "react-icons/fa";

export default function ServiceProviderDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
              <FaStethoscope size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="mb-0">Service Provider Dashboard</h4>
              <small className="text-muted">
                {user.organization || "Healthcare Provider"} • {user.name}
              </small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
              <FaBell /> Notifications
            </button>
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container py-4">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "scanner" ? "active" : ""}`}
              onClick={() => setActiveTab("scanner")}
            >
              Scan Voucher
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "vouchers" ? "active" : ""}`}
              onClick={() => setActiveTab("vouchers")}
            >
              My Vouchers
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Service History
            </button>
          </li>
        </ul>

        {/* Tab Contents */}
        {activeTab === "overview" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              <div>
                <h5>Service Overview</h5>
                <small className="text-muted">Manage vouchers and track your service delivery</small>
              </div>
              <button className="btn btn-primary d-flex align-items-center gap-2 mt-2 mt-sm-0" onClick={() => setActiveTab("scanner")}>
                <FaQrcode /> Scan Voucher
              </button>
            </div>

            <ProviderStats />

            <div className="row g-3 mt-3">
              {/* Recent Voucher Activity */}
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h6 className="mb-1">Recent Voucher Activity</h6>
                    <small className="text-muted">Latest voucher redemptions and services</small>
                  </div>
                  <div className="card-body">
                    {/* Example items */}
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex justify-content-between align-items-center rounded mb-2 bg-light">
                        <div>
                          <p className="mb-0 fw-medium">Voucher #VCH-001</p>
                          <small className="text-muted">Medical consultation - John Doe</small>
                        </div>
                        <div className="text-end">
                          <span className="text-success fw-medium">Completed</span>
                          <br />
                          <small className="text-muted">2 hours ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center rounded mb-2 bg-light">
                        <div>
                          <p className="mb-0 fw-medium">Voucher #VCH-002</p>
                          <small className="text-muted">Prescription medication - Jane Smith</small>
                        </div>
                        <div className="text-end">
                          <span className="text-primary fw-medium">In Progress</span>
                          <br />
                          <small className="text-muted">1 hour ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center rounded bg-light">
                        <div>
                          <p className="mb-0 fw-medium">Voucher #VCH-003</p>
                          <small className="text-muted">Emergency treatment - Bob Wilson</small>
                        </div>
                        <div className="text-end">
                          <span className="text-success fw-medium">Completed</span>
                          <br />
                          <small className="text-muted">4 hours ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Vouchers */}
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h6 className="mb-1">Pending Vouchers</h6>
                    <small className="text-muted">Vouchers assigned to you awaiting service</small>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      <div className="list-group-item d-flex justify-content-between align-items-center rounded mb-2 bg-info bg-opacity-10 border border-info">
                        <div>
                          <p className="mb-0 fw-medium text-info">Voucher #VCH-004</p>
                          <small className="text-info">Dental checkup - Alice Johnson</small>
                        </div>
                        <button className="btn btn-outline-info btn-sm">View</button>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center rounded mb-2 bg-warning bg-opacity-10 border border-warning">
                        <div>
                          <p className="mb-0 fw-medium text-warning">Voucher #VCH-005</p>
                          <small className="text-warning">Physical therapy - Mike Davis</small>
                        </div>
                        <button className="btn btn-outline-warning btn-sm">View</button>
                      </div>
                      <div className="text-center py-4 text-muted">
                        <FaQrcode size={32} className="opacity-50 mb-2" />
                        <p className="mb-0 small">Scan voucher QR codes to start service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "scanner" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h6 className="mb-1">Voucher Scanner</h6>
              <small className="text-muted">Scan voucher QR codes to redeem and provide services</small>
            </div>
            <div className="card-body">
              <VoucherScanner />
            </div>
          </div>
        )}

        {activeTab === "vouchers" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h6 className="mb-1">Assigned Vouchers</h6>
              <small className="text-muted">Vouchers assigned to your service provider account</small>
            </div>
            <div className="card-body">
              <AssignedVouchers />
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h6 className="mb-1">Service History</h6>
              <small className="text-muted">Track all completed services and payments</small>
            </div>
            <div className="card-body">
              <ServiceHistory />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
