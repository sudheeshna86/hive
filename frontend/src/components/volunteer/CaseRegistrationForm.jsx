import { useState } from "react";
import { Check, Upload, Camera, Mic, MapPin } from "lucide-react";

const steps = ["Basic Info", "Media", "Tags & Urgency", "Review"];
const tags = [
  "medical",
  "bed_ridden",
  "child",
  "senior",
  "pregnant",
  "mental_health",
];

export default function CaseRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    primaryNeed: "",
    notes: "",
    photo: null,
    photoPreview: "",
    audio: null,
    location: { lat: 0, lng: 0, address: "" },
    selectedTags: [],
    urgency: "",
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleLocationCapture = () => {
    const mockLocation = {
      lat: 14.5995,
      lng: 120.9842,
      address: "Makati City, Metro Manila, Philippines",
    };
    setFormData((prev) => ({
      ...prev,
      location: mockLocation,
    }));
  };

  const handleTagToggle = (tag) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag],
    }));
  };

  const handleUrgencyChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      urgency: e.target.value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleSubmit = () => {
    console.log("Case submitted:", formData);
  };

  return (
    <div className="container py-4 d-flex justify-content-center" style={{ minHeight: "100vh", background: "#f3f4f8" }}>
      <div className="card shadow-sm" style={{ borderRadius: "18px", maxWidth: "700px", width: "100%" }}>
        <div className="card-body px-4 py-4" style={{ background: "#f7f8fa", borderTopLeftRadius: "18px", borderTopRightRadius: "18px" }}>
          {/* Step Indicator */}
          <div className="d-flex justify-content-between align-items-center mb-4 pt-2" style={{ gap: "12px" }}>
            {steps.map((step, idx) => (
              <div key={step} className="flex-grow-1 d-flex flex-column align-items-center">
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle`}
                  style={{
                    height: "38px",
                    width: "38px",
                    border: idx === currentStep ? "2px solid #1976d2" : "2px solid #dbe1e8",
                    background: idx < currentStep ? "#22c55e" : idx === currentStep ? "#1976d2" : "#fff",
                    color: idx <= currentStep ? "#fff" : "#1976d2",
                    fontWeight: "600",
                    fontSize: "17px",
                    transition: "all .2s",
                  }}
                >
                  {idx < currentStep ? <Check size={19} color="#fff" /> : idx + 1}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontSize: "14px",
                    color: idx === currentStep ? "#1976d2" : "#7b809b",
                    fontWeight: idx === currentStep ? "600" : "400",
                  }}
                >
                  {step}
                </div>
              </div>
            ))}
          </div>
          <hr style={{ borderTop: "1px solid #ededed", marginBottom: "32px", marginTop: "-10px" }} />
          {/* STEP 0: Basic Info */}
          {currentStep === 0 && (
            <div>
              <h5 style={{ fontWeight: 600 }} className="mb-4">
                Basic Information
              </h5>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label" style={{ fontWeight: 500 }}>
                  Full Name (Optional)
                </label>
                <input
                  className="form-control"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  style={{ background: "#f9fafc", borderRadius: "8px" }}
                />
              </div>
              <div className="row mb-3 g-2">
                <div className="col">
                  <label htmlFor="age" className="form-label" style={{ fontWeight: 500 }}>
                    Approximate Age
                  </label>
                  <input
                    className="form-control"
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    style={{ background: "#f9fafc", borderRadius: "8px" }}
                  />
                </div>
                <div className="col">
                  <label htmlFor="gender" className="form-label" style={{ fontWeight: 500 }}>
                    Gender
                  </label>
                  <select
                    className="form-select"
                    aria-label="Gender"
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                    style={{ background: "#f9fafc", borderRadius: "8px" }}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="primaryNeed" className="form-label" style={{ fontWeight: 500 }}>
                  Primary Need *
                </label>
                <select
                  className="form-select"
                  id="primaryNeed"
                  value={formData.primaryNeed}
                  onChange={(e) => setFormData((prev) => ({ ...prev, primaryNeed: e.target.value }))}
                  required
                  style={{ background: "#f9fafc", borderRadius: "8px" }}
                >
                  <option value="">Select primary need</option>
                  <option value="Food">Food</option>
                  <option value="Shelter">Shelter</option>
                  <option value="Medical">Medical</option>
                  <option value="Transport">Transport</option>
                  <option value="Livelihood">Livelihood</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-0">
                <label htmlFor="notes" className="form-label" style={{ fontWeight: 500 }}>
                  Notes *
                </label>
                <textarea
                  id="notes"
                  className="form-control"
                  rows={4}
                  required
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Describe the situation and what help is needed..."
                  style={{ background: "#f9fafc", borderRadius: "8px" }}
                />
              </div>
            </div>
          )}
          {/* STEP 1: Media Upload */}
          {currentStep === 1 && (
            <div>
              <h5 style={{ fontWeight: 600 }} className="mb-4">
                Media Upload
              </h5>
              {/* Photo */}
              <div className="mb-4">
                <label className="mb-2 fw-medium" style={{ fontWeight: 500 }}>
                  Photo (Required)
                </label>
                <div
                  className="mb-2 text-center"
                  style={{
                    border: "1.5px dashed #dbe1e8",
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "36px 10px 18px 10px",
                  }}
                >
                  {!formData.photoPreview ? (
                    <>
                      <svg width="44" height="44" fill="none" stroke="#6d7580" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-2" style={{ display: "block", margin: "0 auto 6px auto" }}>
                        <path d="M4.5 18.5v-11A2.5 2.5 0 017 5h2m6 0h2a2.5 2.5 0 012.5 2.5v11a2.5 2.5 0 01-2.5 2.5H7A2.5 2.5 0 014.5 18.5z" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                      <div>
                        <button
                          type="button"
                          className="btn btn-light border shadow-sm mt-2"
                          style={{ borderRadius: "8px", fontWeight: "500" }}
                          onClick={() => document.getElementById("photo-input").click()}
                        >
                          <Upload size={20} className="me-2" /> Upload Photo
                        </button>
                      </div>
                      <p className="small text-muted mt-2" style={{ fontSize: "15px" }}>
                        Max 5MB (JPG, PNG)
                      </p>
                    </>
                  ) : (
                    <div>
                      <img
                        src={formData.photoPreview}
                        alt="Preview"
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: 180 }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary px-3 mt-2"
                        onClick={() => document.getElementById("photo-input").click()}
                      >
                        Change Photo
                      </button>
                    </div>
                  )}
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="d-none"
                  />
                </div>
              </div>
              {/* Voice Message */}
              <div className="mb-4">
                <label className="mb-2 fw-medium" style={{ fontWeight: 500 }}>
                  Voice Message (Optional)
                </label>
                <div
                  className="bg-white"
                  style={{
                    border: "1.5px solid #dbe1e8",
                    borderRadius: "10px",
                    padding: "0px",
                  }}
                >
                  <button
                    type="button"
                    className="btn w-100 d-flex align-items-center justify-content-center bg-white"
                    style={{
                      height: "48px",
                      fontWeight: "500",
                      boxShadow: "none",
                      color: "#000",
                    }}
                  >
                    <Mic size={18} className="me-2" />
                    Record Audio (Max 60s)
                  </button>
                </div>
              </div>
              {/* Location */}
              <div className="mb-4">
                <label className="mb-2 fw-medium" style={{ fontWeight: 500 }}>
                  Location
                </label>
                <div
                  className="bg-white"
                  style={{
                    border: "1.5px solid #dbe1e8",
                    borderRadius: "10px",
                    padding: "0px",
                  }}
                >
                  <button
                    type="button"
                    className="btn w-100 d-flex align-items-center justify-content-center bg-white"
                    style={{
                      height: "48px",
                      fontWeight: "500",
                      boxShadow: "none",
                      color: "#000",
                    }}
                    onClick={handleLocationCapture}
                  >
                    <MapPin size={18} className="me-2" />
                    Capture Current Location
                  </button>
                  {formData.location.address && (
                    <div className="small text-center py-2" style={{ color: "#494d53" }}>
                      <div className="font-monospace text-muted">
                        {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                      </div>
                      <div className="mt-1">{formData.location.address}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* STEP 2: Tags & Urgency */}
          {currentStep === 2 && (
            <div>
              {/* Tags */}
              <div className="mb-4">
                <label className="mb-2 fw-medium" style={{ fontWeight: 500 }}>
                  Tags
                </label>
                <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge px-3 py-2 rounded-3"
                      style={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        color: "#444",
                        fontSize: "15px",
                        fontWeight: 500,
                        cursor: "pointer",
                        boxShadow: formData.selectedTags.includes(tag)
                          ? "0 0 0 2px #2563eb"
                          : "none",
                        backgroundColor: formData.selectedTags.includes(tag)
                          ? "#e8f0fe"
                          : "#fff",
                        transition: "all .15s",
                      }}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
              {/* Urgency */}
              <div>
                <label className="mb-2 fw-medium" style={{ fontWeight: 500 }}>
                  Urgency Level *
                </label>
                <div className="pt-2">
                  {[
                    { value: "CRITICAL", label: "Life-threatening" },
                    { value: "HIGH", label: "Immediate attention needed" },
                    { value: "MEDIUM", label: "Important but not urgent" },
                    { value: "LOW", label: "Can wait" },
                  ].map(({ value, label }) => (
                    <div key={value} className="form-check mb-2 d-flex align-items-center" style={{ gap: 8 }}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="urgency"
                        id={value}
                        value={value}
                        checked={formData.urgency === value}
                        onChange={handleUrgencyChange}
                        style={{ marginTop: -2, marginRight: 10 }}
                      />
                      <label htmlFor={value} style={{ fontWeight: 700, fontSize: "16px", color: "#2563eb", marginRight: 6 }}>
                        {value}
                      </label>
                      <span className="ms-1 text-muted" style={{ fontWeight: 400, fontSize: "15px" }}>
                        ({label})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* STEP 3: Review */}
          {currentStep === 3 && (
            <div>
              <h5 style={{ fontWeight: 600 }} className="mb-4">
                Review & Submit
              </h5>
              <div className="mb-3"><span className="text-secondary small">Name</span>
                <div className="fw-medium">{formData.fullName || "Anonymous"}</div></div>
              <div className="row mb-3">
                <div className="col"><div className="text-secondary small">Age</div>
                  <div className="fw-medium">{formData.age || "N/A"}</div></div>
                <div className="col"><div className="text-secondary small">Gender</div>
                  <div className="fw-medium">{formData.gender || "N/A"}</div></div>
              </div>
              <div className="mb-3"><div className="text-secondary small">Primary Need</div>
                <div className="fw-medium">{formData.primaryNeed}</div></div>
              <div className="mb-3"><div className="text-secondary small">Notes</div>
                <div>{formData.notes}</div></div>
              {formData.photoPreview && (
                <div className="mb-3"><div className="text-secondary small mb-2">Photo</div>
                  <img src={formData.photoPreview} alt="Preview" className="img-fluid rounded mb-2" style={{ maxHeight: 180 }} />
                </div>
              )}
              {formData.location.address && (
                <div className="mb-3"><div className="text-secondary small">Location</div>
                  <div>{formData.location.address}</div></div>
              )}
              {formData.selectedTags.length > 0 && (
                <div className="mb-3"><div className="text-secondary small mb-2">Tags</div>
                  <div>
                    {formData.selectedTags.map((tag) => (
                      <span key={tag} className="badge rounded-pill bg-secondary text-white me-1">
                        {tag.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-3"><div className="text-secondary small">Urgency</div>
                <div className="fw-medium">{formData.urgency}</div></div>
            </div>
          )}
          {/* Buttons */}
          <div className="mt-4 d-flex">
            <button
              type="button"
              className="btn btn-light px-4"
              onClick={handleBack}
              disabled={currentStep === 0}
              style={{
                borderRadius: "6px",
                background: "#f3f8fe",
                color: "#9daecb",
                border: "none",
                boxShadow: "none",
                fontWeight: "500",
              }}
            >
              Back
            </button>
            <div className="ms-auto">
              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  className="btn px-4"
                  style={{
                    borderRadius: "6px",
                    background: "#2563eb",
                    color: "#fff",
                    fontWeight: "500",
                    border: "none",
                  }}
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="btn px-4"
                  style={{
                    borderRadius: "6px",
                    background: "#2563eb",
                    color: "#fff",
                    fontWeight: "500",
                    border: "none",
                  }}
                  onClick={handleSubmit}
                >
                  Submit Case
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
