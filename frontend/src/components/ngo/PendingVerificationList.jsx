import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, AlertTriangle, MapPin, Clock, User } from "lucide-react";

export function PendingVerificationList() {
  const [pendingCases, setPendingCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [duplicateAlerts, setDuplicateAlerts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadPendingCases();
  }, []);

  const loadPendingCases = () => {
    const allCases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const pending = allCases.filter((c) => c.status === "pending");
    setPendingCases(pending);

    // Detect duplicates
    const duplicates = detectDuplicates(pending);
    setDuplicateAlerts(duplicates);
  };

  const detectDuplicates = (cases) => {
    const duplicates = [];
    for (let i = 0; i < cases.length; i++) {
      for (let j = i + 1; j < cases.length; j++) {
        const case1 = cases[i];
        const case2 = cases[j];
        if (
          case1.beneficiaryName.toLowerCase().includes(case2.beneficiaryName.toLowerCase()) ||
          case2.beneficiaryName.toLowerCase().includes(case1.beneficiaryName.toLowerCase()) ||
          case1.address.toLowerCase().includes(case2.address.toLowerCase()) ||
          case2.address.toLowerCase().includes(case1.address.toLowerCase())
        ) {
          if (!duplicates.includes(case1.id)) duplicates.push(case1.id);
          if (!duplicates.includes(case2.id)) duplicates.push(case2.id);
        }
      }
    }
    return duplicates;
  };

  const handleVerification = async (caseId, action) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const allCases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const updatedCases = allCases.map((c) => {
      if (c.id === caseId) {
        return {
          ...c,
          status: action === "verify" ? "verified" : "rejected",
          verificationNotes,
          verifiedAt: new Date().toISOString(),
          verifiedBy: JSON.parse(localStorage.getItem("user") || "{}").id,
        };
      }
      return c;
    });
    localStorage.setItem("volunteerCases", JSON.stringify(updatedCases));
    alert(`Case ${caseId} has been ${action === "verify" ? "verified" : "rejected"} successfully.`);
    setSelectedCase(null);
    setVerificationNotes("");
    loadPendingCases();
    setIsProcessing(false);
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case "critical":
        return "bg-danger text-white";
      case "high":
        return "bg-warning text-dark";
      case "medium":
        return "bg-warning-subtle text-dark";
      case "low":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  if (pendingCases.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 64, height: 64 }}>
          <CheckCircle size={32} className="text-muted" />
        </div>
        <h5 className="mb-2">No pending cases</h5>
        <p className="text-muted">All cases have been reviewed and processed.</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {duplicateAlerts.length > 0 && (
        <div className="alert alert-warning d-flex align-items-center">
          <AlertTriangle size={16} className="me-2" />
          <div>
            <strong>Duplicate Detection Alert:</strong> {duplicateAlerts.length} cases may be duplicates. Please review carefully.
          </div>
        </div>
      )}

      {pendingCases.map((caseItem) => (
        <div
          key={caseItem.id}
          className={`card mb-3 ${duplicateAlerts.includes(caseItem.id) ? "border-warning bg-warning-subtle" : ""}`}
        >
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <strong>{caseItem.id}</strong>
              <span className={`badge ${getUrgencyClass(caseItem.urgencyLevel)}`}>{caseItem.urgencyLevel}</span>
              {duplicateAlerts.includes(caseItem.id) && (
                <span className="badge bg-warning text-dark">
                  <AlertTriangle size={12} className="me-1" />
                  Potential Duplicate
                </span>
              )}
            </div>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setSelectedCase(caseItem)}>
              <Eye size={16} className="me-1" />
              Review
            </button>
          </div>
          <div className="card-body">
            <div className="d-flex flex-wrap gap-2 mb-2">
              {caseItem.assistanceType.map((type) => (
                <span key={type} className="badge bg-secondary">
                  {type}
                </span>
              ))}
            </div>
            <p className="text-truncate">{caseItem.description}</p>
            <div className="d-flex justify-content-between small text-muted mt-2">
              <span>
                <MapPin size={14} className="me-1" />
                {caseItem.address.substring(0, 50)}...
              </span>
              {caseItem.estimatedCost && <span>Est. Cost: ${caseItem.estimatedCost}</span>}
            </div>
          </div>
        </div>
      ))}

      {/* Case Review Modal */}
      {selectedCase && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <h5 className="modal-title">{selectedCase.id}</h5>
                  <span className={`badge ${getUrgencyClass(selectedCase.urgencyLevel)}`}>{selectedCase.urgencyLevel}</span>
                  {duplicateAlerts.includes(selectedCase.id) && (
                    <span className="badge bg-warning text-dark">
                      <AlertTriangle size={12} className="me-1" />
                      Potential Duplicate
                    </span>
                  )}
                </div>
                <button type="button" className="btn-close" onClick={() => setSelectedCase(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  {/* Beneficiary Details */}
                  <div className="col-md-6">
                    <h6>Beneficiary Details</h6>
                    <p><strong>Name:</strong> {selectedCase.beneficiaryName}</p>
                    <p><strong>Age:</strong> {selectedCase.age}</p>
                    <p><strong>Gender:</strong> {selectedCase.gender}</p>
                    <p><strong>Contact:</strong> {selectedCase.contactNumber || "Not provided"}</p>
                    <p><strong>Address:</strong> {selectedCase.address}</p>
                  </div>
                  {/* Case Info */}
                  <div className="col-md-6">
                    <h6>Case Information</h6>
                    <p><strong>Assistance Type:</strong> {selectedCase.assistanceType.join(", ")}</p>
                    <p><strong>Estimated Cost:</strong> ${selectedCase.estimatedCost || "Not specified"}</p>
                    <p><strong>Submitted:</strong> {new Date(selectedCase.createdAt).toLocaleString()}</p>
                    {selectedCase.location && (
                      <p>
                        <strong>GPS:</strong> Lat {selectedCase.location.lat.toFixed(6)}, Lng {selectedCase.location.lng.toFixed(6)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <h6>Description</h6>
                  <p className="p-2 bg-light rounded">{selectedCase.description}</p>
                  {selectedCase.medicalCondition && (
                    <>
                      <h6>Medical Condition</h6>
                      <p className="p-2 bg-light rounded">{selectedCase.medicalCondition}</p>
                    </>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="verificationNotes" className="form-label">Verification Notes</label>
                  <textarea
                    id="verificationNotes"
                    className="form-control"
                    rows={3}
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    placeholder="Add your verification notes..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success flex-grow-1"
                  onClick={() => handleVerification(selectedCase.id, "verify")}
                  disabled={isProcessing}
                >
                  <CheckCircle size={16} className="me-1" />
                  {isProcessing ? "Processing..." : "Verify Case"}
                </button>
                <button
                  className="btn btn-danger flex-grow-1"
                  onClick={() => handleVerification(selectedCase.id, "reject")}
                  disabled={isProcessing}
                >
                  <XCircle size={16} className="me-1" />
                  {isProcessing ? "Processing..." : "Reject Case"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
