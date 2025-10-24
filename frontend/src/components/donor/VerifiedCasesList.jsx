import React, { useState } from "react";
import { Form, Button, ProgressBar } from "react-bootstrap";
import {
  ClipboardList,
  ShieldCheck,
  HeartHandshake,
  BadgeDollarSign,
  CheckCircle2,
} from "lucide-react";
import VerifiedCaseDetails from "./VerifiedCaseDetails";

const STEP_ICONS = [
  <ClipboardList size={26} className="text-primary" />,
  <ShieldCheck size={26} className="text-primary" />,
  <HeartHandshake size={26} className="text-success" />,
  <BadgeDollarSign size={26} className="text-success" />,
  <CheckCircle2 size={26} className="text-success" />,
  <BadgeDollarSign size={26} className="text-success" />,
];

export const CASES = [
  {
    id: "CASE-1001",
    beneficiary: "Ramesh Kumar",
    age: 42,
    photoUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "In Progress",
    location: { address: "Connaught Place, Delhi" },
    needs: ["Medical", "Shelter"],
    desc: "Man with respiratory issues, needs urgent medical attention and shelter.",
    fundingGoal: 5000,
    currentFunding: 1500,
    registeredBy: "Priya Sharma",
    contact: "9810001000",
    voiceTranscript:
      "Patient described breathing issues and poor living conditions.",
    volunteer: {
      name: "Priya Sharma",
      phone: "9810001000",
      location: "Connaught Place, Delhi",
    },
    ngo: {
      name: "HelpNGO",
      staff: "Dr. Michael Chen",
      staffPhone: "9810002000",
    },
    funding: {
      raised: 1500,
      goal: 5000,
      donors: 3,
      lastUpdate: "2025-10-23",
    },
    timeline: [
      {
        step: "Case Registered",
        date: "2025-09-01",
        actor: "Priya Sharma (Volunteer)",
        description: "Submitted with proof.",
      },
      {
        step: "Verified",
        date: "2025-09-02",
        actor: "Dr. Michael Chen (NGO)",
        description: "Verified by NGO staff.",
      },
      {
        step: "Funding Goal Reached",
        date: "2025-09-05",
        actor: "Raj Patel & 2 Donors",
        description: "Funding achieved through donations.",
        amount: "₹5000",
      },
    ],
  },
  {
    id: "CASE-1002",
    beneficiary: "Sita Devi",
    age: 35,
    photoUrl: "https://randomuser.me/api/portraits/women/39.jpg",
    status: "Funded",
    location: { address: "Lajpat Nagar, Delhi" },
    needs: ["Food", "Shelter"],
    desc: "Single mother with two children, lost home in floods.",
    fundingGoal: 8000,
    currentFunding: 8000,
    registeredBy: "Ankit Soni",
    contact: "9810033333",
    voiceTranscript: "Family displaced after floods.",
    volunteer: {
      name: "Ankit Soni",
      phone: "9810033333",
      location: "Lajpat Nagar, Delhi",
    },
    ngo: {
      name: "ReliefTrust",
      staff: "Sapna Malhotra",
      staffPhone: "9810008000",
    },
    funding: {
      raised: 8000,
      goal: 8000,
      donors: 5,
      lastUpdate: "2025-10-23",
    },
    timeline: [
      {
        step: "Case Registered",
        date: "2025-09-01",
        actor: "Ankit Soni (Volunteer)",
        description: "Case registered, proof uploaded.",
      },
      {
        step: "Verified",
        date: "2025-09-03",
        actor: "Sapna Malhotra (NGO)",
        description: "NGO staff review complete.",
      },
      {
        step: "Funding Goal Reached",
        date: "2025-09-08",
        actor: "Meena & 4 Donors",
        description: "Fully funded.",
        amount: "₹8000",
      },
    ],
  },
  {
    id: "CASE-1003",
    beneficiary: "Amit Sharma",
    age: 28,
    photoUrl: "https://randomuser.me/api/portraits/men/70.jpg",
    status: "Completed",
    location: { address: "Noida Sector 62" },
    needs: ["Education", "Food"],
    desc: "Young student needs help for tuition and meals.",
    fundingGoal: 3000,
    currentFunding: 3000,
    registeredBy: "Deepak Meena",
    contact: "9798881000",
    voiceTranscript: "Support needed for studies and food.",
    volunteer: {
      name: "Deepak Meena",
      phone: "9798881000",
      location: "Noida Sector 62",
    },
    ngo: {
      name: "YouthCare",
      staff: "S. Iyer",
      staffPhone: "9810088996",
    },
    funding: {
      raised: 3000,
      goal: 3000,
      donors: 2,
      lastUpdate: "2025-10-23",
    },
    timeline: [
      {
        step: "Case Registered",
        date: "2025-09-03",
        actor: "Deepak Meena (Volunteer)",
        description: "Docs uploaded, site checked.",
      },
      {
        step: "Verified",
        date: "2025-09-05",
        actor: "S. Iyer (NGO)",
        description: "Records checked, approved.",
      },
      {
        step: "Funding Goal Reached",
        date: "2025-09-11",
        actor: "Donors",
        description: "Goal reached for fees.",
        amount: "₹3000",
      },
      {
        step: "Voucher Issued",
        date: "2025-10-01",
        description: "Tuition voucher sent.",
        proof: true,
        proofUrl: "#",
      },
      {
        step: "Voucher Redeemed",
        date: "2025-10-21",
        actor: "StudentAid Foundation",
        description: "Voucher redeemed, receipt attached.",
        proof: true,
        proofUrl: "#",
      },
    ],
    service: {
      provider: {
        name: "StudentAid Foundation",
        contact: "info@studentaid.org",
        address: "Noida Sector 62",
        proofs: { photo: true, receipt: true },
      },
      voucher: {
        id: "VCH-0019",
        value: 1200,
        redeemed: true,
        date: "2025-10-21",
      },
    },
  },
];

