import React from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import LiveTracking from "../../components/shared/LiveTracking";

export default function CaseDetails() {
  const { caseId } = useParams();
  const [searchParams] = useSearchParams();
  const userRole = searchParams.get("role") || "donor"; // default to donor

  // Validate case ID
  if (!caseId || !caseId.startsWith("CASE-")) {
    return <Navigate to="/404" replace />; // Redirect to 404 page (create one in pages/404.jsx)
  }

  return (
    <div className="min-vh-100 bg-light bg-gradient p-4">
      <div className="container">
        <LiveTracking caseId={caseId} userRole={userRole} />
      </div>
    </div>
  );
}
