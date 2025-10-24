import React from "react"
import { Row, Col, Card, ProgressBar } from "react-bootstrap"
import { Users, Heart, DollarSign, UserCheck, Building2, AlertTriangle, Activity } from "lucide-react"

export default function AdminStats({ data }) {
  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers.toLocaleString(),
      icon: <Users size={18} className="text-blue-400" />,
      change: "+12% from last month",
      changeType: "positive",
    },
    {
      title: "Active Cases",
      value: data.totalCases.toLocaleString(),
      icon: <Heart size={18} className="text-red-400" />,
      change: "+8% from last month",
      changeType: "positive",
    },
    {
      title: "Total Donations",
      value: `₹${(data.totalDonations / 1000).toFixed(0)}K`,
      icon: <DollarSign size={18} className="text-green-400" />,
      change: "+23% from last month",
      changeType: "positive",
    },
    {
      title: "Active Vouchers",
      value: data.activeVouchers.toLocaleString(),
      icon: <UserCheck size={18} className="text-emerald-400" />,
      change: "+5% from last month",
      changeType: "positive",
    },
    {
      title: "Pending Verifications",
      value: data.pendingVerifications.toLocaleString(),
      icon: <Building2 size={18} className="text-orange-400" />,
      change: "-3% from last month",
      changeType: "negative",
    },
    {
      title: "Fraud Alerts",
      value: data.fraudAlerts.toLocaleString(),
      icon: <AlertTriangle size={18} className="text-red-500" />,
      change: "-15% from last month",
      changeType: "positive",
    },
    {
      title: "System Health",
      value: `${data.systemHealth}%`,
      icon: <Activity size={18} className="text-green-400" />,
      change: "+0.2% from last month",
      changeType: "positive",
      isProgress: true,
    },
  ]

  return (
    <Row className="g-3">
      {stats.map((stat, idx) => (
        <Col key={idx}>
          <Card className="p-3 shadow-sm h-100 border-0">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted small">{stat.title}</span>
              {stat.icon}
            </div>
            <h4 className="fw-bold">{stat.value}</h4>
            <small
              className={`${
                stat.changeType === "positive" ? "text-success" : "text-danger"
              }`}
            >
              {stat.change}
            </small>
            {stat.isProgress && (
              <ProgressBar
                now={data.systemHealth}
                variant="success"
                className="mt-2"
                style={{ height: "6px", borderRadius: "4px" }}
              />
            )}
          </Card>
        </Col>
      ))}
    </Row>
  )
}
