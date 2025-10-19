"use client";

import { useState } from "react";
import { VoucherRedemptionModal } from "./VoucherRedemptionModal";
import { useToast } from "../../hooks/useToast";
import { FaQrcode, FaCamera, FaTimes } from "react-icons/fa";

export function VoucherScanner() {
  const [voucherCode, setVoucherCode] = useState("");
  const [scannedVoucher, setScannedVoucher] = useState(null);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const mockVouchers = {
    "VCH-001": {
      id: "VCH-001",
      caseId: "AID-001",
      beneficiaryName: "John Doe",
      serviceType: "Medical Consultation",
      amount: 150,
      validUntil: "2024-12-31",
      status: "active",
      description: "General medical consultation and basic health checkup",
    },
    "VCH-002": {
      id: "VCH-002",
      caseId: "AID-002",
      beneficiaryName: "Jane Smith",
      serviceType: "Prescription Medication",
      amount: 75,
      validUntil: "2024-12-31",
      status: "active",
      description: "Prescription medication for chronic condition management",
    },
    "VCH-003": {
      id: "VCH-003",
      caseId: "AID-003",
      beneficiaryName: "Bob Wilson",
      serviceType: "Emergency Treatment",
      amount: 300,
      validUntil: "2024-12-31",
      status: "active",
      description: "Emergency medical treatment and stabilization",
    },
  };

  const handleManualEntry = (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid voucher code.",
        variant: "destructive",
      });
      return;
    }
    const voucher = mockVouchers[voucherCode.toUpperCase()];
    if (voucher) {
      setScannedVoucher(voucher);
      toast({
        title: "Voucher Found",
        description: `Voucher for ${voucher.beneficiaryName} loaded successfully.`,
      });
    } else {
      toast({
        title: "Voucher Not Found",
        description: "The voucher code you entered is not valid or has expired.",
        variant: "destructive",
      });
    }
  };

  const handleQRScan = async () => {
    setIsScanning(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const voucherIds = Object.keys(mockVouchers);
    const randomVoucherId = voucherIds[Math.floor(Math.random() * voucherIds.length)];
    const voucher = mockVouchers[randomVoucherId];
    setScannedVoucher(voucher);
    setVoucherCode(voucher.id);
    setIsScanning(false);

    toast({
      title: "QR Code Scanned",
      description: `Voucher for ${voucher.beneficiaryName} scanned successfully.`,
    });
  };

  const handleRedeemVoucher = () => {
    if (scannedVoucher) setShowRedemptionModal(true);
  };

  const handleRedemptionComplete = () => {
    setScannedVoucher(null);
    setVoucherCode("");
    setShowRedemptionModal(false);
    toast({
      title: "Service Completed",
      description: "Voucher has been redeemed and service marked as completed.",
    });
  };

  const getServiceTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "medical consultation":
        return "bg-primary text-white";
      case "prescription medication":
        return "bg-success text-white";
      case "emergency treatment":
        return "bg-danger text-white";
      case "dental care":
        return "bg-purple text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* QR Scanner */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex align-items-center">
              <FaQrcode className="me-2" />
              <strong>QR Code Scanner</strong>
            </div>
            <div className="card-body">
              <div className="ratio ratio-1x1 border border-dashed d-flex align-items-center justify-content-center mb-3">
                {isScanning ? (
                  <div className="text-center">
                    <div className="spinner-border text-primary mb-2" role="status"></div>
                    <p className="text-muted">Scanning QR code...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <FaCamera className="text-muted mb-2" size={48} />
                    <p className="text-muted">Position QR code in camera view</p>
                  </div>
                )}
              </div>
              <button className="btn btn-primary w-100" onClick={handleQRScan} disabled={isScanning}>
                {isScanning ? "Scanning..." : "Start QR Scan"}
              </button>
            </div>
          </div>
        </div>

        {/* Manual Entry */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <strong>Manual Entry</strong>
            </div>
            <div className="card-body">
              <form onSubmit={handleManualEntry}>
                <div className="mb-3">
                  <label htmlFor="voucherCode" className="form-label">
                    Voucher Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="voucherCode"
                    placeholder="VCH-001"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Lookup Voucher
                </button>
              </form>
              <small className="text-muted mt-2 d-block">
                Demo codes: VCH-001, VCH-002, VCH-003
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Scanned Voucher Details */}
      {scannedVoucher && (
        <div className="card mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Voucher Details</strong>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setScannedVoucher(null)}>
              <FaTimes />
            </button>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <p>
                  <strong>Voucher ID:</strong> {scannedVoucher.id}
                </p>
                <p>
                  <strong>Beneficiary:</strong> {scannedVoucher.beneficiaryName}
                </p>
                <p>
                  <strong>Service Type:</strong>{" "}
                  <span className={`badge ${getServiceTypeColor(scannedVoucher.serviceType)}`}>
                    {scannedVoucher.serviceType}
                  </span>
                </p>
                <p>
                  <strong>Service Value:</strong>{" "}
                  <span className="fs-4 text-primary">${scannedVoucher.amount}</span>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Case ID:</strong> {scannedVoucher.caseId}
                </p>
                <p>
                  <strong>Valid Until:</strong>{" "}
                  {new Date(scannedVoucher.validUntil).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-secondary text-capitalize">{scannedVoucher.status}</span>
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  <span className="text-muted">{scannedVoucher.description}</span>
                </p>
              </div>
            </div>
            <button className="btn btn-success w-100 mt-3" onClick={handleRedeemVoucher}>
              Redeem Voucher & Provide Service
            </button>
          </div>
        </div>
      )}

      {/* Redemption Modal */}
      {showRedemptionModal && scannedVoucher && (
        <VoucherRedemptionModal
          voucher={scannedVoucher}
          onClose={() => setShowRedemptionModal(false)}
          onComplete={handleRedemptionComplete}
        />
      )}
    </div>
  );
}
