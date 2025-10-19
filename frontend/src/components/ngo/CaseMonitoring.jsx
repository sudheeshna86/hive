import React, { useState, useEffect } from "react";
import { Eye, MapPin, Clock, DollarSign, User } from "lucide-react";

export function CaseMonitoring() {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = () => {
    const allCases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const activeCases = allCases.filter((c) => c.status !== "pending");
    setCases(activeCases);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "bg-primary text-white";
      case "funded":
        return "bg-success text-white";
      case "in-progress":
        return "bg-warning text-dark";
      case "completed":
        return "bg-success text-white";
      case "rejected":
        return "bg-danger text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical":
        return "bg-danger text-white";
      case "high":
        return "bg-warning text-dark";
      case "medium":
        return "bg-info text-dark";
      case "low":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case "verified":
        return 40;
      case "funded":
        return 60;
      case "in-progress":
        return 80;
      case "completed":
        return 100;
      case "rejected":
        return 0;
      default:
        return 0;
    }
  };

  const filteredCases = cases.filter((caseItem) => {
    if (filter === "all") return true;
    return caseItem.status === filter;
  });

  if (cases.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 64, height: 64 }}>
          <Eye size={32} className="text-secondary" />
        </div>
        <h5>No active cases</h5>
        <p className="text-secondary">Cases will appear here once they are verified.</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {/* Filter Buttons */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {["all", "verified", "funded", "in-progress", "completed"].map((status) => (
          <button
            key={status}
            className={`btn btn-${filter === status ? "primary" : "outline-primary"} btn-sm`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({cases.filter((c) => status === "all" ? true : c.status === status).length})
          </button>
        ))}
      </div>

      {/* Cases List */}
      <div className="row g-3">
        {filteredCases.map((caseItem) => (
          <div key={caseItem.id} className="col-12">
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h5 className="mb-0">{caseItem.id}</h5>
                  <span className={`badge ${getUrgencyColor(caseItem.urgencyLevel)}`}>{caseItem.urgencyLevel}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge ${getStatusColor(caseItem.status)} text-capitalize`}>{caseItem.status}</span>
                  <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => setSelectedCase(caseItem)}>
                    <Eye size={16} /> View
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-3 mb-2 text-muted small">
                  <span className="d-flex align-items-center gap-1"><User size={14} /> {caseItem.beneficiaryName}</span>
                  <span className="d-flex align-items-center gap-1"><Clock size={14} /> {new Date(caseItem.createdAt).toLocaleDateString()}</span>
                  <span className="d-flex align-items-center gap-1"><MapPin size={14} /> {caseItem.address.substring(0, 30)}...</span>
                </div>
                <div className="mb-2 d-flex flex-wrap gap-1">
                  {caseItem.assistanceType.map((type) => (
                    <span key={type} className="badge bg-secondary">{type}</span>
                  ))}
                </div>
                <p className="text-truncate">{caseItem.description}</p>
                <div className="d-flex justify-content-between small mb-1">
                  <span>Progress</span>
                  <span>{getProgressPercentage(caseItem.status)}%</span>
                </div>
                <div className="progress mb-2" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${getProgressPercentage(caseItem.status)}%` }}
                    aria-valuenow={getProgressPercentage(caseItem.status)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                {caseItem.estimatedCost && (
                  <div className="d-flex align-items-center gap-1 small">
                    <DollarSign size={14} /> Est. Cost: ${caseItem.estimatedCost}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCase.id}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedCase(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <small className="text-muted">Beneficiary</small>
                    <p>{selectedCase.beneficiaryName}</p>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Status</small>
                    <span className={`badge ${getStatusColor(selectedCase.status)} text-capitalize`}>{selectedCase.status}</span>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Urgency</small>
                    <span className={`badge ${getUrgencyColor(selectedCase.urgencyLevel)}`}>{selectedCase.urgencyLevel}</span>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted">Assistance Type</small>
                    <p>{selectedCase.assistanceType.join(", ")}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Description</small>
                  <p>{selectedCase.description}</p>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Address</small>
                  <p>{selectedCase.address}</p>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <small className="text-muted">Created Date</small>
                    <p>{new Date(selectedCase.createdAt).toLocaleDateString()}</p>
                  </div>
                  {selectedCase.verifiedAt && (
                    <div className="col-md-6">
                      <small className="text-muted">Verified Date</small>
                      <p>{new Date(selectedCase.verifiedAt).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                {selectedCase.estimatedCost && (
                  <div className="mb-2">
                    <small className="text-muted">Estimated Cost</small>
                    <p>${selectedCase.estimatedCost}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
