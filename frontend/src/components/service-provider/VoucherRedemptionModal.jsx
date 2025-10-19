import { useState, useRef } from "react";
import { FaCamera, FaMicrophone, FaMapMarkerAlt, FaTimes, FaFileUpload, FaCheckCircle, FaStop } from "react-icons/fa";
import { useToast } from "../../hooks/useToast";

export function VoucherRedemptionModal({ voucher, onClose, onComplete }) {
  const [proofData, setProofData] = useState({
    servicePhoto: null,
    voiceRecording: null,
    serviceDocument: null,
    serviceNotes: "",
    beneficiaryConfirmation: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [location, setLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const photoInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const { toast } = useToast();

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofData((prev) => ({ ...prev, servicePhoto: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofData((prev) => ({ ...prev, serviceDocument: file }));
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  // Start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setProofData((prev) => ({ ...prev, voiceRecording: blob }));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  };

  // Get GPS location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location captured",
            description: "GPS coordinates have been recorded successfully.",
          });
        },
        () => {
          toast({
            title: "Location error",
            description: "Could not get your location. Please enable GPS.",
            variant: "destructive",
          });
        }
      );
    }
  };

  // Format recording time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!proofData.servicePhoto || !proofData.serviceNotes || !location) {
      toast({
        title: "Missing Information",
        description: "Please provide service photo, notes, and GPS location.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const redemptionData = {
      voucherId: voucher.id,
      caseId: voucher.caseId,
      providerId: JSON.parse(localStorage.getItem("user") || "{}").id,
      serviceType: voucher.serviceType,
      amount: voucher.amount,
      proofData: {
        ...proofData,
        location,
        timestamp: new Date().toISOString(),
      },
      status: "completed",
      redeemedAt: new Date().toISOString(),
    };

    const existingRedemptions = JSON.parse(localStorage.getItem("voucherRedemptions") || "[]");
    localStorage.setItem("voucherRedemptions", JSON.stringify([...existingRedemptions, redemptionData]));

    toast({
      title: "Voucher Redeemed Successfully!",
      description: `Service for ${voucher.beneficiaryName} has been completed and verified.`,
    });

    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <div>
              <h5 className="modal-title">Redeem Voucher - {voucher.id}</h5>
              <small className="text-muted">Provide service to {voucher.beneficiaryName} and upload proof</small>
            </div>
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Service Summary */}
              <div className="bg-light p-3 rounded mb-4">
                <div className="row">
                  <div className="col-md-4 mb-2">
                    <strong>Service Type:</strong>
                    <p>{voucher.serviceType}</p>
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong>Service Value:</strong>
                    <p className="text-primary fw-bold">${voucher.amount}</p>
                  </div>
                  <div className="col-md-4 mb-2">
                    <strong>Beneficiary:</strong>
                    <p>{voucher.beneficiaryName}</p>
                  </div>
                </div>
              </div>

              {/* Service Verification */}
              <h6 className="text-primary mb-3">Service Verification</h6>

              {/* Service Photo */}
              <div className="mb-3">
                <label className="form-label">Service Photo *</label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={photoInputRef}
                    onChange={handlePhotoUpload}
                    className="d-none"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={!!proofData.servicePhoto}
                  >
                    <FaCamera className="me-2" />
                    {proofData.servicePhoto ? "Photo Uploaded" : "Take Service Photo"}
                  </button>
                  {proofData.servicePhoto && (
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setProofData((prev) => ({ ...prev, servicePhoto: null }));
                        setPhotoPreview(null);
                        if (photoInputRef.current) photoInputRef.current.value = "";
                      }}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                {photoPreview && (
                  <img src={photoPreview} alt="Service proof" className="img-thumbnail mb-2" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
                )}
                <small className="text-muted d-block">
                  Take a photo showing the beneficiary receiving the service with the voucher visible.
                </small>
              </div>

              {/* Voice Recording */}
              <div className="mb-3">
                <label className="form-label">Voice Confirmation</label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  {!proofData.voiceRecording ? (
                    <button
                      type="button"
                      className={`btn btn-outline-secondary ${isRecording ? "btn-warning" : ""}`}
                      onClick={isRecording ? stopRecording : startRecording}
                    >
                      {isRecording ? (
                        <>
                          <FaStop className="me-2" />
                          Stop ({formatTime(recordingTime)})
                        </>
                      ) : (
                        <>
                          <FaMicrophone className="me-2" />
                          Start Recording
                        </>
                      )}
                    </button>
                  ) : (
                    <>
                      <span className="badge bg-secondary">Recording saved ({formatTime(recordingTime)})</span>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          setProofData((prev) => ({ ...prev, voiceRecording: null }));
                          setRecordingTime(0);
                        }}
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </div>
                <small className="text-muted d-block">
                  Record a brief confirmation from the beneficiary acknowledging service completion.
                </small>
              </div>

              {/* GPS Location */}
              <div className="mb-3">
                <label className="form-label">GPS Location *</label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={getCurrentLocation}>
                    <FaMapMarkerAlt className="me-2" />
                    {location ? "Location Captured" : "Capture Location"}
                  </button>
                  {location && (
                    <span className="badge bg-secondary">
                      Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                    </span>
                  )}
                </div>
                <small className="text-muted d-block">Capture GPS coordinates to verify service location.</small>
              </div>

              {/* Service Document */}
              <div className="mb-3">
                <label className="form-label">Service Document</label>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    ref={documentInputRef}
                    onChange={handleDocumentUpload}
                    className="d-none"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => documentInputRef.current?.click()}
                    disabled={!!proofData.serviceDocument}
                  >
                    <FaFileUpload className="me-2" />
                    {proofData.serviceDocument ? "Document Uploaded" : "Upload Document"}
                  </button>
                  {proofData.serviceDocument && (
                    <div className="d-flex align-items-center gap-2">
                      <span>{proofData.serviceDocument.name}</span>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          setProofData((prev) => ({ ...prev, serviceDocument: null }));
                          if (documentInputRef.current) documentInputRef.current.value = "";
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
                <small className="text-muted d-block">
                  Upload invoice, prescription, or other service-related documents.
                </small>
              </div>

              {/* Service Notes */}
              <div className="mb-3">
                <label htmlFor="serviceNotes" className="form-label">
                  Service Notes *
                </label>
                <textarea
                  id="serviceNotes"
                  className="form-control"
                  placeholder="Describe the service provided..."
                  value={proofData.serviceNotes}
                  onChange={(e) => setProofData((prev) => ({ ...prev, serviceNotes: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              {/* Beneficiary Confirmation */}
              <div className="mb-3">
                <label htmlFor="beneficiaryConfirmation" className="form-label">
                  Beneficiary Confirmation
                </label>
                <input
                  type="text"
                  id="beneficiaryConfirmation"
                  className="form-control"
                  placeholder="Beneficiary signature or confirmation code"
                  value={proofData.beneficiaryConfirmation}
                  onChange={(e) =>
                    setProofData((prev) => ({ ...prev, beneficiaryConfirmation: e.target.value }))
                  }
                />
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing Redemption..." : <><FaCheckCircle className="me-2" />Complete Service & Redeem Voucher</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
