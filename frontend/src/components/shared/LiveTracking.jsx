import React, { useState, useEffect } from "react";
import { MapPin, Clock, User, Heart, CheckCircle, AlertCircle, FileText, Camera, Phone, Eye, MessageSquare } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample tracking data
const sampleTrackingData = {
  "CASE-2024-0892": {
    id: "CASE-2024-0892",
    beneficiary: "Ramesh Kumar",
    age: 45,
    location: "Mumbai Central Station",
    volunteer: "Sarah Johnson",
    ngo: "HelpIndia NGO",
    status: "voucher_generated",
    priority: "high",
    totalAmount: 5000,
    donatedAmount: 5000,
    serviceFee: 450,
    availableAmount: 4550,
    timeline: [
      { id: 1, stage: "case_registered", title: "Case Registered", description: "Volunteer registered beneficiary case with photo and voice recording", timestamp: "2024-01-15 10:30 AM", user: "Sarah Johnson (Volunteer)", location: "Mumbai Central Station", status: "completed", details: { photos: 2, voiceRecording: true, gpsLocation: "19.0176, 72.8562", medicalNeeds: ["Diabetes medication", "Blood pressure check"] } },
      { id: 2, stage: "ngo_verification", title: "NGO Verification", description: "Case verified by NGO after duplicate check and field validation", timestamp: "2024-01-15 02:45 PM", user: "HelpIndia NGO", status: "completed", details: { verificationTime: "4 hours 15 minutes", duplicateCheck: "No matches found", fieldVerification: "Completed", approvedSchemes: ["Medical Aid", "Food Support"] } },
      { id: 3, stage: "donation_received", title: "Donation Received", description: "Full amount donated by verified donor", timestamp: "2024-01-15 06:20 PM", user: "Rajesh Patel (Donor)", status: "completed", details: { amount: 5000, serviceFee: 450, netAmount: 4550, paymentMethod: "UPI", transactionId: "TXN123456789" } },
      { id: 4, stage: "voucher_generated", title: "Vouchers Generated", description: "Service vouchers created and assigned to providers", timestamp: "2024-01-15 06:25 PM", user: "System", status: "completed", details: { medicalVoucher: "VOUCH-MED-1234 (₹3000)", foodVoucher: "VOUCH-FOOD-5678 (₹1550)", assignedProviders: ["City Hospital", "Food Bank Mumbai"] } },
      { id: 5, stage: "service_in_progress", title: "Service in Progress", description: "Beneficiary taken to service provider for treatment", timestamp: "2024-01-16 09:15 AM", user: "Sarah Johnson (Volunteer)", status: "in_progress", details: { currentLocation: "City Hospital", serviceType: "Medical Treatment", estimatedCompletion: "2 hours" } },
      { id: 6, stage: "service_completed", title: "Service Completion", description: "Medical treatment completed, voucher redeemed", timestamp: "Pending", user: "Pending", status: "pending", details: {} },
    ],
    liveUpdates: [
      { time: "09:15 AM", message: "Beneficiary arrived at City Hospital", type: "location" },
      { time: "09:20 AM", message: "Registration completed, waiting for doctor", type: "status" },
      { time: "09:45 AM", message: "Consultation started with Dr. Sharma", type: "service" },
    ],
  },
};

