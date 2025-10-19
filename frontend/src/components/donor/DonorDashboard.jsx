import React, { useState } from "react";
import { FiHeart, FiLogOut, FiBell } from "react-icons/fi"; // Correct icon imports
import VerifiedCasesList from "./VerifiedCasesList";
import DonationHistory from "./DonationHistory";
import DonorStats from "./DonorStats";
import ImpactStories from "./ImpactStories";

export default function DonorDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // simple redirect
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background:
          "linear-gradient(to bottom right, #f8f9fa, #e9ecef, #f8f9fa)",
      }}
    >
      {/* Header */}
      <header className="border-bottom bg-light sticky-top shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
              <FiHeart size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="h5 mb-0">Donor Dashboard</h1>
              <p className="mb-0 small text-muted">Welcome back, {user.name}</p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
              <FiBell /> Updates
            </button>
            <button
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
              onClick={handleLogout}
            >
              <FiLogOut /> Logout
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
              className={`nav-link ${activeTab === "cases" ? "active" : ""}`}
              onClick={() => setActiveTab("cases")}
            >
              Browse Cases
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              My Donations
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "impact" ? "active" : ""}`}
              onClick={() => setActiveTab("impact")}
            >
              Impact Stories
            </button>
          </li>
        </ul>

        {/* Tab Contents */}
        {activeTab === "overview" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h5">Your Impact Dashboard</h2>
                <p className="text-muted">
                  Track your donations and see the difference you're making
                </p>
              </div>
              <button
                className="btn btn-primary d-flex align-items-center gap-1"
                onClick={() => setActiveTab("cases")}
              >
                <FiHeart /> Donate Now
              </button>
            </div>

            <DonorStats />

            <div className="row g-3 mt-4">
              {/* Recent Donations */}
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">Recent Donations</h5>
                    <small className="text-muted">
                      Your latest contributions
                    </small>
                  </div>
                  <div className="card-body">
                    {[
                      { caseId: "#AID-001", amount: "$250", time: "2 days ago", desc: "Medical assistance - John Doe" },
                      { caseId: "#AID-003", amount: "$100", time: "1 week ago", desc: "Food assistance - Jane Smith" },
                      { caseId: "#AID-005", amount: "$500", time: "2 weeks ago", desc: "Shelter assistance - Bob Wilson" }
                    ].map((donation) => (
                      <div
                        key={donation.caseId}
                        className="mb-3 p-3 bg-light rounded d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <p className="mb-0 fw-medium">{donation.caseId}</p>
                          <small className="text-muted">{donation.desc}</small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-primary">{donation.amount}</div>
                          <small className="text-muted">{donation.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact Summary */}
              <div className="col-lg-6">
                <div className="card shadow-sm">
                  <div className="card-header">
                    <h5 className="mb-0">Impact Summary</h5>
                    <small className="text-muted">
                      Lives you've helped change
                    </small>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 p-3 bg-success bg-opacity-10 border border-success rounded d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-0 fw-medium text-success">Cases Completed</p>
                        <small className="text-success">Successfully helped</small>
                      </div>
                      <div className="fw-bold text-success fs-4">12</div>
                    </div>
                    <div className="mb-3 p-3 bg-primary bg-opacity-10 border border-primary rounded d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-0 fw-medium text-primary">People Helped</p>
                        <small className="text-primary">Direct beneficiaries</small>
                      </div>
                      <div className="fw-bold text-primary fs-4">18</div>
                    </div>
                    <div className="mb-3 p-3 bg-purple bg-opacity-10 border border-purple rounded d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-0 fw-medium text-purple">Communities Reached</p>
                        <small className="text-purple">Areas impacted</small>
                      </div>
                      <div className="fw-bold text-purple fs-4">5</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cases" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Verified Cases</h5>
              <small className="text-muted">
                Browse and donate to verified cases that need your help
              </small>
            </div>
            <div className="card-body">
              <VerifiedCasesList />
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Donation History</h5>
              <small className="text-muted">
                Track all your donations and their impact
              </small>
            </div>
            <div className="card-body">
              <DonationHistory />
            </div>
          </div>
        )}

        {activeTab === "impact" && (
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Impact Stories</h5>
              <small className="text-muted">
                See how your donations have made a difference
              </small>
            </div>
            <div className="card-body">
              <ImpactStories />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
