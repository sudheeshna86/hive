"use client"

import { useState, useRef } from "react";
import {
  FaCamera,
  FaMicrophone,
  FaMapMarkerAlt,
  FaTimes,
  FaFileUpload,
  FaCheckCircle,
  FaStop,
} from "react-icons/fa";
import { useToast } from "../../hooks/useToast";

const modalStyle = `
.vr-marvel-modal {
  background: rgba(28,30,40,0.65);
  position: fixed; top:0; left:0; right:0; bottom:0;
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
  animation: fadeInBg 0.6s;
}
@keyframes fadeInBg {
  from { background: rgba(28,30,40,0.05);}
  to { background: rgba(28,30,40,0.65);}
}
.vr-modal-content {
  background: #fcfdff;
  border-radius: 18px;
  max-height: 90vh;
  overflow-y: auto;
  width: 95%;
  max-width: 920px;
  animation: slideFadeUp 0.6s cubic-bezier(.44,1.05,.02,.98);
  padding: 0;
}
@keyframes slideFadeUp {
  0% {opacity:0; transform: translateY(50px);}
  80% {opacity:1; transform: translateY(-5px);}
  100% {opacity:1; transform: translateY(0);}
}
.vr-modal-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 2rem; border-radius: 18px 18px 0 0;
  background: linear-gradient(90deg, #e3eafc 0%, #f7fafd 100%);
}
.vr-modal-title { font-weight:700; font-size:1.32rem; color:#2651a6; margin-bottom:0.2rem; }
.vr-modal-subtext { font-size:0.98rem; color:#8695b3; }
.vr-modal-body { padding:2rem; }
.vr-summary-card { display:flex; flex-wrap:wrap; gap:2rem; padding:1.3rem 1.7rem; border-radius:12px; border:1.2px solid #e7ecf0; margin-bottom:2rem; background:#f7fafc; }
.vr-summary-item strong { color:#1f3357; font-size:1rem; display:block; margin-bottom:0.2rem;}
.vr-summary-item .vr-amount { font-weight:bold; font-size:1.17rem; color:#218a65;}
.vr-section-title { font-weight:700; font-size:1.13rem; color:#2756b4; margin-bottom:1rem; }
.vr-proof-group { margin-bottom:1.8rem; border-bottom:1px solid #f0f1f5; padding-bottom:0.5rem; }
.vr-proof-group:last-child { border-bottom:none; }
.vr-input-label { font-weight:600; color:#234477; margin-bottom:0.5rem; }
.vr-input-note { font-size:0.95rem; color:#9faabb; margin-top:0.25rem; }
.vr-upload-btn, .vr-mic-btn, .vr-location-btn { display:inline-flex; align-items:center; gap:6px; font-weight:500; padding:0.55rem 1rem; border-radius:8px; border:1.5px solid #d3e1f7; background:#f9fbff; color:#3a5673; cursor:pointer; transition:all 0.18s; }
.vr-upload-btn:hover, .vr-mic-btn:hover, .vr-location-btn:hover { border-color:#218a65; color:#218a65; background:#f3faf5; }
.vr-remove-btn { background:#faf2f2; color:#cd3a23; border:1.2px solid #e7bcb8; border-radius:7px; margin-left:5px; cursor:pointer; padding:0.3rem 0.5rem; }
.vr-remove-btn:hover { background:#fccbc0; color:#87180a; }
.vr-file-thumb-box { width:150px; height:150px; border-radius:10px; border:1.4px solid #e7ecf0; overflow:hidden; margin-top:0.5rem; margin-bottom:0.5rem; display:flex; justify-content:center; align-items:center; }
.vr-file-thumb { width:100%; height:100%; object-fit:cover; border-radius:8px; }
.vr-notes-input { width:100%; border-radius:10px; border:1.2px solid #ccd4de; background:#f8fbfe; color:#18304c; min-height:80px; padding:0.5rem; font-size:1.05rem; }
.vr-notes-input:focus { outline:none; border-color:#3e7cf1; background:#f3f7fd; }
.vr-textbox { width:100%; border-radius:10px; border:1.2px solid #ccd4de; background:#f9fbfd; color:#192c47; padding:0.45rem 0.75rem; font-size:1.05rem; }
.vr-textbox:focus { outline:none; border-color:#218a65; background:#f3faf5; }
.vr-submit-btn { width:100%; display:flex; justify-content:center; align-items:center; gap:10px; padding:0.8rem 0; font-size:1.13rem; font-weight:700; border:none; border-radius:8px; color:#fff; background:linear-gradient(93deg,#218a65,#2966ff 110%); cursor:pointer; transition:all 0.17s; }
.vr-submit-btn:hover { background:linear-gradient(93deg,#157955,#2357ca 110%); }
@media (max-width:900px) { .vr-summary-card { flex-direction:column; gap:1rem; } }
`;

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofData((prev) => ({ ...prev, servicePhoto: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofData((prev) => ({ ...prev, serviceDocument: file }));
      toast({ title: "Document Uploaded", description: `${file.name} uploaded successfully.` });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setProofData((prev) => ({ ...prev, voiceRecording: blob }));
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } catch {
      toast({ title: "Error", description: "Microphone access denied", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          toast({ title: "Location Captured", description: "GPS coordinates saved." });
        },
        () => toast({ title: "Location Error", description: "Enable GPS", variant: "destructive" })
      );
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proofData.servicePhoto || !proofData.serviceNotes || !location) {
      toast({ title: "Missing Info", description: "Photo, notes, and GPS required.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 2000));
    const redemptionData = { voucherId: voucher.id, caseId: voucher.caseId, providerId: JSON.parse(localStorage.getItem("user")||"{}").id, serviceType: voucher.serviceType, amount: voucher.amount, proofData:{...proofData, location,timestamp:new Date().toISOString()}, status:"completed", redeemedAt:new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("voucherRedemptions")||"[]");
    localStorage.setItem("voucherRedemptions", JSON.stringify([...existing, redemptionData]));
    toast({ title: "Voucher Redeemed!", description: `Service for ${voucher.beneficiaryName} completed.` });
    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="vr-marvel-modal">
      <style>{modalStyle}</style>
      <div className="vr-modal-content">
        <div className="vr-modal-header">
          <div>
            <div className="vr-modal-title">Redeem Voucher - {voucher.id}</div>
            <div className="vr-modal-subtext">Provide service to {voucher.beneficiaryName}</div>
          </div>
          <button type="button" onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}><FaTimes /></button>
        </div>
        <div className="vr-modal-body">
          <form onSubmit={handleSubmit}>
            {/* Summary */}
            <div className="vr-summary-card">
              <div className="vr-summary-item"><strong>Service Type</strong>{voucher.serviceType}</div>
              <div className="vr-summary-item"><strong>Service Value</strong><div className="vr-amount">${voucher.amount}</div></div>
              <div className="vr-summary-item"><strong>Beneficiary</strong>{voucher.beneficiaryName}</div>
            </div>

            <div className="vr-section-title">Service Verification</div>

            {/* Photo */}
            <div className="vr-proof-group">
              <div className="vr-input-label">Service Photo *</div>
              <div className="d-flex gap-2">
                <input type="file" accept="image/*" ref={photoInputRef} onChange={handlePhotoUpload} className="d-none"/>
                <button type="button" className="vr-upload-btn" onClick={()=>photoInputRef.current?.click()} disabled={!!proofData.servicePhoto}><FaCamera/> {proofData.servicePhoto?"Uploaded":"Take Photo"}</button>
                {proofData.servicePhoto && <button type="button" className="vr-remove-btn" onClick={()=>{setProofData({...proofData, servicePhoto:null}); setPhotoPreview(null); if(photoInputRef.current) photoInputRef.current.value="";}}><FaTimes/></button>}
              </div>
              {photoPreview && <div className="vr-file-thumb-box"><img src={photoPreview} className="vr-file-thumb"/></div>}
              <div className="vr-input-note">Show voucher and beneficiary in photo</div>
            </div>

            {/* Voice */}
            <div className="vr-proof-group">
              <div className="vr-input-label">Voice Confirmation</div>
              <div className="d-flex gap-2">
                {!proofData.voiceRecording ? (
                  <button type="button" className="vr-mic-btn" onClick={isRecording?stopRecording:startRecording}>
                    {isRecording ? <><FaStop/> Stop ({formatTime(recordingTime)})</> : <><FaMicrophone/> Start Recording</>}
                  </button>
                ) : (
                  <>
                    <span className="badge bg-secondary">Saved ({formatTime(recordingTime)})</span>
                    <button type="button" className="vr-remove-btn" onClick={()=>{setProofData({...proofData, voiceRecording:null}); setRecordingTime(0);}}><FaTimes/></button>
                  </>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="vr-proof-group">
              <div className="vr-input-label">GPS Location *</div>
              <div className="d-flex gap-2 align-items-center">
                <button type="button" className="vr-location-btn" onClick={getCurrentLocation}><FaMapMarkerAlt/> {location?"Captured":"Capture"}</button>
                {location && <span className="vr-loc-indicator">Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}</span>}
              </div>
            </div>

            {/* Document */}
            <div className="vr-proof-group">
              <div className="vr-input-label">Service Document</div>
              <div className="d-flex gap-2 align-items-center">
                <input type="file" ref={documentInputRef} onChange={handleDocumentUpload} className="d-none" accept=".pdf,.doc,.docx,.jpg,.png"/>
                <button type="button" className="vr-upload-btn" onClick={()=>documentInputRef.current?.click()} disabled={!!proofData.serviceDocument}><FaFileUpload/> {proofData.serviceDocument?"Uploaded":"Upload"}</button>
                {proofData.serviceDocument && <div className="d-flex gap-2 align-items-center"><span>{proofData.serviceDocument.name}</span><button type="button" className="vr-remove-btn" onClick={()=>{setProofData({...proofData, serviceDocument:null}); if(documentInputRef.current) documentInputRef.current.value=""}}><FaTimes/></button></div>}
              </div>
            </div>

            {/* Notes */}
            <div className="vr-proof-group">
              <div className="vr-input-label">Service Notes *</div>
              <textarea className="vr-notes-input" placeholder="Describe service..." value={proofData.serviceNotes} onChange={e=>setProofData({...proofData, serviceNotes:e.target.value})} required/>
            </div>

            {/* Beneficiary Confirmation */}
            <div className="vr-proof-group">
              <div className="vr-input-label">Beneficiary Confirmation</div>
              <input type="text" className="vr-textbox" placeholder="Signature/code" value={proofData.beneficiaryConfirmation} onChange={e=>setProofData({...proofData, beneficiaryConfirmation:e.target.value})}/>
            </div>

            <button type="submit" className="vr-submit-btn" disabled={isSubmitting}>{isSubmitting? "Processing..." : <><FaCheckCircle/> Redeem Voucher</>}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
