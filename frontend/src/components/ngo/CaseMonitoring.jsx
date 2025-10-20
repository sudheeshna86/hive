import React, { useState, useEffect } from "react";
import { Eye, Calendar, MapPin } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export function CaseMonitoring() {
  const [cases, setCases] = useState([]);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [filter, setFilter] = useState("all");

  const dummyCases = [
    {
      id: "CASE-001",
      title: "Medical Assistance for John",
      location: "Mumbai, India",
      status: "in-progress",
      createdAt: "2025-09-01T10:00:00Z",
      timeline: [
        {
          step: "Case registered",
          description: "Volunteer submitted case details",
          date: "2025-09-01",
          actor: "Priya Sharma",
        },
        {
          step: "Verification",
          description: "Case verified by admin",
          date: "2025-09-02",
          actor: "System",
        },
        {
          step: "Funds Allocated",
          description: "$500 allocated",
          date: "2025-09-03",
          actor: "NGO",
        },
        {
          step: "Service Delivered",
          description: "Medical treatment provided",
          date: "2025-09-05",
          actor: "Dr. Anjali Gupta",
          proof: true,
        },
      ],
    },
    {
      id: "CASE-002",
      title: "Food Relief for Elderly",
      location: "Delhi, India",
      status: "pending",
      createdAt: "2025-09-05T12:00:00Z",
      timeline: [
        {
          step: "Case registered",
          description: "Food aid case submitted",
          date: "2025-09-05",
          actor: "Rahul Verma",
        },
      ],
    },
    {
      id: "CASE-003",
      title: "Shelter Support for Flood Victims",
      location: "Chennai, India",
      status: "completed",
      createdAt: "2025-09-03T09:30:00Z",
      timeline: [
        {
          step: "Case registered",
          description: "Flood relief case added",
          date: "2025-09-03",
          actor: "Anita Kumar",
        },
        {
          step: "Verification",
          description: "Verified successfully",
          date: "2025-09-04",
          actor: "System",
        },
        {
          step: "Completed",
          description: "Shelter provided",
          date: "2025-09-06",
          actor: "NGO",
        },
      ],
    },
  ];

  useEffect(() => {
    setCases(dummyCases);
  }, []);

  const filteredCases =
    filter === "all" ? cases : cases.filter((c) => c.status === filter);

  const selectedCase = cases.find((c) => c.id === selectedCaseId);

  const getBadgeClass = (status) => {
    switch (status) {
      case "in-progress":
        return "bg-warning text-dark";
      case "completed":
        return "bg-success text-white";
      case "pending":
        return "bg-primary text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Case Monitoring</h4>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {["all", "pending", "in-progress", "completed"].map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${
                filter === tab ? "active" : ""
              } text-capitalize`}
              onClick={() => setFilter(tab)}
            >
              {tab.replace("-", " ")}
            </button>
          </li>
        ))}
      </ul>

      <div className="row g-4">
        {/* Case List */}
        <div className="col-md-6">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              className={`card shadow-sm mb-3 border ${
                selectedCaseId === c.id ? "border-success" : "border-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedCaseId(c.id)}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0">{c.title}</h6>
                  <span className={`badge ${getBadgeClass(c.status)}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-muted mb-1">
                  <Calendar size={14} className="me-1" />
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
                <p className="text-muted mb-0">
                  <MapPin size={14} className="me-1" />
                  {c.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="col-md-6">
          {selectedCase ? (
            <div className="card shadow-sm">
              <div className="card-header fw-semibold">
                Case Timeline - {selectedCase.title}
              </div>
              <div className="card-body">
                {selectedCase.timeline && selectedCase.timeline.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {selectedCase.timeline.map((item, idx) => (
                      <li key={idx} className="list-group-item">
                        <div className="fw-semibold">
                          {idx + 1}. {item.step}
                        </div>
                        <small className="text-muted d-block mb-1">
                          {item.date}
                        </small>
                        <p className="mb-1">{item.description}</p>
                        {item.actor && (
                          <small className="text-muted d-block">
                            By: {item.actor}
                          </small>
                        )}
                        {item.amount && (
                          <span className="text-success fw-bold d-block">
                            {item.amount}
                          </span>
                        )}
                        {item.proof && (
                          <button className="btn btn-outline-primary btn-sm mt-2">
                            View Proof
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-muted py-5">
                    <Eye size={32} className="opacity-50 mb-2" />
                    <p>No timeline available for this case</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card shadow-sm">
              <div className="card-body text-center text-muted py-5">
                <Eye size={32} className="opacity-50 mb-2" />
                <p>Select a case to view timeline</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
