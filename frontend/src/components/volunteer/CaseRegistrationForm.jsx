// components/volunteer/CaseRegistrationForm.jsx
import React, { useState, useRef } from "react";
import { Button, Form, Badge, Card } from "react-bootstrap";
import { FiCamera, FiMic, FiMapPin, FiX, FiSquare } from "react-icons/fi";
import { useToast } from "../../hooks/useToast"; // keep your custom toast hook

const assistanceTypes = ["Food", "Medical", "Shelter", "Education", "Transportation", "Clothing", "Emergency"];

export function CaseRegistrationForm() {
  const [formData, setFormData] = useState({
    beneficiaryName: "",
    age: "",
    gender: "",
    contactNumber: "",
    address: "",
    urgencyLevel: "",
    assistanceType: [],
    description: "",
    medicalCondition: "",
    estimatedCost: "",
    photo: null,
    voiceRecording: null,
    location: null,
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAssistanceTypeToggle = (type) => {
    setFormData((prev) => ({
      ...prev,
      assistanceType: prev.assistanceType.includes(type)
        ? prev.assistanceType.filter((t) => t !== type)
        : [...prev.assistanceType, type],
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({ ...prev, photo: null }));
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setFormData((prev) => ({ ...prev, voiceRecording: blob }));
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => setRecordingTime((prev) => prev + 1), 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
  };

  const removeRecording = () => {
    setFormData((prev) => ({ ...prev, voiceRecording: null }));
    setRecordingTime(0);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: { lat: position.coords.latitude, lng: position.coords.longitude },
          }));
          toast({ title: "Location captured", description: "GPS coordinates recorded." });
        },
        () => {
          toast({ title: "Error", description: "Enable GPS to capture location.", variant: "destructive" });
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const caseId = `AID-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const existingCases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const newCase = { id: caseId, ...formData, status: "pending", createdAt: new Date().toISOString() };
    localStorage.setItem("volunteerCases", JSON.stringify([...existingCases, newCase]));

    toast({
      title: "Case registered successfully!",
      description: `Case ID: ${caseId}.`,
    });

    setFormData({
      beneficiaryName: "",
      age: "",
      gender: "",
      contactNumber: "",
      address: "",
      urgencyLevel: "",
      assistanceType: [],
      description: "",
      medicalCondition: "",
      estimatedCost: "",
      photo: null,
      voiceRecording: null,
      location: null,
    });
    setPhotoPreview(null);
    setRecordingTime(0);
    setIsSubmitting(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Beneficiary Info */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3 text-primary">Beneficiary Information</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Full Name *</Form.Label>
                <Form.Control
                  placeholder="Enter beneficiary's full name"
                  value={formData.beneficiaryName}
                  onChange={(e) => handleInputChange("beneficiaryName", e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Age *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <div className="row g-3 mt-2">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Gender *</Form.Label>
                <Form.Select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mt-3">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter complete address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Assistance Details */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3 text-primary">Assistance Details</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Urgency Level *</Form.Label>
                <Form.Select
                  value={formData.urgencyLevel}
                  onChange={(e) => handleInputChange("urgencyLevel", e.target.value)}
                  required
                >
                  <option value="">Select urgency</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Estimated Cost (USD)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter estimated cost"
                  value={formData.estimatedCost}
                  onChange={(e) => handleInputChange("estimatedCost", e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mt-3">
            <Form.Label>Assistance Type *</Form.Label>
            <div>
              {assistanceTypes.map((type) => (
                <Badge
                  key={type}
                  className={`me-2 mb-2 p-2 ${formData.assistanceType.includes(type) ? "bg-primary" : "bg-light text-dark border"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAssistanceTypeToggle(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Description / Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Additional description..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Medical Condition (if any)</Form.Label>
            <Form.Control
              placeholder="Enter medical condition"
              value={formData.medicalCondition}
              onChange={(e) => handleInputChange("medicalCondition", e.target.value)}
            />
          </Form.Group>
        </Card.Body>
      </Card>

      {/* Media Upload */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3 text-primary">Media / Location</h5>

          <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Form.Control type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} />
              {photoPreview && (
                <Button variant="outline-danger" onClick={removePhoto}>
                  <FiX />
                </Button>
              )}
            </div>
            {photoPreview && (
              <img src={photoPreview} alt="Preview" className="mt-2 rounded" style={{ maxHeight: "150px" }} />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Voice Recording</Form.Label>
            <div className="d-flex align-items-center gap-2">
              {!isRecording && !formData.voiceRecording && (
                <Button variant="primary" onClick={startRecording}>
                  <FiMic /> Start Recording
                </Button>
              )}
              {isRecording && (
                <Button variant="danger" onClick={stopRecording}>
                  <FiSquare /> Stop ({formatTime(recordingTime)})
                </Button>
              )}
              {formData.voiceRecording && (
                <>
                  <audio controls src={URL.createObjectURL(formData.voiceRecording)} className="me-2" />
                  <Button variant="outline-danger" onClick={removeRecording}>
                    <FiX />
                  </Button>
                </>
              )}
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>GPS Location</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Button variant="secondary" onClick={getCurrentLocation}>
                <FiMapPin /> Capture Location
              </Button>
              {formData.location && (
                <Badge bg="success">
                  {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                </Badge>
              )}
            </div>
          </Form.Group>
        </Card.Body>
      </Card>

      <Button type="submit" className="w-100" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Register Case"}
      </Button>
    </Form>
  );
}
