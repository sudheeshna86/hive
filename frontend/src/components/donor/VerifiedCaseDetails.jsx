import React, { useState, useEffect, useRef } from "react";
import { ProgressBar, Button, Modal, Form } from "react-bootstrap";
import {
  ClipboardList,
  ShieldCheck,
  HeartHandshake,
  BadgeDollarSign,
  CheckCircle2,
} from "lucide-react";

const STEP_ICONS = [
  <ClipboardList size={22} className="text-success" />,
  <ShieldCheck size={22} className="text-success" />,
  <HeartHandshake size={22} className="text-success" />,
  <BadgeDollarSign size={22} className="text-success" />,
  <CheckCircle2 size={22} className="text-success" />,
];

export default function VerifiedCaseDetails({ caseData }) {
  const [visibleStep, setVisibleStep] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [showDonate, setShowDonate] = useState(false);
  const [donationAmount, setDonationAmount] = useState(50);
  const [funding, setFunding] = useState(caseData?.funding || { raised: 0, goal: 100 });
  const timelineRef = useRef(null);

  // Animate timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStep((prev) => {
        if (prev < caseData.timeline.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 700);
    return () => clearInterval(interval);
  }, [caseData.timeline.length]);

  // Adjust line height to match visible steps
  useEffect(() => {
    if (timelineRef.current) {
      const visibleSteps = timelineRef.current.querySelectorAll(".timeline-step.visible");
      if (visibleSteps.length > 0) {
        const first = visibleSteps[0];
        const last = visibleSteps[visibleSteps.length - 1];
        const height = last.offsetTop - first.offsetTop + last.offsetHeight / 2;
        setLineHeight(height);
      }
    }
  }, [visibleStep]);

  const handleDonate = () => {
    const newRaised = funding.raised + Number(donationAmount);
    const updatedFunding = {
      ...funding,
      raised: Math.min(newRaised, funding.goal),
    };
    setFunding(updatedFunding);
    setShowDonate(false);
  };

  return (
    <div className="container py-5">
      <div
        className="card border-0 shadow-sm mx-auto"
        style={{ maxWidth: 800, borderRadius: 16 }}
      >
        <div className="card-header bg-success text-white py-3 rounded-top">
          <h5 className="mb-0 fw-semibold">Case Details — {caseData.id}</h5>
        </div>

        <div className="card-body p-4">
          {/* Beneficiary Info */}
          <div className="d-flex align-items-center mb-4">
            <img
              src={caseData.photoUrl}
              alt="Beneficiary"
              className="rounded border me-3"
              style={{ width: 85, height: 85, objectFit: "cover" }}
            />
            <div>
              <h5 className="mb-1 fw-semibold">
                {caseData.beneficiary} ({caseData.age}y)
              </h5>
              <p className="mb-1 text-muted small">
                {caseData.location.address}
              </p>
              <div>
                {caseData.needs.map((tag) => (
                  <span key={tag} className="badge bg-success me-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <h5 className="fw-bold mb-3 text-success border-bottom pb-2">
            Case Timeline
          </h5>
          <div ref={timelineRef} className="position-relative ps-4 mb-5">
            {/* Vertical progress line */}
            {lineHeight > 0 && (
              <div
                className="position-absolute bg-success"
                style={{
                  width: 4,
                  height: `${lineHeight}px`,
                  left: 12,
                  top: 20,
                  borderRadius: 3,
                  transition: "height 0.8s ease",
                }}
              />
            )}

            {caseData.timeline.map((t, i) => (
              <div
                key={i}
                className={`d-flex align-items-start mb-4 timeline-step ${
                  i < visibleStep ? "visible" : "invisible"
                }`}
                style={{
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  opacity: i < visibleStep ? 1 : 0,
                  transform: i < visibleStep ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center bg-success-subtle border border-success text-success rounded-circle me-3"
                  style={{ width: 40, height: 40 }}
                >
                  {STEP_ICONS[i % STEP_ICONS.length]}
                </div>
                <div>
                  <h6 className="mb-1 fw-semibold">{t.step}</h6>
                  <p className="text-muted small mb-1">
                    {t.date} — {t.actor || "System"}
                  </p>
                  <p className="mb-0">{t.description}</p>
                  {t.amount && (
                    <p className="mb-0 fw-bold text-success">💰 {t.amount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Funding Section */}
          <div className="p-3 rounded bg-light border mb-4 mt-5">
            <h5 className="fw-bold text-success mb-3">Funding Progress</h5>
            <ProgressBar
              now={(funding.raised / funding.goal) * 100}
              label={`${Math.round((funding.raised / funding.goal) * 100)}%`}
              variant="success"
              style={{ height: 10, borderRadius: 5 }}
            />
            <div className="d-flex justify-content-between mt-2">
              <span>
                <strong>${funding.raised.toLocaleString()}</strong> raised
              </span>
              <span>
                <strong>${funding.goal.toLocaleString()}</strong> goal
              </span>
            </div>
          </div>

          {/* Donate Button */}
          <div className="text-center">
            <Button
              variant="success"
              size="lg"
              className="px-5 py-2 fw-semibold"
              style={{ borderRadius: 10 }}
              onClick={() => setShowDonate(true)}
            >
              💚 Donate Now
            </Button>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <Modal show={showDonate} onHide={() => setShowDonate(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Make a Donation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-2 text-success fw-semibold">
            {caseData.beneficiary} — {caseData.id}
          </h6>
          <p className="text-muted small mb-3">{caseData.desc}</p>

          <ProgressBar
            now={(funding.raised / funding.goal) * 100}
            style={{ height: 8 }}
            variant="success"
          />
          <div className="d-flex justify-content-between mt-2 mb-3 small">
            <span>${funding.raised} raised</span>
            <span>${funding.goal} goal</span>
          </div>

          <h6 className="fw-semibold">Choose Donation Amount</h6>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {[25, 50, 100, 250, 500].map((amt) => (
              <Button
                key={amt}
                variant={donationAmount === amt ? "success" : "outline-success"}
                onClick={() => setDonationAmount(amt)}
              >
                ${amt}
              </Button>
            ))}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select defaultValue="Credit Card">
              <option>Credit Card</option>
              <option>UPI</option>
              <option>PayPal</option>
              <option>Net Banking</option>
            </Form.Select>
          </Form.Group>

          <div className="alert alert-success small">
            <strong>Secure Payment:</strong> Your information is encrypted and
            secure. Funds are held in escrow until completion.
          </div>

          <Button
            variant="success"
            className="w-100 fw-semibold"
            onClick={handleDonate}
          >
            Donate ${donationAmount}
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
