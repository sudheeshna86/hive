import { useState, useEffect } from "react";
import { Plus, LogOut, Bell, Users, Star, Mail } from "lucide-react";
import CaseRegistrationForm from "./CaseRegistrationForm";
import VolunteerStats from "./VolunteerStats";
import VolunteerTracking from "./VolunteerTracking";
import VolunteerServiceProviding from "./VolunteerServiceProviding";

// Dummy data for illustration
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

// Dummy analytics summary
const analyticsData = {
  byStatus: {
    Pending: 2,
    Verified: 3,
    Funded: 4,
    Completed: 1,
  },
  needsServed: {
    medical: 5,
    shelter: 8,
    food: 7,
    transport: 2,
  },
  donationsOverTime: [1000, 2500, 3000, 4500, 6000],
};

export default function VolunteerDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCase, setSelectedCase] = useState(null);
  const [proofImage, setProofImage] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const selectedCaseData = myCases.find((c) => c.id === selectedCase);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".timeline-item");
      items.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight - 50) {
          item.classList.add("animate-slide-in");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedCase]);

  // Derived stats for demo
  const totalCases = myCases.length;
  const verified = myCases.filter((c) => c.status === "VERIFIED").length;
  const funded = myCases.filter((c) => c.status === "FUNDED").length;
  const completed = myCases.filter((c) => c.status === "COMPLETED").length;
  const vouchersIssued = myCases.filter((c) =>
    c.timeline.some((t) => t.step.toLowerCase().includes("voucher"))
  ).length;
  const totalBeneficiaries = myCases.length;
  const volunteerPoints = 120;

  return (
    <div className="min-vh-100 bg-white" style={{ background: "#FAFAFA" }}>
      {/* Header */}
      <header className="border-bottom bg-white sticky-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-success bg-opacity-10 p-2 rounded-circle border border-success">
              <Users className="text-success" />
            </div>
            <div>
              <h1 className="h5 mb-0 text-dark fw-semibold">
                Welcome, {user.name}
              </h1>
              <small className="text-muted">Volunteer Dashboard</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-success btn-sm shadow-sm">
              <Bell className="me-1" /> Notifications
            </button>
            <button
              className="btn btn-outline-success btn-sm shadow-sm"
              onClick={handleLogout}
            >
              <LogOut className="me-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container py-4">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3 border-bottom-0">
          <li className="nav-item">
            <button
              className={`nav-link rounded-top ${
                activeTab === "overview"
                  ? "active bg-success text-white fw-semibold border-0"
                  : "bg-white border-success border"
              } `}
              onClick={() => setActiveTab("overview")}
              style={{ minWidth: 120 }}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link rounded-top ${
                activeTab === "register"
                  ? "active bg-success text-white fw-semibold border-0"
                  : "bg-white border-success border"
              } `}
              onClick={() => setActiveTab("register")}
              style={{ minWidth: 120 }}
            >
              Register Case
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link rounded-top ${
                activeTab === "tracking"
                  ? "active bg-success text-white fw-semibold border-0"
                  : "bg-white border-success border"
              } `}
              onClick={() => setActiveTab("tracking")}
              style={{ minWidth: 120 }}
            >
              My Cases
            </button>
          </li>
             <li className="nav-item">
            <button
              className={`nav-link rounded-top ${
                activeTab === "volunteerServiceProviding"
                  ? "active bg-success text-white fw-semibold border-0"
                  : "bg-white border-success border"
              } `}
              onClick={() => setActiveTab("volunteerServiceProviding")}
              style={{ minWidth: 120 }}
            >
              ServiceProviding Cases
            </button>
          </li>
        </ul>


        {activeTab === "overview" && (
          <div>
            {/* Topbar */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold text-dark">Dashboard Overview</h3>
                <p className="text-muted mb-0">
                  Track your volunteer activities and impact
                </p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center border border-success rounded-3 px-3 py-2 bg-white small shadow-sm">
                  <Star className="text-warning me-2" />
                  <span className="fw-bold text-success">
                    {volunteerPoints} Volunteer Points
                  </span>
                </div>
                <button
                  className="btn btn-success px-4 shadow-sm"
                  onClick={() => setActiveTab("register")}
                >
                  <Plus className="me-1" /> Register New Case
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <VolunteerStats />

            {/* Recent Activity & Quick Actions */}
            <div className="row mt-3 g-3">
              {/* Recent Activity */}
              <div className="col-lg-5">
                <div className="card h-100 border-success shadow-sm rounded-3 bg-white">
                  <div className="card-header bg-white border-0 rounded-3">
                    <h5 className="mb-1 text-dark fw-bold">Recent Activity</h5>
                    <small className="text-muted">
                      Latest registrations, donations, vouchers, flagged cases
                    </small>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 p-2 bg-light rounded-3 d-flex justify-content-between align-items-center border border-success">
                      <div>
                        <strong className="text-dark">Case #AID-001</strong>
                        <p className="mb-0 text-muted small">
                          Medical assistance required | Donation received
                        </p>
                      </div>
                      <span className="badge bg-success bg-opacity-75 text-white px-3 py-2 rounded-pill">
                        Verified
                      </span>
                    </div>
                    <div className="mb-3 p-2 bg-light rounded-3 d-flex justify-content-between align-items-center border border-warning">
                      <div>
                        <strong className="text-dark">Case #AID-002</strong>
                        <p className="mb-0 text-muted small">
                          Food assistance needed | Flagged by AI
                        </p>
                      </div>
                      <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="col-lg-7">
                <div className="card h-100 border-success shadow-sm rounded-3 bg-white p-3" style={{ maxWidth: 500 }}>
                  <h6 className="fw-bold text-dark mb-3">Quick Actions</h6>
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <button
                      className="btn btn-outline-success flex-grow-1 py-2 d-flex flex-column align-items-center rounded-3 small"
                      onClick={() => setActiveTab("register")}
                    >
                      <Plus className="mb-1" /> Register Case
                    </button>
                    <button
                      className="btn btn-outline-success flex-grow-1 py-2 d-flex flex-column align-items-center rounded-3 small"
                      onClick={() => setActiveTab("tracking")}
                    >
                      <Bell className="mb-1" /> Track Cases
                    </button>
                    <button
                      className="btn btn-outline-success flex-grow-1 py-2 d-flex flex-column align-items-center rounded-3 small"
                    >
                      <Mail className="mb-1" /> Contact NGO/Provider
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Chart Section */}
            <div className="row mt-4 g-3">
              <div className="col-md-4">
                <div className="card border-success shadow-sm rounded-3">
                  <div className="card-header bg-white border-0 fw-bold text-success">
                    Cases By Status
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        height: 100,
                        background: "#e9fbe4",
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span className="text-success">[Chart Component]</span>
                    </div>
                    <div className="mt-2">
                      {Object.entries(analyticsData.byStatus).map(
                        ([status, count]) => (
                          <div
                            key={status}
                            className="d-flex justify-content-between text-muted small"
                          >
                            <span>{status}</span> <span>{count}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-success shadow-sm rounded-3">
                  <div className="card-header bg-white border-0 fw-bold text-success">
                    Needs Served
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        height: 100,
                        background: "#e9fbe4",
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span className="text-success">[Chart Component]</span>
                    </div>
                    <div className="mt-2">
                      {Object.entries(analyticsData.needsServed).map(
                        ([need, count]) => (
                          <div
                            key={need}
                            className="d-flex justify-content-between text-muted small"
                          >
                            <span>{need}</span> <span>{count}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-success shadow-sm rounded-3">
                  <div className="card-header bg-white border-0 fw-bold text-success">
                    Donations Over Time
                  </div>
                  <div className="card-body">
                    <div
                      style={{
                        height: 100,
                        background: "#e9fbe4",
                        borderRadius: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span className="text-success">[Chart Component]</span>
                    </div>
                    <div className="mt-2">
                      Total:{" "}
                      <span className="fw-bold text-success">
                        {analyticsData.donationsOverTime.reduce(
                          (a, b) => a + b,
                          0
                        )}
                      </span>{" "}
                      INR
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "register" && <CaseRegistrationForm />}
        {activeTab === "tracking" && <VolunteerTracking myCases={myCases} />}
        {activeTab === "volunteerServiceProviding" && (
        
<VolunteerServiceProviding myCases={myCases} />

        )}
      </div>

      {/* Proof Modal */}
      {proofImage && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-body bg-light p-4 rounded-4">
                <img
                  src={proofImage}
                  alt="Proof"
                  className="img-fluid rounded-4"
                />
              </div>
              <div className="modal-footer bg-light border-0 rounded-4">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={() => setProofImage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </div>
      )}

      {/* Timeline animations */}
      <style jsx>{`
        .timeline-item {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.5s ease-out;
        }
        .timeline-item.animate-slide-in {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}
