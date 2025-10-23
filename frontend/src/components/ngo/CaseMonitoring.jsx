import React, { useState } from "react";
import { Eye, MapPin, Calendar, User, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Button, Badge } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

// Sample VOLUNTEER cases (simulate all volunteers pooled)
const myCases = [
  {
    id: "CASE-001",
    status: "COMPLETED",
    voiceTranscript:
      "Man aged approximately 45, appears to have respiratory issues, no place to stay.",
    photoUrl: "https://placehold.co/80x80?text=Patient",
    location: { address: "Central Delhi Bus Station, New Delhi" },
    needs: ["medical", "shelter"],
    fundingGoal: 5000,
    currentFunding: 5000,
    registeredBy: "Priya Sharma",
    contact: "+91 9876543210",
    timeline: [
      {
        step: "Case registered",
        description: "Submitted with photo and voice recording",
        date: "2025-09-01",
        actor: "Priya Sharma (Volunteer)",
      },
      {
        step: "Verified",
        description: "Verified by NGO staff",
        date: "2025-09-02",
        actor: "Dr. Michael Chen (NGO)",
      },
      {
        step: "Funding goal reached",
        description: "Funding achieved through donations",
        date: "2025-09-05",
        actor: "Raj Patel & 4 others",
        amount: "₹5,000",
      },
      {
        step: "Service delivered",
        description: "Medical treatment provided",
        date: "2025-09-07",
        actor: "Dr. Anjali Gupta",
        proof: true,
        proofUrl: "https://placehold.co/600x400?text=Treatment+Proof",
      },
    ],
  },
  {
    id: "CASE-002",
    status: "FUNDED",
    voiceTranscript:
      "Elderly woman, approximately 65 years old, seems malnourished. Needs immediate food and shelter.",
    photoUrl: "https://placehold.co/80x80?text=Patient",
    location: { address: "Lodhi Gardens, New Delhi" },
    needs: ["food", "shelter"],
    fundingGoal: 3500,
    currentFunding: 3500,
    registeredBy: "Rahul Verma",
    contact: "+91 9123456780",
    timeline: [
      {
        step: "Case registered",
        description: "Submitted with details",
        date: "2025-09-03",
        actor: "Volunteer",
      },
      {
        step: "Verified",
        description: "NGO verified details",
        date: "2025-09-04",
        actor: "NGO Staff",
      },
      {
        step: "Funded",
        description: "Funding goal reached",
        date: "2025-09-06",
        amount: "₹3,500",
        actor: "3 Donors",
      },
    ],
  },
  {
    id: "CASE-003",
    status: "VERIFIED",
    voiceTranscript:
      "Young mother with 2 children lost home in floods. Needs urgent help.",
    photoUrl: "https://placehold.co/80x80?text=Patient",
    location: { address: "Noida Sector 62 Relief Camp" },
    needs: ["food", "shelter", "medical"],
    fundingGoal: 8000,
    currentFunding: 2400,
    registeredBy: "Anita Singh",
    contact: "+91 9988776655",
    timeline: [
      {
        step: "Case registered",
        description: "Submitted by volunteer",
        date: "2025-09-05",
        actor: "Volunteer",
      },
      {
        step: "Verified",
        description: "NGO verified details",
        date: "2025-09-06",
        actor: "NGO Staff",
      },
    ],
  },
];

const tabMap = [
  { key: "all", label: "All" },
  { key: "PENDING", label: "Pending Verifications" },
  { key: "VERIFIED", label: "Verified Cases" },
  { key: "FUNDED", label: "In Progress" },
  { key: "COMPLETED", label: "Completed" },
];

const statusBadge = {
  PENDING: "bg-primary",
  VERIFIED: "bg-info text-dark",
  FUNDED: "bg-warning text-dark",
  COMPLETED: "bg-success text-white",
};

const statusLabel = {
  PENDING: "Pending",
  VERIFIED: "Verified",
  FUNDED: "In Progress",
  COMPLETED: "Completed",
};

