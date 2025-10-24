import { useState } from "react";
import { ProviderStats } from "./ProviderStats";
import { VoucherScanner } from "./VoucherScanner";
import { AssignedVouchers } from "./AssignedVouchers";
import { ServiceHistory } from "./ServiceHistory";
import { FaQrcode, FaBell, FaStethoscope, FaSignOutAlt } from "react-icons/fa";
import "./ServiceProviderDashoboard.css"
import { useNavigate } from "react-router-dom";
export default function ServiceProviderDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate=useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear stored user
    navigate("/");               // Redirect to login page
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#fafbfc" }}>
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-success bg-opacity-10 p-2 rounded-circle">
              <FaStethoscope size={24} className="text-success" />
            </div>
            <div>
              <h5 className="mb-0 text-dark fw-bold">Service Provider Dashboard</h5>
              <small className="text-muted">
                {user.organization || "Healthcare Provider"} · {user.name}
              </small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
              <FaBell /> Notifications
            </button>
            <button
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container py-4">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-4 border-0">
          {[
            { key: "overview", label: "Overview" },
            { key: "scanner", label: "Scan Voucher" },
            { key: "vouchers", label: "My Vouchers" },
            { key: "history", label: "Service History" },
          ].map((tab) => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link px-4 rounded-top-3 ${activeTab === tab.key ? "active bg-white text-dark fw-bold border-bottom-0 shadow-sm" : "text-secondary bg-transparent"}`}
                onClick={() => setActiveTab(tab.key)}
                style={{ border: "1px solid #f3f4f6", borderBottom: "none", marginRight: "2px" }}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Overview Stats */}
        {activeTab === "overview" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              <div>
                <h5 className="fw-bold mb-1">Service Overview</h5>
                <small className="text-muted">
                  Manage vouchers and track your service delivery
                </small>
              </div>
              <button
                className="btn btn-success d-flex align-items-center gap-2"
                onClick={() => setActiveTab("scanner")}
              >
                <FaQrcode /> Scan Voucher
              </button>
            </div>

            {/* Stats Grid */}
            <div className="row g-3">
              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-body text-center">
                    <div className="fs-3 fw-bold text-success">15</div>
                    <small className="text-muted">Services provided</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-body text-center">
                    <div className="fs-3 fw-bold text-primary">12</div>
                    <small className="text-muted">Successfully completed</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-body text-center">
                    <div className="fs-3 fw-bold text-warning">3</div>
                    <small className="text-muted">Awaiting service</small>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-body text-center">
                    <div className="fs-3 fw-bold text-success">$2,250</div>
                    <small className="text-muted">Service fees earned</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3 mt-3">
              {/* Recent Voucher Activity */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-header bg-white border-bottom-0">
                    <div>
                      <h6 className="mb-1 fw-bold">Recent Voucher Activity</h6>
                      <small className="text-muted">Latest voucher redemptions and services</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      {[
                        { id: "VCH-001", service: "Medical consultation", user: "John Doe", status: "Completed", time: "2 hours ago" },
                        { id: "VCH-002", service: "Prescription medication", user: "Jane Smith", status: "In Progress", time: "1 hour ago" },
                        { id: "VCH-003", service: "Emergency treatment", user: "Bob Wilson", status: "Completed", time: "4 hours ago" }
                      ].map((v) => (
                        <div key={v.id}
                          className="list-group-item d-flex justify-content-between align-items-center rounded mb-2 bg-light shadow-sm"
                          style={{ border: "none" }}>
                          <div>
                            <p className="mb-0 fw-medium">{`Voucher #${v.id}`}</p>
                            <small className="text-muted">{v.service} - {v.user}</small>
                          </div>
                          <div className="text-end">
                            <span className={`fw-medium ${v.status === "Completed" ? "text-success" : "text-primary"}`}>
                              {v.status}
                            </span>
                            <br />
                            <small className="text-muted">{v.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Vouchers */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm rounded h-100">
                  <div className="card-header bg-white border-bottom-0">
                    <div>
                      <h6 className="mb-1 fw-bold">Pending Vouchers</h6>
                      <small className="text-muted">Vouchers assigned to you awaiting service</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush mb-3">
                      {[{
                        id: "VCH-004", service: "Dental checkup", user: "Alice Johnson", variant: "primary"
                      }, {
                        id: "VCH-005", service: "Physical therapy", user: "Mike Davis", variant: "warning"
                      }].map((v) => (
                        <div key={v.id}
                          className={`list-group-item d-flex justify-content-between align-items-center rounded mb-2 border-1 border-${v.variant} bg-${v.variant} bg-opacity-10`}
                          style={{ borderStyle: "solid" }}>
                          <div>
                            <p className={`mb-0 fw-medium ${v.variant === "warning" ? "text-dark" : `text-${v.variant}`}`}>{`Voucher #${v.id}`}</p>
                            <small className={`${v.variant === "warning" ? "text-dark" : `text-${v.variant}`}`}>{v.service} - {v.user}</small>
                          </div>
                          <button className={`btn btn-outline-${v.variant} btn-sm`}>View</button>
                        </div>
                      ))}
                      <div className="text-center py-4 text-muted">
                        <FaQrcode size={32} className="opacity-70 mb-2" />
                        <p className="mb-0 small">Scan voucher QR codes to start service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Scanner Tab */}
        {activeTab === "scanner" && (
          <div className="card border-0 shadow-sm rounded">
            <div className="card-header bg-white border-bottom-0">
              <h6 className="mb-1 fw-bold">Voucher Scanner</h6>
              <small className="text-muted">Scan voucher QR codes to redeem and provide services</small>
            </div>
            <div className="card-body">
              <VoucherScanner />
            </div>
          </div>
        )}

        {/* Assigned Vouchers Tab */}
        {activeTab === "vouchers" && (
          <div className="card border-0 shadow-sm rounded">
            <div className="card-header bg-white border-bottom-0">
              <h6 className="mb-1 fw-bold">Assigned Vouchers</h6>
              <small className="text-muted">Vouchers assigned to your service provider account</small>
            </div>
            <div className="card-body">
              <AssignedVouchers />
            </div>
          </div>
        )}

        {/* Service History Tab */}
        {activeTab === "history" && (
          <div className="card border-0 shadow-sm rounded">
            <div className="card-header bg-white border-bottom-0">
              <h6 className="mb-1 fw-bold">Service History</h6>
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
