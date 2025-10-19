import React, { useState } from "react";
import { Users, Heart, TrendingUp, AlertTriangle, DollarSign, Activity, CheckCircle } from "lucide-react";
import AdminStats from "./AdminStats";
import SystemOverview from "./SystemOverview";
import UserManagement from "./UserManagement";
import FraudDetection from "./FraudDetection";
import FinancialOverview from "./FinancialOverview";

// Sample data for admin dashboard
const sampleData = {
  totalUsers: 1247,
  totalCases: 892,
  totalDonations: 156780,
  activeVouchers: 234,
  pendingVerifications: 23,
  fraudAlerts: 3,
  systemHealth: 98.5,
  recentActivity: [
    { id: 1, type: "case_registered", user: "Volunteer Sarah", time: "2 minutes ago", location: "Mumbai Central" },
    { id: 2, type: "donation_received", user: "Donor Rajesh", amount: 5000, time: "5 minutes ago" },
    { id: 3, type: "case_verified", user: "NGO HelpIndia", time: "8 minutes ago", caseId: "CASE-2024-0892" },
    { id: 4, type: "voucher_redeemed", user: "Hospital ABC", time: "12 minutes ago", amount: 2500 },
    { id: 5, type: "fraud_detected", user: "System Alert", time: "15 minutes ago", severity: "medium" },
  ],
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-light min-vh-100 p-4">
      <div className="container-fluid">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h1 className="h3 text-dark">Admin Dashboard</h1>
            <p className="text-muted mb-0">Complete system oversight and management</p>
          </div>
          <div className="d-flex gap-2 flex-wrap mt-2 mt-md-0">
            <span className="badge bg-success d-flex align-items-center gap-1">
              <Activity size={16} />
              System Healthy
            </span>
            <button className="btn btn-outline-primary d-flex align-items-center gap-1">
              <TrendingUp size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <AdminStats data={sampleData} />

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              System Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              User Management
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "fraud" ? "active" : ""}`}
              onClick={() => setActiveTab("fraud")}
            >
              Fraud Detection
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "financial" ? "active" : ""}`}
              onClick={() => setActiveTab("financial")}
            >
              Financial Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              Live Activity
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" && <SystemOverview />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "fraud" && <FraudDetection />}
          {activeTab === "financial" && <FinancialOverview />}
          {activeTab === "activity" && (
            <div className="card shadow-sm">
              <div className="card-header d-flex align-items-center gap-2">
                <Activity size={20} className="text-success" />
                Live System Activity
              </div>
              <div className="card-body">
                {sampleData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="d-flex justify-content-between align-items-start p-3 mb-2 bg-white rounded shadow-sm"
                  >
                    <div className="d-flex align-items-center gap-3">
                      {activity.type === "case_registered" && <Users size={20} className="text-primary" />}
                      {activity.type === "donation_received" && <Heart size={20} className="text-danger" />}
                      {activity.type === "case_verified" && <CheckCircle size={20} className="text-success" />}
                      {activity.type === "voucher_redeemed" && <DollarSign size={20} className="text-success" />}
                      {activity.type === "fraud_detected" && <AlertTriangle size={20} className="text-warning" />}
                      <div>
                        <p className="mb-0 fw-medium">{activity.user}</p>
                        <small className="text-muted">
                          {activity.type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          {activity.amount && ` - ₹${activity.amount.toLocaleString()}`}
                          {activity.location && ` at ${activity.location}`}
                        </small>
                      </div>
                    </div>
                    <div className="text-end">
                      <small className="text-muted">{activity.time}</small>
                      {activity.severity && (
                        <span
                          className={`badge ms-1 ${
                            activity.severity === "high" ? "bg-danger" : "bg-secondary"
                          }`}
                        >
                          {activity.severity}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
