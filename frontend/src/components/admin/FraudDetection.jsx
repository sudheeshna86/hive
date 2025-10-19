import React from "react";
import { AlertTriangle, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";

const fraudAlerts = [
  {
    id: 1,
    type: "duplicate_case",
    severity: "high",
    description: "Potential duplicate case detected - same person, different location",
    case1: "CASE-2024-0891",
    case2: "CASE-2024-0892",
    similarity: 95,
    volunteer1: "Sarah J.",
    volunteer2: "Mike R.",
    location1: "Mumbai Central",
    location2: "Mumbai Bandra",
    timestamp: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    type: "suspicious_donation",
    severity: "medium",
    description: "Large donation from new account with limited verification",
    amount: 50000,
    donor: "Anonymous Donor",
    accountAge: "2 days",
    timestamp: "4 hours ago",
    status: "investigating",
  },
  {
    id: 3,
    type: "voucher_fraud",
    severity: "high",
    description: "Voucher used multiple times at different locations",
    voucherId: "VOUCH-2024-1234",
    serviceProvider1: "City Hospital",
    serviceProvider2: "Metro Clinic",
    timestamp: "6 hours ago",
    status: "resolved",
  },
  {
    id: 4,
    type: "fake_verification",
    severity: "medium",
    description: "NGO verification pattern suggests automated approval",
    ngo: "QuickHelp NGO",
    verificationRate: "98%",
    avgTime: "30 seconds",
    timestamp: "1 day ago",
    status: "monitoring",
  },
];

const fraudStats = {
  totalAlerts: 47,
  resolvedAlerts: 44,
  pendingAlerts: 3,
  falsePositives: 12,
  accuracyRate: 89.5,
};

// Helper functions
const getSeverityVariant = (severity) => {
  switch (severity) {
    case "high": return "danger";
    case "medium": return "warning";
    case "low": return "secondary";
    default: return "light";
  }
};

const getStatusVariant = (status) => {
  switch (status) {
    case "resolved": return "success";
    case "pending": return "danger";
    case "investigating": return "primary";
    case "monitoring": return "info";
    default: return "secondary";
  }
};

export default function FraudDetection() {
  return (
    <div className="container-fluid">
      {/* Fraud Stats */}
      <div className="row g-3 mb-4 text-center">
        {[
          { label: "Total Alerts", value: fraudStats.totalAlerts, color: "text-danger" },
          { label: "Resolved", value: fraudStats.resolvedAlerts, color: "text-success" },
          { label: "Pending", value: fraudStats.pendingAlerts, color: "text-warning" },
          { label: "False Positives", value: fraudStats.falsePositives, color: "text-primary" },
          { label: "Accuracy Rate", value: `${fraudStats.accuracyRate}%`, color: "text-success" },
        ].map((stat, idx) => (
          <div key={idx} className="col-12 col-md-2">
            <div className="card shadow-sm h-100 border-0 p-3">
              <h4 className={`fw-bold ${stat.color}`}>{stat.value}</h4>
              <small className="text-muted">{stat.label}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Fraud Alerts */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header d-flex align-items-center gap-2">
          <AlertTriangle size={20} className="text-danger" />
          <h6 className="mb-0 fw-bold">Fraud Detection Alerts</h6>
        </div>
        <div className="card-body">
          {fraudAlerts.map((alert) => (
            <div key={alert.id} className={`border rounded mb-4 p-3 bg-light`}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="d-flex align-items-center gap-3">
                  <AlertTriangle size={20} />
                  <div>
                    <h6 className="fw-medium">{alert.type.replace("_", " ").toUpperCase()}</h6>
                    <small className="text-muted">{alert.description}</small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Badge bg={getSeverityVariant(alert.severity)}>{alert.severity}</Badge>
                  <Badge bg={getStatusVariant(alert.status)}>{alert.status}</Badge>
                </div>
              </div>

              {/* Alert Details */}
              <div className="row bg-white p-3 rounded mb-3">
                {alert.type === "duplicate_case" && (
                  <>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Case 1:</strong> {alert.case1}</p>
                      <small className="text-muted d-block">Volunteer: {alert.volunteer1}</small>
                      <small className="text-muted d-block">Location: {alert.location1}</small>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Case 2:</strong> {alert.case2}</p>
                      <small className="text-muted d-block">Volunteer: {alert.volunteer2}</small>
                      <small className="text-muted d-block">Location: {alert.location2}</small>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="d-flex align-items-center gap-2">
                        <span>Similarity Score:</span>
                        <ProgressBar now={alert.similarity} className="flex-grow-1" label={`${alert.similarity}%`} />
                      </div>
                    </div>
                  </>
                )}

                {alert.type === "suspicious_donation" && (
                  <>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Amount:</strong> ₹{alert.amount?.toLocaleString()}</p>
                      <small className="text-muted d-block">Donor: {alert.donor}</small>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Account Age:</strong> {alert.accountAge}</p>
                      <small className="text-muted d-block">Risk Level: High</small>
                    </div>
                  </>
                )}

                {alert.type === "voucher_fraud" && (
                  <>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Voucher:</strong> {alert.voucherId}</p>
                      <small className="text-muted d-block">Provider 1: {alert.serviceProvider1}</small>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Duplicate Usage</strong></p>
                      <small className="text-muted d-block">Provider 2: {alert.serviceProvider2}</small>
                    </div>
                  </>
                )}

                {alert.type === "fake_verification" && (
                  <>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>NGO:</strong> {alert.ngo}</p>
                      <small className="text-muted d-block">Verification Rate: {alert.verificationRate}</small>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>Avg Time:</strong> {alert.avgTime}</p>
                      <small className="text-muted d-block">Pattern: Suspicious</small>
                    </div>
                  </>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2 text-muted">
                  <Clock size={16} /> {alert.timestamp}
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" size="sm">
                    <Eye size={16} className="me-1" /> Investigate
                  </Button>
                  {alert.status === "pending" && (
                    <>
                      <Button variant="outline-success" size="sm">
                        <CheckCircle size={16} className="me-1" /> Resolve
                      </Button>
                      <Button variant="outline-danger" size="sm">
                        <XCircle size={16} className="me-1" /> Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
