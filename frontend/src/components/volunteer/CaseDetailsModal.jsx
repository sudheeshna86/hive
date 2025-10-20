import { ClipboardList, ShieldCheck, HeartHandshake, BadgeDollarSign, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const STEP_ICONS = [
  <ClipboardList size={26} className="text-primary" />,
  <ShieldCheck size={26} className="text-primary" />,
  <HeartHandshake size={26} className="text-success" />,
  <BadgeDollarSign size={26} className="text-success" />,
  <CheckCircle2 size={26} className="text-success" />,
  <BadgeDollarSign size={26} className="text-success" />
];

export default function CaseDetailsModal({ caseData }) {
  const [visibleStep, setVisibleStep] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStep((prev) => {
        if (prev < caseData.timeline.length) {
          setLineHeight((prevHeight) => prevHeight + 80); // increment line
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000); // 1 second per step
    return () => clearInterval(interval);
  }, [caseData.timeline.length]);

  return (
    <div>
      <div className="card shadow-sm border-0" style={{ background: "#fff" }}>
        <div className="card-header text-dark" style={{ borderRadius: "8px 8px 0 0", background: "#e9ecef" }}>
          <h5 className="mb-0">{caseData.id} Summary</h5>
        </div>
        <div className="card-body pt-4">
          {/* Patient Info */}
          <div className="d-flex align-items-start mb-4">
            <img
              src={caseData.photoUrl}
              alt="Patient"
              className="rounded me-3 border"
              style={{ width: "80px", height: "80px", objectFit: "cover", background: "#f5f7f5" }}
            />
            <div>
              <p className="mb-2"><strong>Status: </strong><span className="badge bg-success px-3 py-2">{caseData.status}</span></p>
              <p className="mb-2"><strong>Location:</strong> {caseData.location.address}</p>
              <p className="mb-2"><strong>Needs:</strong> {caseData.needs.map(n => <span key={n} className="badge bg-success-subtle text-success border border-success me-1 mb-1">{n}</span>)}</p>
              <p className="mb-2"><strong>Funding:</strong> ₹{caseData.currentFunding}/₹{caseData.fundingGoal}</p>
              <p className="mb-2"><strong>Registered By:</strong> {caseData.registeredBy} <br /><strong>Contact:</strong> {caseData.contact}</p>
              <p><strong>Voice Transcript:</strong> <em className="text-muted">{caseData.voiceTranscript}</em></p>
            </div>
          </div>

          {/* Stepper Timeline */}
          <h5 className="mb-4 fw-bold" style={{ color: "#144c2b" }}>Case Progress Tracking</h5>
          <div className="position-relative" style={{ marginLeft: 24 }}>
            {/* Vertical Line */}
            <div
              className="position-absolute start-0 top-0"
              style={{
                width: "3.5px",
                background: "#175c31",
                height: `${lineHeight}px`,
                transition: "height 0.8s ease-out"
              }}
            ></div>

            <ol className="timeline ps-0 position-relative" style={{ paddingLeft: 0 }}>
              {caseData.timeline.map((item, idx) => (
                <li key={idx} className={`timeline-item position-relative mb-5 d-flex ${visibleStep > idx ? 'animate-slide-in' : ''}`} style={{ minHeight: 80 }}>
                  {/* Icon */}
                  <div style={{
                    position: "absolute",
                    left: "-24px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    width: 48,
                    height: 48,
                    background: "#e9f8ef",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 0 3px #b3e5c0",
                  }}>
                    {STEP_ICONS[idx] || STEP_ICONS[STEP_ICONS.length-1]}
                  </div>

                  {/* Timeline Content */}
                  <div className="ms-5 flex-grow-1">
                    <div className="fw-bold mb-1" style={{ fontSize: 17, color: "#194d2d" }}>{item.step}</div>
                    <div className="d-flex align-items-center mb-1 mt-1" style={{ fontSize: 14, color: "#718079" }}>
                      <span className="me-2"><i className="bi bi-clock"></i> {item.date || "–"}</span>
                      {item.actor && <span className="ms-2">{item.actor}</span>}
                    </div>
                    <div className="mb-2" style={{ color: "#555", fontSize: 15 }}>{item.description}</div>
                    {item.amount && <div className="mb-1"><span className="badge bg-white border border-success text-success" style={{ fontWeight: 600, letterSpacing: 1, fontSize: 16 }}>{item.amount}</span></div>}
                    {item.proof && <div className="mb-2"><a href={item.proofUrl} className="btn btn-outline-success btn-sm px-3" target="_blank" rel="noopener noreferrer">View Proof</a></div>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .timeline-item.animate-slide-in {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );
}
