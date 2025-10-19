import React from "react";
import { Users, Heart, Building2, UserCheck, TrendingUp, AlertTriangle, DollarSign, Activity } from "lucide-react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function AdminStats({ data }) {
  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary bg-opacity-10",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Active Cases",
      value: data.totalCases.toLocaleString(),
      icon: Heart,
      color: "text-danger",
      bgColor: "bg-danger bg-opacity-10",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Donations",
      value: `₹${(data.totalDonations / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success bg-opacity-10",
      change: "+23%",
      changeType: "positive",
    },
    {
      title: "Active Vouchers",
      value: data.activeVouchers.toLocaleString(),
      icon: UserCheck,
      color: "text-success",
      bgColor: "bg-success bg-opacity-10",
      change: "+5%",
      changeType: "positive",
    },
    {
      title: "Pending Verifications",
      value: data.pendingVerifications.toLocaleString(),
      icon: Building2,
      color: "text-warning",
      bgColor: "bg-warning bg-opacity-10",
      change: "-3%",
      changeType: "negative",
    },
    {
      title: "Fraud Alerts",
      value: data.fraudAlerts.toLocaleString(),
      icon: AlertTriangle,
      color: "text-danger",
      bgColor: "bg-danger bg-opacity-10",
      change: "-15%",
      changeType: "positive",
    },
    {
      title: "System Health",
      value: `${data.systemHealth}%`,
      icon: Activity,
      color: "text-success",
      bgColor: "bg-success bg-opacity-10",
      change: "+0.2%",
      changeType: "positive",
    },
  ];

  return (
    <div className="row g-3">
      {stats.map((stat, index) => {
        const StatIcon = stat.icon;
        return (
          <div key={index} className="col-12 col-md-6 col-lg-3 col-xl-1">
            <div className="card h-100 shadow-sm border-0 hover-shadow">
              <div className="card-header d-flex justify-content-between align-items-center bg-white border-0">
                <h6 className="mb-0 text-secondary">{stat.title}</h6>
                <div className={`p-2 rounded ${stat.bgColor} d-flex align-items-center justify-content-center`}>
                  <StatIcon size={20} className={stat.color} />
                </div>
              </div>
              <div className="card-body">
                <div className="h4 fw-bold text-dark">{stat.value}</div>
                <div className="d-flex align-items-center gap-1 mt-1">
                  <TrendingUp
                    size={14}
                    className={stat.changeType === "positive" ? "text-success" : "text-danger"}
                  />
                  <small className={stat.changeType === "positive" ? "text-success" : "text-danger"}>
                    {stat.change} from last month
                  </small>
                </div>
                {stat.title === "System Health" && (
                  <ProgressBar
                    now={data.systemHealth}
                    className="mt-2"
                    style={{ height: "8px" }}
                    variant="success"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
