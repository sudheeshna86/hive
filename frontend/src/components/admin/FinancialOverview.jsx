import React from "react";
import { DollarSign, TrendingUp, PieChart, CreditCard, Wallet, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Badge from "react-bootstrap/Badge";

const financialData = {
  totalDonations: 1567800,
  serviceFees: 141102,
  disbursed: 1426698,
  pending: 89450,
  monthlyGrowth: 23.5,
  transactionVolume: 2847,
  averageDonation: 551,
  topDonors: [
    { name: "Rajesh Patel", amount: 45000, donations: 12 },
    { name: "Priya Sharma", amount: 38000, donations: 8 },
    { name: "Tech Corp Foundation", amount: 125000, donations: 3 },
    { name: "Anonymous Donor", amount: 67000, donations: 15 },
  ],
  categoryBreakdown: [
    { category: "Medical", amount: 567800, percentage: 36.2 },
    { category: "Food & Shelter", amount: 423400, percentage: 27.0 },
    { category: "Education", amount: 312600, percentage: 19.9 },
    { category: "Emergency Aid", amount: 264000, percentage: 16.9 },
  ],
  recentTransactions: [
    { id: 1, type: "donation", amount: 5000, donor: "Rajesh P.", case: "CASE-2024-0892", time: "2 min ago", status: "completed" },
    { id: 2, type: "disbursement", amount: 2500, provider: "City Hospital", voucher: "VOUCH-1234", time: "5 min ago", status: "completed" },
    { id: 3, type: "service_fee", amount: 450, case: "CASE-2024-0891", time: "8 min ago", status: "collected" },
    { id: 4, type: "donation", amount: 10000, donor: "Anonymous", case: "CASE-2024-0890", time: "12 min ago", status: "pending" },
  ],
};

export default function FinancialOverview() {
  return (
    <div className="container-fluid">
      {/* Financial Stats */}
      <div className="row g-3 mb-4">
        {[
          {
            title: "Total Donations",
            value: `₹${(financialData.totalDonations / 100000).toFixed(1)}L`,
            icon: DollarSign,
            color: "text-success",
            bgColor: "bg-success bg-opacity-10",
            extra: `+${financialData.monthlyGrowth}% this month`,
          },
          {
            title: "Service Fees",
            value: `₹${(financialData.serviceFees / 1000).toFixed(0)}K`,
            icon: Wallet,
            color: "text-primary",
            bgColor: "bg-primary bg-opacity-10",
            extra: "9% of donations",
          },
          {
            title: "Disbursed",
            value: `₹${(financialData.disbursed / 100000).toFixed(1)}L`,
            icon: ArrowUpRight,
            color: "text-success",
            bgColor: "bg-success bg-opacity-10",
            extra: "91% of donations",
          },
          {
            title: "Pending",
            value: `₹${(financialData.pending / 1000).toFixed(0)}K`,
            icon: Clock,
            color: "text-warning",
            bgColor: "bg-warning bg-opacity-10",
            extra: "Awaiting processing",
          },
        ].map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div key={idx} className="col-12 col-md-6 col-lg-3">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted small mb-1">{stat.title}</p>
                      <h5 className={`fw-bold ${stat.color}`}>{stat.value}</h5>
                    </div>
                    <div className={`p-2 rounded ${stat.bgColor} d-flex align-items-center justify-content-center`}>
                      <StatIcon size={20} className={stat.color} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-1 mt-2 small text-muted">
                    <TrendingUp size={14} className={stat.color} />
                    <span>{stat.extra}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Breakdown & Top Donors */}
      <div className="row g-3 mb-4">
        {/* Category Breakdown */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header d-flex align-items-center gap-2">
              <PieChart size={20} className="text-success" />
              <h6 className="mb-0 fw-bold">Donation Categories</h6>
            </div>
            <div className="card-body">
              {financialData.categoryBreakdown.map((category, idx) => (
                <div key={idx} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>{category.category}</span>
                    <small className="text-muted">
                      ₹{(category.amount / 1000).toFixed(0)}K ({category.percentage}%)
                    </small>
                  </div>
                  <ProgressBar now={category.percentage} variant="success" style={{ height: "8px" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Donors */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-header d-flex align-items-center gap-2">
              <TrendingUp size={20} className="text-success" />
              <h6 className="mb-0 fw-bold">Top Donors</h6>
            </div>
            <div className="card-body">
              {financialData.topDonors.map((donor, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center p-2 mb-2 rounded bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                      <small className="text-success fw-bold">{idx + 1}</small>
                    </div>
                    <div>
                      <p className="mb-0 fw-medium">{donor.name}</p>
                      <small className="text-muted">{donor.donations} donations</small>
                    </div>
                  </div>
                  <div className="text-end">
                    <p className="mb-0 fw-medium">₹{donor.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card shadow-sm border-0">
        <div className="card-header d-flex align-items-center gap-2">
          <CreditCard size={20} className="text-success" />
          <h6 className="mb-0 fw-bold">Recent Transactions</h6>
        </div>
        <div className="card-body">
          {financialData.recentTransactions.map((tx) => {
            const Icon = tx.type === "donation" ? ArrowDownRight : tx.type === "disbursement" ? ArrowUpRight : Wallet;
            const bgClass =
              tx.type === "donation" ? "bg-success bg-opacity-10" : tx.type === "disbursement" ? "bg-primary bg-opacity-10" : "bg-purple bg-opacity-10";
            return (
              <div key={tx.id} className="d-flex justify-content-between align-items-center p-3 mb-2 rounded bg-light">
                <div className="d-flex align-items-center gap-3">
                  <div className={`p-2 rounded ${bgClass} d-flex align-items-center justify-content-center`}>
                    <Icon size={16} className={tx.type === "donation" ? "text-success" : tx.type === "disbursement" ? "text-primary" : "text-purple"} />
                  </div>
                  <div>
                    <p className="mb-0 fw-medium">
                      {tx.type === "donation" && `Donation from ${tx.donor}`}
                      {tx.type === "disbursement" && `Payment to ${tx.provider}`}
                      {tx.type === "service_fee" && "Service Fee Collected"}
                    </p>
                    <small className="text-muted">
                      {tx.case && `Case: ${tx.case} `}
                      {tx.voucher && `Voucher: ${tx.voucher}`}
                    </small>
                  </div>
                </div>
                <div className="text-end">
                  <p className="mb-0 fw-medium">₹{tx.amount.toLocaleString()}</p>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <Badge bg={tx.status === "completed" ? "success" : tx.status === "pending" ? "warning" : "primary"}>
                      {tx.status}
                    </Badge>
                    <small className="text-muted">{tx.time}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
