import { useState } from "react";

// Needs colors mapping (Bootstrap utility classes)
const needsColor = {
  food: "bg-success bg-opacity-10 text-success border-success",
  shelter: "bg-success bg-opacity-10 text-success border-success",
};

// Helper: find the verifying NGO/staff name for a case
function getVerifier(caseObj) {
  const verifiedStep = caseObj.timeline.find(t =>
    t.step.toLowerCase().includes("verified")
  );
  return verifiedStep?.actor || "NGO Staff";
}

// Helper: critical check (customize as per your data -- here checks for 'critical' tag, or you can use status)
function isCritical(caseObj) {
  // If your data has a 'critical' property or a tags array, use that; otherwise, adjust logic as needed
  return caseObj.status === "VERIFIED" && (caseObj.critical === true || (caseObj.tags && caseObj.tags.includes("critical")));
}

// Helper: check if assigned (actor in timeline like 'assigned' or 'service delivered' with ashram in name)
function isAssigned(caseObj) {
  return caseObj.timeline.some(
    t =>
      (t.step.toLowerCase().includes("assigned") || t.step.toLowerCase().includes("service delivered")) &&
      (t.actor && /ashram/i.test(t.actor))
  );
}

// Helper: get assignment (returns both assigning NGO and ashram)
function getAssignment(caseObj) {
  // Typical: t.step: "Assigned", t.actor: "NGO Name to Ananda Ashramam", or custom
  const assignStep = caseObj.timeline.find(t =>
    (t.step.toLowerCase().includes("assigned") || t.step.toLowerCase().includes("service delivered")) &&
    (t.actor && /ashram/i.test(t.actor))
  );
  if (!assignStep) return { ngo: null, ashram: null };
  // Example format: "Verified by NGO Staff", "Assigned to Ananda Ashramam by XYZ"
  const [ngo, ashram] = assignStep.actor.split(" to ");
  return {
    ngo: ngo ? ngo.replace(/(by|Assigned)/ig, "").trim() : "",
    ashram: ashram ? ashram.trim() : "Ashram"
  };
}

function CaseCard({ caseData, assigned, onAssign }) {
  return (
    <div className="card border-success shadow-sm rounded-3 mb-4" style={{ width: 340, margin: "0 16px 16px 0", display: "inline-block", verticalAlign: "top" }}>
      <div className="card-header bg-white border-0 fw-bold text-dark">{caseData.id}</div>
      <img
        src={caseData.photoUrl}
        alt="Patient"
        style={{ width: "100%", height: 170, objectFit: "cover", background: "#f2f2f2" }}
        className="mb-2"
      />
      <div className="card-body pt-0">
        <div className="mb-1 small text-muted">
          <span>{caseData.voiceTranscript.match(/\d+/)?.[0] || "--"}</span>
          &nbsp;
          <span>{caseData.location.address}</span>
        </div>
        <div className="mb-2 small text-muted">{caseData.timeline?.[0]?.date}</div>
        <div className="mb-2 text-dark">{caseData.voiceTranscript}</div>
        <div className="mb-3">
          {caseData.needs.map(need => (
            <span
              key={need}
              className={`badge me-2 border ${needsColor[need]} px-3 py-2 rounded-pill`}
              style={{ fontSize: 14 }}
            >
              {need}
            </span>
          ))}
        </div>
        {!assigned && (
          <div className="mb-2 small">
            <strong>Verified by: </strong>
            <span className="text-success fw-semibold">{getVerifier(caseData)}</span>
          </div>
        )}
        {assigned && (
          <div className="mb-2 small">
            <strong>Assigned by: </strong>
            <span className="text-success">{getAssignment(caseData).ngo}</span><br />
            <strong>To ashram: </strong>
            <span className="fw-semibold">{getAssignment(caseData).ashram}</span>
          </div>
        )}
        {!assigned && onAssign && (
          <button className="btn btn-outline-success px-4 w-100" onClick={onAssign}>
            Assign to 
          </button>
        )}
        {assigned && (
          <button className="btn btn-success px-4 w-100" disabled>
            Assigned
          </button>
        )}
      </div>
    </div>
  );
}

export default function VolunteerServiceProviding({ myCases }) {
  // Track assignments in local state
  const [assignedIds, setAssignedIds] = useState(
    myCases.filter(isAssigned).map(c => c.id)
  );

  // Only show VERIFIED and (if you want, isCritical) cases in Emergency
  const emergencyCases = myCases.filter(
    c =>
      c.status === "VERIFIED" &&
      (c.needs.includes("food") || c.needs.includes("shelter")) &&
      !assignedIds.includes(c.id)
      // Uncomment for critical only: && isCritical(c)
  );

  // Only cases that are assigned to an ashram, by some NGO (see timeline)
  const assignedCases = myCases.filter(
    c => assignedIds.includes(c.id)
  );

  // Assign handler
  const handleAssign = caseId => {
    setAssignedIds(ids => [...ids, caseId]);
    // In real app: update backend and timeline too!
  };

  const [activeTab, setActiveTab] = useState("emergency");

  return (
    <div>
      <h2 className="fw-bold text-dark mb-4">Cases</h2>
      <div className="mb-4">
        <button
          className={`btn me-2 ${activeTab === "emergency" ? "btn-success text-white" : "btn-outline-success"}`}
          onClick={() => setActiveTab("emergency")}
        >
          Emergency
        </button>
        <button
          className={`btn ${activeTab === "assigned" ? "btn-success text-white" : "btn-outline-success"}`}
          onClick={() => setActiveTab("assigned")}
        >
          Assigned Cases
        </button>
      </div>
      <div>
        {activeTab === "emergency" && (
          <div>
            {emergencyCases.length > 0 ? emergencyCases.map(item => (
              <CaseCard
                key={item.id}
                caseData={item}
                assigned={false}
                onAssign={() => handleAssign(item.id)}
              />
            )) : <div className="text-muted">No Emergency Cases Available</div>}
          </div>
        )}
        {activeTab === "assigned" && (
          <div>
            {assignedCases.length > 0 ? assignedCases.map(item => (
              <CaseCard
                key={item.id}
                caseData={item}
                assigned={true}
              />
            )) : <div className="text-muted">No Cases Assigned Yet</div>}
          </div>
        )}
      </div>
    </div>
  );
}