export default function LiveTracking({ caseId, userRole }) {
  const [trackingData, setTrackingData] = useState(sampleTrackingData[caseId]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newUpdate = {
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        message: "Status update received from service provider",
        type: "status",
      };
      setTrackingData(prev => ({
        ...prev,
        liveUpdates: [newUpdate, ...prev.liveUpdates.slice(0, 4)],
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  if (!trackingData) {
    return (
      <div className="card text-center p-4">
        <p className="text-secondary">Case not found or access denied</p>
      </div>
    );
  }

  const getStageIcon = (stage) => {
    switch (stage) {
      case "case_registered": return User;
      case "ngo_verification": return CheckCircle;
      case "donation_received": return Heart;
      case "voucher_generated": return FileText;
      case "service_in_progress": return Clock;
      case "service_completed": return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getStageColor = (status) => {
    switch (status) {
      case "completed": return "text-success border-success bg-light";
      case "in_progress": return "text-primary border-primary bg-light";
      case "pending": return "text-warning border-warning bg-light";
      default: return "text-secondary border-secondary bg-light";
    }
  };

  const currentStage =
    trackingData.timeline.find(stage => stage.status === "in_progress") ||
    trackingData.timeline[trackingData.timeline.length - 1];

  return (
    <div className="mb-4">
      {/* Case Overview */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5 className="d-flex align-items-center mb-1">
              <Eye className="me-2 text-success" /> Live Case Tracking - {trackingData.id}
            </h5>
            <small>Real-time progress tracking for {trackingData.beneficiary}</small>
          </div>
          <div className="d-flex gap-2">
            <span className={`badge ${isLive ? 'bg-success text-light' : 'bg-secondary text-light'}`}>
              {isLive ? '🔴 LIVE' : 'Offline'}
            </span>
            <span className={`badge ${trackingData.priority === 'high' ? 'bg-danger' : trackingData.priority === 'medium' ? 'bg-warning text-dark' : 'bg-success'}`}>
              {trackingData.priority} priority
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            {/* Beneficiary Info */}
            <div className="col-md-4 mb-3">
              <h6>Beneficiary Details</h6>
              <p><strong>Name:</strong> {trackingData.beneficiary}</p>
              <p><strong>Age:</strong> {trackingData.age} years</p>
              <p><MapPin className="me-1" /> {trackingData.location}</p>
              <p><strong>Volunteer:</strong> {trackingData.volunteer}</p>
              <p><strong>NGO:</strong> {trackingData.ngo}</p>
            </div>

            {/* Financial Info */}
            <div className="col-md-4 mb-3">
              <h6>Financial Status</h6>
              <p><strong>Total Required:</strong> ₹{trackingData.totalAmount.toLocaleString()}</p>
              <p><strong>Donated:</strong> ₹{trackingData.donatedAmount.toLocaleString()}</p>
              <p><strong>Service Fee (9%):</strong> ₹{trackingData.serviceFee.toLocaleString()}</p>
              <p><strong>Available:</strong> ₹{trackingData.availableAmount.toLocaleString()}</p>
              <div className="progress" style={{ height: '0.5rem' }}>
                <div className="progress-bar" role="progressbar" style={{ width: `${(trackingData.donatedAmount / trackingData.totalAmount) * 100}%` }}></div>
              </div>
            </div>

            {/* Current Status */}
            <div className="col-md-4 mb-3">
              <h6>Current Status</h6>
              <div className={`p-2 border rounded ${getStageColor(currentStage.status)}`}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  {React.createElement(getStageIcon(currentStage.stage), { className: "me-1" })}
                  <span>{currentStage.title}</span>
                </div>
                <p className="mb-1">{currentStage.description}</p>
                <small>{currentStage.timestamp}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Live Updates */}
      <div className="row">
        <div className="col-lg-8 mb-3">
          <div className="card">
            <div className="card-header">
              <h6 className="d-flex align-items-center mb-1"><Clock className="me-2 text-success" /> Progress Timeline</h6>
              <small>Detailed journey from registration to completion</small>
            </div>
            <div className="card-body">
              {trackingData.timeline.map((stage, index) => {
                const Icon = getStageIcon(stage.stage);
                const isLast = index === trackingData.timeline.length - 1;
                return (
                  <div key={stage.id} className="position-relative mb-3">
                    {!isLast && <div className={`position-absolute start-3 top-0 w-1 ${stage.status === "completed" ? "bg-success" : "bg-secondary"}`} style={{ height: '4rem' }} />}
                    <div className="d-flex gap-3">
                      <div className={`p-2 rounded-circle border ${getStageColor(stage.status)}`}>
                        {React.createElement(Icon, { size: 20 })}
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between mb-1">
                          <strong>{stage.title}</strong>
                          <span className={`badge ${getStageColor(stage.status)}`}>{stage.status.replace("_", " ")}</span>
                        </div>
                        <p className="mb-1 text-secondary">{stage.description}</p>
                        <small className="text-muted">{stage.timestamp} - {stage.user}</small>

                        {Object.keys(stage.details).length > 0 && (
                          <div className="bg-light p-2 rounded mt-2">
                            {Object.entries(stage.details).map(([key, value]) => (
                              <div key={key} className="d-flex justify-content-between">
                                <span className="text-secondary">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</span>
                                <span>{Array.isArray(value) ? value.join(", ") : String(value)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Updates */}
        <div className="col-lg-4 mb-3">
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="d-flex align-items-center mb-1"><MessageSquare className="me-2 text-success" /> Live Updates</h6>
              <small>Real-time status updates</small>
            </div>
            <div className="card-body">
              {trackingData.liveUpdates.map((update, idx) => (
                <div key={idx} className="d-flex gap-2 align-items-start bg-light p-2 rounded mb-2">
                  <div className="bg-success rounded-circle" style={{ width: '0.5rem', height: '0.5rem', marginTop: '0.25rem' }}></div>
                  <div className="flex-grow-1">
                    <p className="mb-1">{update.message}</p>
                    <small className="text-muted">{update.time}</small>
                  </div>
                </div>
              ))}
              <button className="btn btn-outline-secondary w-100 mt-2" onClick={() => setIsLive(!isLive)}>
                {isLive ? "Pause Live Updates" : "Resume Live Updates"}
              </button>
            </div>
          </div>

          {userRole === "admin" && (
            <div className="card">
              <div className="card-header"><small>Quick Actions</small></div>
              <div className="card-body d-grid gap-2">
                <button className="btn btn-outline-secondary d-flex align-items-center">
                  <Phone className="me-2" /> Contact Volunteer
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center">
                  <Camera className="me-2" /> Request Photo Update
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center">
                  <AlertCircle className="me-2" /> Flag for Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
