import React, { useState } from "react";
import { PendingVerificationList } from "./PendingVerificationList";
import { SchemeManagement } from "./SchemeManagement";
import { NGOStats } from "./NGOStats";
import { CaseMonitoring } from "./CaseMonitoring";
import { Shield, LogOut, Bell, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- React Router

export default function NGODashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate(); // <-- React Router navigation

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // <-- Navigate to home page
  };

  return (
    <div
      className="min-vh-100"
      style={{ background: "linear-gradient(to bottom right, #f8f9fa, #e9ecef, #f8f9fa)" }}
    >
      {/* Header */}
      <header className="border-bottom bg-light sticky-top shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
              <Shield size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="h5 mb-0">NGO Dashboard</h1>
              <p className="mb-0 small text-muted">
                {user.organization || "Organization"} • {user.name}
              </p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
              <Bell size={16} /> Alerts
            </button>
            <button
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container py-4">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          {["overview", "verification", "schemes", "monitoring"].map((tab) => (
            <li key={tab} className="nav-item">
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Contents */}
        {activeTab === "overview" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h2 className="h5">Verification Overview</h2>
                <p className="small text-muted">Monitor and verify aid cases for transparency</p>
              </div>
              <button
                className="btn btn-outline-warning d-flex align-items-center gap-1"
                onClick={() => setActiveTab("verification")}
              >
                <AlertTriangle size={16} /> Review Pending Cases
              </button>
            </div>

            <NGOStats />

            <div className="row g-3">
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">Recent Verifications</h5>
                    <small className="text-muted">Latest case verification activities</small>
                  </div>
                  <div className="card-body">
                    {["#AID-001", "#AID-002", "#AID-003"].map((caseId, idx) => (
                      <div
                        key={caseId}
                        className="d-flex justify-content-between align-items-center p-3 mb-2 bg-light rounded"
                      >
                        <div>
                          <p className="mb-1 fw-medium">Case {caseId}</p>
                          <p className="mb-0 small text-muted">
                            {idx === 0
                              ? "Medical assistance - John Doe"
                              : idx === 1
                              ? "Food assistance - Jane Smith"
                              : "Shelter assistance - Bob Wilson"}
                          </p>
                        </div>
                        <div className="text-end">
                          <div
                            className={`small fw-medium ${
                              idx === 1 ? "text-danger" : "text-success"
                            }`}
                          >
                            {idx === 1 ? "Rejected" : "Verified"}
                          </div>
                          <div className="text-xs text-muted">{idx * 2 + 2} hours ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">Fraud Detection Alerts</h5>
                    <small className="text-muted">Potential duplicate or suspicious cases</small>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center p-3 mb-2 bg-danger bg-opacity-10 border border-danger rounded">
                      <div>
                        <p className="mb-1 fw-medium text-danger">Potential Duplicate</p>
                        <p className="mb-0 small text-danger">Cases #AID-004 & #AID-007</p>
                      </div>
                      <button className="btn btn-outline-danger btn-sm">Review</button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3 mb-2 bg-warning bg-opacity-10 border border-warning rounded">
                      <div>
                        <p className="mb-1 fw-medium text-warning">Location Mismatch</p>
                        <p className="mb-0 small text-warning">Case #AID-005</p>
                      </div>
                      <button className="btn btn-outline-warning btn-sm">Review</button>
                    </div>
                    <div className="text-center py-4 text-muted">
                      <Shield size={32} className="mb-2 opacity-50" />
                      <p className="small mb-0">All other cases look legitimate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "verification" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Pending Verification</h5>
              <small className="text-muted">Review and verify cases submitted by volunteers</small>
            </div>
            <div className="card-body">
              <PendingVerificationList />
            </div>
          </div>
        )}

        {activeTab === "schemes" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Scheme Management</h5>
              <small className="text-muted">Create and manage aid distribution schemes</small>
            </div>
            <div className="card-body">
              <SchemeManagement />
            </div>
          </div>
        )}

        {activeTab === "monitoring" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Case Monitoring</h5>
              <small className="text-muted">Monitor live cases and track progress</small>
            </div>
            <div className="card-body">
              <CaseMonitoring />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