export  function CaseMonitoring() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);
  const [filters, setFilters] = useState({ location: "", volunteer: "", date: "", status: "" });
  const [comment, setComment] = useState("");
  const [showTracking, setShowTracking] = useState(false);

  const filteredCases = myCases.filter(
    (c) =>
      (activeTab === "all" || c.status === activeTab) &&
      (!filters.location || c.location.address.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.volunteer ||
        (c.registeredBy && c.registeredBy.toLowerCase().includes(filters.volunteer.toLowerCase()))) &&
      (!filters.date || c.timeline?.[0]?.date === filters.date) &&
      (!filters.status || c.status === filters.status)
  );

  const handleAction = (type) => {
    alert(`${type === "approve" ? "Approved" : "Rejected"} case with comment: "${comment}"`);
    setComment("");
  };

  const getStepBadge = (index, total) => {
    if (index === 0) return "bg-primary";
    if (index === total - 1) return "bg-success";
    return "bg-secondary";
  };

  return (
    <div className="container py-4">
      <div className="mb-3 rounded-4 bg-white px-4 py-3 border">
        <h5 className="fw-bold mb-1">Case Monitoring</h5>
        <span className="text-muted">Monitor live cases and track progress.</span>
      </div>

      <div className="px-1 px-sm-3">
        {/* Tabs */}
        <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
          {tabMap.map((tab) => (
            <button
              key={tab.key}
              className={`btn ${
                activeTab === tab.key
                  ? "btn-success text-white fw-semibold shadow-sm"
                  : "btn-outline-success"
              } rounded-pill px-3`}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedCase(null);
                setShowTracking(false);
              }}
              style={{ minWidth: 150 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="row mb-3 g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Filter by location"
              value={filters.location}
              onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Filter by volunteer"
              value={filters.volunteer}
              onChange={(e) => setFilters((f) => ({ ...f, volunteer: e.target.value }))}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={filters.date}
              onChange={(e) => setFilters((f) => ({ ...f, date: e.target.value }))}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="VERIFIED">Verified</option>
              <option value="FUNDED">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="row g-4">
          {/* CASE LIST */}
          <div className="col-md-5">
            <div style={{ minHeight: 560 }}>
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  className={`card shadow-sm mb-3 border-0 cursor-pointer ${
                    selectedCase?.id === c.id ? "border border-success border-2" : ""
                  }`}
                  style={{ borderRadius: "1rem" }}
                  onClick={() => {
                    setSelectedCase(c);
                    setShowTracking(false);
                  }}
                >
                  <div className="card-body d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold mb-0">{c.id}</h6>
                      <span
                        className={`badge ${statusBadge[c.status] || "bg-secondary"}`}
                        style={{ fontSize: 14, padding: "7px 18px" }}
                      >
                        {statusLabel[c.status]}
                      </span>
                    </div>
                    <div className="text-muted small d-flex align-items-center gap-2">
                      <Calendar size={15} />
                      <span>{c.timeline?.[0]?.date}</span>
                      <MapPin size={15} />
                      <span>{c.location.address}</span>
                    </div>
                    <div className="small text-muted d-flex align-items-center">
                      <User size={15} className="me-1" /> {c.registeredBy}
                    </div>
                  </div>
                </div>
              ))}
              {filteredCases.length === 0 && (
                <div className="text-center text-muted p-5 border rounded-4 mt-4">
                  <Eye size={44} className="mb-3" />
                  <div>No cases found</div>
                </div>
              )}
            </div>
          </div>

          {/* CASE DETAILS */}
          <div className="col-md-7">
            <div
              className="card h-100 shadow-sm border-0"
              style={{ borderRadius: "1.1rem", minHeight: 560 }}
            >
              {!selectedCase ? (
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                  <Eye size={44} className="mb-2 text-success" />
                  <div className="text-muted">Select a case to view details</div>
                </div>
              ) : showTracking ? (
                // ✅ NEW Tracking Timeline UI
                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">
                      Tracking Timeline: {selectedCase.id}
                    </h5>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setShowTracking(false)}
                    >
                      <ArrowLeft size={16} className="me-1" /> Back
                    </Button>
                  </div>

                  <div className="timeline-container position-relative ps-3">
                    <AnimatePresence>
                      {selectedCase.timeline.map((tl, index) => (
                        <motion.div
                          key={index}
                          className="mb-4 position-relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Timeline connector */}
                          {index < selectedCase.timeline.length - 1 && (
                            <div
                              className="position-absolute"
                              style={{
                                left: 10,
                                top: "40px",
                                height: "100%",
                                width: "2px",
                                backgroundColor: "#ccc",
                              }}
                            ></div>
                          )}

                          <div className="d-flex align-items-start gap-3">
                            <div
                              className={`rounded-circle d-flex align-items-center justify-content-center text-white ${getStepBadge(
                                index,
                                selectedCase.timeline.length
                              )}`}
                              style={{ width: 32, height: 32 }}
                            >
                              {index + 1}
                            </div>
                            <div className="flex-grow-1 bg-light rounded-3 p-3 shadow-sm">
                              <h6 className="fw-semibold mb-1">{tl.step}</h6>
                              <p className="text-muted small mb-1">{tl.description}</p>
                              <div className="d-flex flex-wrap gap-2 small text-muted">
                                <span>
                                  <Calendar size={13} className="me-1" />
                                  {tl.date}
                                </span>
                                <span>
                                  <User size={13} className="me-1" />
                                  {tl.actor}
                                </span>
                                {tl.amount && (
                                  <Badge bg="success">Amount: {tl.amount}</Badge>
                                )}
                                {tl.proof && (
                                  <a
                                    href={tl.proofUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-decoration-none small"
                                  >
                                    <Badge bg="info">View Proof</Badge>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                // Normal case detail view
                <div className="p-4">
                  <h5 className="fw-bold mb-2">{selectedCase.id}</h5>
                  <div className="d-flex align-items-center mb-2 gap-2 small">
                    <span className={`badge ${statusBadge[selectedCase.status] || "bg-secondary"}`}>
                      {statusLabel[selectedCase.status]}
                    </span>
                    <span>
                      <Calendar size={14} className="me-1" />
                      {selectedCase.timeline?.[0]?.date}
                    </span>
                    <span>
                      <MapPin size={14} className="me-1" />
                      {selectedCase.location.address}
                    </span>
                  </div>
                  <img
                    src={selectedCase.photoUrl}
                    alt="Case"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "3px solid #82d09d",
                    }}
                    className="mb-2"
                  />
                  <div className="mb-2">
                    <strong>Registered By:</strong> {selectedCase.registeredBy}
                  </div>
                  <div className="mb-2">
                    <strong>Contact:</strong> {selectedCase.contact}
                  </div>
                  <div className="mb-3">
                    <strong>Voice Transcript:</strong>{" "}
                    <span className="text-muted">{selectedCase.voiceTranscript}</span>
                  </div>
                  <div className="mb-2">
                    <strong>Needs:</strong> {selectedCase.needs.join(", ")}
                  </div>
                  <div className="mb-3">
                    <strong>Funding:</strong> {selectedCase.currentFunding} /{" "}
                    {selectedCase.fundingGoal}
                  </div>
                  <Button
                    variant="outline-success"
                    className="mb-3"
                    onClick={() => setShowTracking(true)}
                  >
                    <Eye className="me-2" /> View Tracking
                  </Button>

                  {(selectedCase.status === "PENDING" ||
                    selectedCase.status === "VERIFIED") && (
                    <div className="mt-3">
                      <textarea
                        className="form-control mb-2"
                        placeholder="Add approval/rejection comment (optional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <div className="d-flex gap-2">
                        <Button variant="success" onClick={() => handleAction("approve")}>
                          <CheckCircle className="me-1" size={17} /> Approve
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleAction("reject")}>
                          <XCircle className="me-1" size={17} /> Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
