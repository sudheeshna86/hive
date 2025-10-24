"use client"

import { useState } from "react"
import { Card, Button, Badge, Tabs, Tab } from "react-bootstrap"
import {
  Users,
  Heart,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Activity,
  CheckCircle,
  Bell,
  LogOut
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import AdminStats from "./AdminStats.jsx"
import SystemOverview from "./SystemOverview.jsx"
import UserManagement from "./UserManagement.jsx"
import FraudDetection from "./FraudDetection.jsx"
import FinancialOverview from "./FinancialOverview.jsx"

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
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const navigate = useNavigate() // ✅ Correctly initialize navigate

  // Logout logic
  const handleLogout = () => {
    localStorage.removeItem("user") // clear logged-in user
    navigate("/")              // redirect to login page
  }

  return (
    <div className="min-vh-100 bg-light p-4">
      <style>{`
        .admin-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .outline-btn {
          border-radius: 6px !important;
          min-width: 120px;
          justify-content: center;
        }
      `}</style>
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3">Service Provider Dashboard</h1>
            <p className="text-muted mb-0">Healthcare Provider &bull; sudheehoney2806</p>
          </div>
          <div className="admin-actions">
            <Button variant="outline-secondary" className="outline-btn d-flex align-items-center gap-2">
              <Bell size={16} /> Notifications
            </Button>
            <Button
              variant="outline-secondary"
              className="outline-btn d-flex align-items-center gap-2"
              onClick={handleLogout} // ✅ Logout on click
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <AdminStats data={sampleData} />

        {/* Main Content */}
        <Tabs
          id="admin-dashboard-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="overview" title="System Overview">
            <SystemOverview />
          </Tab>
          <Tab eventKey="users" title="User Management">
            <UserManagement />
          </Tab>
          <Tab eventKey="fraud" title="Fraud Detection">
            <FraudDetection />
          </Tab>
          <Tab eventKey="financial" title="Financial Overview">
            <FinancialOverview />
          </Tab>
          <Tab eventKey="activity" title="Live Activity">
            <Card>
              <Card.Body>
                {sampleData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="d-flex justify-content-between align-items-center p-2 mb-2 bg-white rounded shadow-sm"
                  >
                    <div className="d-flex align-items-center gap-2">
                      {activity.type === "case_registered" && <Users size={20} className="text-primary" />}
                      {activity.type === "donation_received" && <Heart size={20} className="text-danger" />}
                      {activity.type === "case_verified" && <CheckCircle size={20} className="text-success" />}
                      {activity.type === "voucher_redeemed" && <DollarSign size={20} className="text-success" />}
                      {activity.type === "fraud_detected" && <AlertTriangle size={20} className="text-warning" />}
                      <div>
                        <p className="mb-0 fw-bold">{activity.user}</p>
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
                        <Badge bg={activity.severity === "high" ? "danger" : "secondary"} className="ms-1">
                          {activity.severity}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
