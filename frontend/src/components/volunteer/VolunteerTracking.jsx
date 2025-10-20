import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import CaseDetail from "./CaseDetailsModal";

const statusLabels = {
  VERIFIED: { text: "Verified", color: "success" },
  PENDING: { text: "Pending", color: "warning" },
  "IN PROGRESS": { text: "In Progress", color: "success" },
  COMPLETED: { text: "Completed", color: "success" },
  FUNDED: { text: "Funded", color: "success" },
};

const statusTabs = [
  { label: "Total Cases", filter: () => true },
  { label: "Verified", filter: (c) => c.status === "VERIFIED" },
  { label: "Funded", filter: (c) => c.status === "FUNDED" },
  { label: "Vouchers Issued", filter: (c) => c.timeline?.some(t => t.step?.toLowerCase().includes("voucher")) },
  { label: "Services Delivered", filter: (c) => c.status === "COMPLETED" },
];

export default function VolunteerTracking({ myCases }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const selectedCaseData = myCases.find((c) => c.id === selectedCase);

  // Filter by status tab and search
  const filteredCases = myCases
    .filter(statusTabs[tab].filter)
    .filter(
      (c) =>
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        (c.voiceTranscript && c.voiceTranscript.toLowerCase().includes(search.toLowerCase())) ||
        (c.needs && c.needs.some((need) => need.toLowerCase().includes(search.toLowerCase())))
    );

  // Card grid if no case selected
  if (!selectedCaseData) {
    return (
      <div className="container-fluid px-3" style={{ background: "#f5fef8", minHeight: "100vh" }}>
        {/* Tabs */}
        <div className="mb-3 d-flex align-items-center flex-wrap gap-2">
          <div className="nav nav-pills me-3">
            {statusTabs.map((t, idx) => (
              <button
                key={t.label}
                className={`nav-link ${tab === idx ? "active bg-success text-white" : "bg-white text-success border border-success"}`}
                style={{ borderRadius: "20px", marginRight: 9, fontWeight: 600 }}
                onClick={() => setTab(idx)}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* Search bar */}
          <div className="ms-auto">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search size={17} className="text-success" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                style={{ maxWidth: 240, borderRadius: "20px" }}
                placeholder="Search cases..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="row g-4">
          {filteredCases.map((case_) => (
            <div key={case_.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 position-relative" style={{ borderRadius: 14, background: "#fff" }}>
                <div className="p-3 pb-0">
                  <div className="d-flex justify-content-between align-items-start">
                    <span className="small text-secondary d-block pb-1" style={{ fontWeight: 500, letterSpacing: 1 }}>{case_.id.replace("_", "-")}</span>
                    <span
                      className={`badge px-3 py-1 rounded-pill bg-${
                        case_.status === "VERIFIED" ? "success" :
                        case_.status === "PENDING" ? "warning text-dark" :
                        case_.status === "IN PROGRESS" ? "success" :
                        case_.status === "COMPLETED" ? "success" :
                        case_.status === "FUNDED" ? "success" : "secondary"
                      }`}
                      style={{ fontSize: 13, fontWeight: 600 }}
                    >
                      {statusLabels[case_.status]?.text || case_.status}
                    </span>
                  </div>
                  <div className="fw-semibold mb-1">{case_.fullName || case_.name}</div>
                </div>
                <img
                  src={case_.photoUrl}
                  alt="Patient"
                  className="w-100 rounded mb-2"
                  style={{
                    objectFit: "cover",
                    height: "160px",
                    background: "#e5e7eb",
                  }}
                />
                <div className="px-3 pb-2">
                  {/* Info row */}
                  <div className="d-flex align-items-center small mb-2 text-secondary" style={{ gap: 12 }}>
                    <span>
                      <i className="bi bi-person me-1" />{case_.age || case_.voiceTranscript?.match(/\d{1,3}/)?.[0] || "--"}
                      {case_.gender && `, ${case_.gender.charAt(0).toUpperCase()+case_.gender.slice(1)}`}
                    </span>
                    <span>
                      <i className="bi bi-geo-alt me-1" />{case_?.location?.address}
                    </span>
                  </div>
                  {/* Date */}
                  <div className="mb-2 text-muted" style={{ fontSize: 13 }}>
                    <i className="bi bi-calendar" />{" "}
                    {case_.timeline?.[0]?.date || "--"}
                  </div>
                  {/* Brief and Needs */}
                  <div style={{ fontSize: 14 }} className="mb-2 text-dark">
                    {case_.voiceTranscript}
                  </div>
                  {/* Tags */}
                  <div className="mb-2 d-flex flex-wrap gap-2">
                    {case_.needs?.map((need) => (
                      <span key={need} className="badge rounded-pill bg-success-subtle text-success border border-success" style={{ fontSize: 13 }}>
                        {need.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-footer bg-transparent border-0 pt-0 pb-3 text-center">
                  <button
                    className="btn btn-sm btn-success px-4"
                    style={{ borderRadius: 8, fontWeight: 500 }}
                    onClick={() => setSelectedCase(case_.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredCases.length === 0 && (
            <div className="py-5 text-center text-secondary">No matching cases found.</div>
          )}
        </div>
      </div>
    );
  }

  // Show CaseDetail component if a case is selected
  return (
    <div>
      <button
        className="btn btn-sm btn-outline-success mb-3"
        onClick={() => setSelectedCase(null)}
      >
        <ArrowLeft className="me-1" /> Back to Cases
      </button>
      <CaseDetail caseData={selectedCaseData} />
    </div>
  );
}
