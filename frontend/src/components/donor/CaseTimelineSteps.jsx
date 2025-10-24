import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  ShieldCheck,
  HeartHandshake,
  BadgeDollarSign,
  CheckCircle2,
} from "lucide-react";

const STEP_ICONS = [
  <ClipboardList size={26} className="text-primary" key="icon1" />,
  <ShieldCheck size={26} className="text-primary" key="icon2" />,
  <HeartHandshake size={26} className="text-success" key="icon3" />,
  <BadgeDollarSign size={26} className="text-success" key="icon4" />,
  <CheckCircle2 size={26} className="text-success" key="icon5" />,
  <BadgeDollarSign size={26} className="text-success" key="icon6" />,
];

export default function CaseTimelineSteps({ caseData }) {
  const [visibleStep, setVisibleStep] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    setVisibleStep(0);
    setLineHeight(0);
    if (!caseData?.timeline) return;

    const interval = setInterval(() => {
      setVisibleStep((prev) => {
        if (prev < caseData.timeline.length) {
          setLineHeight((prevHeight) => prevHeight + 80);
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [caseData]);

  if (!caseData || !caseData.timeline || caseData.timeline.length === 0) {
    return <div>No tracking available for this case.</div>;
  }

  return (
    <div>
      <h5 className="mb-4 fw-bold" style={{ color: "#144c2b" }}>
        Case Progress Tracking
      </h5>
      <div className="position-relative" style={{ marginLeft: 24 }}>
        {/* Progress line */}
        <div
          className="position-absolute start-0 top-0"
          style={{
            width: "3.5px",
            background: "#175c31",
            height: `${lineHeight}px`,
            transition: "height 0.8s ease-out",
          }}
        ></div>

        <ol className="timeline ps-0 position-relative" style={{ paddingLeft: 0 }}>
          {caseData.timeline.map((item, idx) => (
            <li
              key={idx}
              className={`timeline-item position-relative mb-5 d-flex ${
                visibleStep > idx ? "animate-slide-in" : ""
              }`}
              style={{ minHeight: 80 }}
            >
              {/* Step Icon */}
              <div
                style={{
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
                }}
              >
                {STEP_ICONS[idx] || STEP_ICONS[STEP_ICONS.length - 1]}
              </div>

              {/* Step Content */}
              <div className="ms-5 flex-grow-1">
                <div className="fw-bold mb-1" style={{ fontSize: 17, color: "#194d2d" }}>
                  {item.step}
                </div>
                <div
                  className="d-flex align-items-center mb-1 mt-1"
                  style={{ fontSize: 14, color: "#718079" }}
                >
                  <span className="me-2">
                    <i className="bi bi-clock"></i> {item.date || "–"}
                  </span>
                  {item.actor && <span className="ms-2">{item.actor}</span>}
                </div>
                <div className="mb-2" style={{ color: "#555", fontSize: 15 }}>
                  {item.description}
                </div>

                {item.amount && (
                  <div className="mb-1">
                    <span
                      className="badge bg-white border border-success text-success"
                      style={{ fontWeight: 600, letterSpacing: 1, fontSize: 16 }}
                    >
                      {item.amount}
                    </span>
                  </div>
                )}

                {item.proofUrl && (
                  <div className="mb-2">
                    <a
                      href={item.proofUrl}
                      className="btn btn-outline-success btn-sm px-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Proof
                    </a>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Animation Styles */}
      <style>{`
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
