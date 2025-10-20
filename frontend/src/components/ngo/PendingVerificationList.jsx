import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, AlertTriangle, MapPin, Clock, User } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export function PendingVerificationList() {
  const [pendingCases, setPendingCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [duplicateAlerts, setDuplicateAlerts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Dummy data
  const dummyCases = [
    {
      id: "CASE-001",
      beneficiaryName: "John Doe",
      age: "45",
      gender: "male",
      contactNumber: "1234567890",
      address: "123 Main Street, Cityville",
      urgencyLevel: "critical",
      assistanceType: ["Medical", "Food"],
      description: "Severe health condition, requires immediate assistance.",
      medicalCondition: "Diabetes",
      estimatedCost: "500",
      status: "pending",
      createdAt: new Date().toISOString(),
      volunteerId: "VOL-001",
      location: { lat: 12.9716, lng: 77.5946 },
    },
    {
      id: "CASE-002",
      beneficiaryName: "Jane Smith",
      age: "30",
      gender: "female",
      contactNumber: "9876543210",
      address: "456 Elm Street, Townsville",
      urgencyLevel: "high",
      assistanceType: ["Shelter"],
      description: "Family lost their home in recent flood.",
      medicalCondition: "",
      estimatedCost: "1200",
      status: "pending",
      createdAt: new Date().toISOString(),
      volunteerId: "VOL-002",
    },
    {
      id: "CASE-003",
      beneficiaryName: "Ali Khan",
      age: "60",
      gender: "male",
      contactNumber: "1122334455",
      address: "789 Oak Avenue, Villageville",
      urgencyLevel: "medium",
      assistanceType: ["Food"],
      description: "Needs regular food assistance.",
      medicalCondition: "Hypertension",
      estimatedCost: "200",
      status: "pending",
      createdAt: new Date().toISOString(),
      volunteerId: "VOL-003",
    },
  ];

  useEffect(() => {
    loadPendingCases();
  }, []);

  const loadPendingCases = () => {
    const storedCases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    if (storedCases.length === 0) {
      setPendingCases(dummyCases);
    } else {
      const pending = storedCases.filter((c) => c.status === "pending");
      setPendingCases(pending);
    }

    const duplicates = detectDuplicates(dummyCases);
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
          case1.address.toLowerCase().includes(case2.address.toLowerCase())
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
    await new Promise((resolve) => setTimeout(resolve, 800));

    const updatedCases = pendingCases.map((c) => {
      if (c.id === caseId)
        return { ...c, status: action === "verify" ? "verified" : "rejected", verificationNotes };
      return c;
    });

    setPendingCases(updatedCases.filter((c) => c.status === "pending"));
    alert(`Case ${caseId} has been ${action === "verify" ? "verified" : "rejected"}.`);
    setSelectedCase(null);
    setVerificationNotes("");
    setIsProcessing(false);
  };

  const getUrgencyClass = (level) => {
    switch (level) {
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

  if (pendingCases.length === 0) {
    return (
      <div className="text-center py-5">
        <CheckCircle size={48} className="text-muted mb-2" />
        <h5>No Pending Cases</h5>
        <p className="text-muted">All cases have been reviewed and processed.</p>
      </div>
    );
  }

  return (
    <div className="container py-3">
      {duplicateAlerts.length > 0 && (
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <AlertTriangle className="me-2" /> {duplicateAlerts.length} potential duplicate cases found.
        </div>
      )}

      <div className="row g-3">
        {pendingCases.map((c) => (
          <div className="col-12" key={c.id}>
            <div
              className={`card shadow-sm border-0 ${
                duplicateAlerts.includes(c.id) ? "border-warning border-2" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold mb-1">{c.id}</h6>
                    <span className={`badge ${getUrgencyClass(c.urgencyLevel)} me-2`}>
                      {c.urgencyLevel}
                    </span>
                    {duplicateAlerts.includes(c.id) && (
                      <span className="badge bg-warning text-dark">
                        <AlertTriangle size={12} className="me-1" /> Duplicate
                      </span>
                    )}
                  </div>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => setSelectedCase(c)}>
                    <Eye size={14} className="me-1" /> Review
                  </button>
                </div>

                <div className="mt-2 text-muted small">
                  <User size={14} className="me-1" /> {c.beneficiaryName} ({c.age}y, {c.gender}) |{" "}
                  <Clock size={14} className="me-1 ms-2" />{" "}
                  {new Date(c.createdAt).toLocaleDateString()}
                </div>

                <div className="mt-2">
                  {c.assistanceType.map((type) => (
                    <span key={type} className="badge bg-secondary me-1">
                      {type}
                    </span>
                  ))}
                </div>

                <p className="mt-2 small text-muted">{c.description}</p>

                <div className="d-flex justify-content-between align-items-center small text-muted">
                  <span>
                    <MapPin size={14} className="me-1" />
                    {c.address.substring(0, 50)}...
                  </span>
                  <span className="fw-semibold text-dark">Est. Cost: ${c.estimatedCost}</span>
                </div>

                <div className="mt-3 d-flex gap-2">
                  <button
                    className="btn btn-success w-50"
                    disabled={isProcessing}
                    onClick={() => handleVerification(c.id, "verify")}
                  >
                    <CheckCircle size={16} className="me-1" />
                    {isProcessing ? "Processing..." : "Accept"}
                  </button>
                  <button
                    className="btn btn-danger w-50"
                    disabled={isProcessing}
                    onClick={() => handleVerification(c.id, "reject")}
                  >
                    <XCircle size={16} className="me-1" />
                    {isProcessing ? "Processing..." : "Reject"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Review */}
      {selectedCase && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCase.id} — Case Review</h5>
                <button className="btn-close" onClick={() => setSelectedCase(null)}></button>
              </div>
              <div className="modal-body">
                <h6>Beneficiary Details</h6>
                <p>
                  <strong>Name:</strong> {selectedCase.beneficiaryName} <br />
                  <strong>Age:</strong> {selectedCase.age} | <strong>Gender:</strong>{" "}
                  {selectedCase.gender} <br />
                  <strong>Contact:</strong> {selectedCase.contactNumber}
                </p>
                <h6>Case Information</h6>
                <p>
                  <strong>Address:</strong> {selectedCase.address} <br />
                  <strong>Assistance:</strong> {selectedCase.assistanceType.join(", ")} <br />
                  <strong>Estimated Cost:</strong> ${selectedCase.estimatedCost}
                </p>
                <p>
                  <strong>Description:</strong> {selectedCase.description}
                </p>
                {selectedCase.medicalCondition && (
                  <p>
                    <strong>Medical Condition:</strong> {selectedCase.medicalCondition}
                  </p>
                )}
                <div className="mb-3">
                  <label className="form-label">Verification Notes</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    placeholder="Add your verification notes here..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => handleVerification(selectedCase.id, "verify")}
                  disabled={isProcessing}
                >
                  <CheckCircle size={16} className="me-1" /> Verify
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleVerification(selectedCase.id, "reject")}
                  disabled={isProcessing}
                >
                  <XCircle size={16} className="me-1" /> Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
