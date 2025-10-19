import { useState } from "react";
import { VolunteerStats } from "./VolunteerStats"; // Use your Bootstrap version
import { CaseRegistrationForm } from "./CaseRegistrationForm";
import { CaseTrackingList } from "./CaseTrackingList";

export default function VolunteerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="sticky-top bg-white shadow-sm">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
              <i className="bi bi-person-fill"></i>
            </div>
            <div>
              <h5 className="mb-0">Welcome, {user.name}</h5>
              <small className="text-muted">Volunteer Dashboard</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-bell-fill me-1"></i> Notifications
            </button>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container py-4">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
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
              className={`nav-link ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Register Case
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "tracking" ? "active" : ""}`}
              onClick={() => setActiveTab("tracking")}
            >
              My Cases
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3>Dashboard Overview</h3>
                <p className="text-muted">Track your volunteer activities and impact</p>
              </div>
              <button className="btn btn-primary" onClick={() => setActiveTab("register")}>
                <i className="bi bi-plus me-1"></i> Register New Case
              </button>
            </div>

            {/* Stats */}
            <VolunteerStats />

            {/* Recent Activity + Quick Actions */}
            <div className="row mt-4">
              {/* Recent Activity */}
              <div className="col-lg-6 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-1">Recent Activity</h5>
                    <small className="text-muted">Your latest case registrations and updates</small>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 p-2 bg-light rounded d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Case #AID-001</strong>
                        <p className="mb-0 text-muted small">Medical assistance required</p>
                      </div>
                      <span className="badge bg-success">Verified</span>
                    </div>
                    <div className="mb-3 p-2 bg-light rounded d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Case #AID-002</strong>
                        <p className="mb-0 text-muted small">Food assistance needed</p>
                      </div>
                      <span className="badge bg-warning text-dark">Pending</span>
                    </div>
                    <div className="mb-3 p-2 bg-light rounded d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Case #AID-003</strong>
                        <p className="mb-0 text-muted small">Shelter assistance</p>
                      </div>
                      <span className="badge bg-success">Funded</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="col-lg-6 mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-1">Quick Actions</h5>
                    <small className="text-muted">Common tasks and shortcuts</small>
                  </div>
                  <div className="card-body d-grid gap-2">
                    <button className="btn btn-outline-primary py-4 d-flex flex-column align-items-center" onClick={() => setActiveTab("register")}>
                      <i className="bi bi-plus mb-2"></i> New Case
                    </button>
                    <button className="btn btn-outline-secondary py-4 d-flex flex-column align-items-center" onClick={() => setActiveTab("tracking")}>
                      <i className="bi bi-bell mb-2"></i> Track Cases
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "register" && (
          <div>
            <div className="card shadow-sm">
              <div className="card-header">
                <h5>Register New Case</h5>
                <small className="text-muted">Help someone in need by registering their case</small>
              </div>
              <div className="card-body">
                <CaseRegistrationForm />
              </div>
            </div>
          </div>
        )}

        {activeTab === "tracking" && (
          <div>
            <div className="card shadow-sm">
              <div className="card-header">
                <h5>Case Tracking</h5>
                <small className="text-muted">Monitor the progress of all your registered cases</small>
              </div>
              <div className="card-body">
                <CaseTrackingList />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