const SCHEMES = [
  { id: "SCH-1", name: "Flood Relief 2025" },
  { id: "SCH-2", name: "Education Drive" },
];

export default function VerifiedCasesList() {
  const [search, setSearch] = useState("");
  const [urgency, setUrgency] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [scheme, setScheme] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);

  let filtered = CASES.filter(
    (c) =>
      (!search ||
        c.beneficiary.toLowerCase().includes(search.toLowerCase()) ||
        c.desc.toLowerCase().includes(search.toLowerCase())) &&
      (!urgency || (c.urgency && c.urgency === urgency)) &&
      (!type || c.needs.map((x) => x.toLowerCase()).includes(type.toLowerCase())) &&
      (!status || c.status.toLowerCase() === status.toLowerCase())
  );

  if (selectedCase) {
    const caseData = CASES.find((c) => c.id === selectedCase);
    return (
      <div style={{ padding: 20 }}>
        <Button
          variant="outline-success"
          className="mb-3"
          onClick={() => setSelectedCase(null)}
        >
          ← Back to Cases
        </Button>
        <VerifiedCaseDetails caseData={caseData} />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 16,
        background: "#fff",
        boxShadow: "0 0 0.6rem #f1f2f3",
        marginBottom: 24,
      }}
    >
      <h4 style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>
        Verified Cases
      </h4>
      <div style={{ color: "#666", marginBottom: 24 }}>
        Browse and donate to verified cases that need your help
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search by name, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <Form.Select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
            <option value="">All Urgency Levels</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
            <option value="medium">Medium</option>
          </Form.Select>
        </div>
        <div className="col-md-2">
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Medical">Medical</option>
            <option value="Shelter">Shelter</option>
            <option value="Food">Food</option>
            <option value="Education">Education</option>
          </Form.Select>
        </div>
        <div className="col-md-2">
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option>Funded</option>
            <option>In Progress</option>
            <option>Completed</option>
          </Form.Select>
        </div>
        <div className="col-md-2">
          <Form.Select value={scheme} onChange={(e) => setScheme(e.target.value)}>
            <option value="">All Schemes</option>
            {SCHEMES.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
          </Form.Select>
        </div>
      </div>

      {/* Case Cards */}
      <div className="row g-4">
        {filtered.map((c) => (
          <div className="col-md-4" key={c.id}>
            <div
              style={{
                border: "1.5px solid #e7eaea",
                borderRadius: 16,
                background: "#fcfefd",
                boxShadow: "0 2px 12px #f2f2f2",
                padding: "28px 24px 18px 24px",
                position: "relative",
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span style={{ fontWeight: 700, fontSize: 21 }}>{c.id}</span>
              </div>

              <div style={{ color: "#445", fontWeight: 500 }}>
                👤 {c.beneficiary} ({c.age}y)
              </div>
              <div className="mb-2" style={{ fontSize: 13, color: "#7fab9b" }}>
                🧑‍🤝‍🧑 {c.volunteer.name} | {c.volunteer.phone} |{" "}
                {c.volunteer.location}
              </div>
              <div className="mb-2" style={{ fontSize: 13, color: "#7fab9b" }}>
                🏥 {c.ngo.name} — {c.ngo.staff} ({c.ngo.staffPhone})
              </div>

              <div className="mb-2">
                {c.needs.map((tag) => (
                  <span className="badge bg-success me-2" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div
                style={{
                  color: "#353535",
                  fontWeight: 400,
                  fontSize: 15,
                  minHeight: 50,
                }}
              >
                {c.desc}
              </div>

              <div className="mt-1 text-muted" style={{ fontSize: 13 }}>
                📍 {c.location.address}
              </div>

              {/* Funding progress */}
              <div style={{ marginTop: 20, marginBottom: 13 }}>
                <div style={{ fontWeight: 500, fontSize: 14, color: "#545" }}>
                  Funding Progress
                </div>
                <ProgressBar
                  now={Math.round((c.funding.raised / c.funding.goal) * 100)}
                  label={`${Math.round((c.funding.raised / c.funding.goal) * 100)}%`}
                  style={{ height: 8, background: "#eaefee" }}
                  variant="success"
                />
                <div
                  className="d-flex justify-content-between mt-1"
                  style={{ fontSize: 15 }}
                >
                  <span>
                    <b>${c.funding.raised.toLocaleString()}</b> raised
                  </span>
                  <span>
                    <b>${c.funding.goal.toLocaleString()}</b> goal
                  </span>
                </div>
                <div
                  className="d-flex justify-content-between mt-1"
                  style={{ color: "#778", fontSize: 13 }}
                >
                  <span>🤝 {c.funding.donors} donors</span>
                  <span>🕒 {c.funding.lastUpdate}</span>
                </div>
              </div>

              <Button
                className="w-100 mt-2"
                variant="outline-primary"
                style={{ height: 42, fontSize: 16, fontWeight: 600 }}
                onClick={() => setSelectedCase(c.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
