"use client";

import { useState } from "react";
import { VoucherRedemptionModal } from "./VoucherRedemptionModal";
import { useToast } from "../../hooks/useToast";
import { FaQrcode, FaCamera, FaTimes } from "react-icons/fa";

// ---- INLINE CSS STYLES ----
const style = `
.voucher-panel-main {
  background: #f8f9fb;
  border-radius: 18px;
  box-shadow: 0 1px 10px #e7ecf0;
  padding: 2rem 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  animation: fadeInSlideUp 1s cubic-bezier(.44,1.05,.02,.98);
}
.voucher-panel {
  background: #f6f7f9;
  border-radius: 15px;
  box-shadow: 0 2px 12px #e7eaeedb;
  padding: 2rem 1.5rem;
  margin-bottom: 1.5rem;
}
.voucher-panel h5, .voucher-panel label, .voucher-panel strong {
  color: #2a313d;
}
.voucher-panel .subtext {
  color: #8291a4;
  font-size: 0.97rem;
}
.qr-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 7px #eff4fa;
  border: 1.5px solid #e7ecf0;
  margin-bottom: 0;
  animation: fadeInSlideUp 0.7s;
}
.qr-card-header {
  background: #fff;
  border: none;
  border-radius: 12px 12px 0 0;
  font-weight: 700;
  color: #254366;
  letter-spacing: 0.01em;
}
.qr-scan-area {
  border: 2px dashed #c2dae6;
  border-radius: 10px;
  background: #f9fcfd;
  padding: 2.3rem 1.3rem;
  min-height: 265px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.3rem;
  position: relative;
  animation: scanFade 2.2s infinite linear alternate;
  transition: border-color 0.3s;
}
@keyframes scanFade {
  0% {
    border-color: #c2dae6;
    box-shadow: 0 0 0 0 #b8dbe26c;
  }
  60% {
    border-color: #90b8cb;
    box-shadow: 0 0 12px 2px #e0f1f8;
  }
  100% {
    border-color: #67b1d6;
    box-shadow: 0 0 0 0 #d7f1f86c;
  }
}
.qr-scan-area .qr-icon-anim {
  font-size: 2.6rem;
  opacity: 0.13;
  animation: bounceIn 1.3s infinite cubic-bezier(.66,0,.36,.98) alternate;
}
@keyframes bounceIn {
  0% { transform: translateY(0);}
  80% { transform: translateY(-10px);}
  100% { transform: translateY(0);}
}
.manual-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 7px #eff4fa;
  border: 1.5px solid #e7ecf0;
}
.manual-card label {
  font-weight: 600;
}
.manual-card input {
  background: #f8fafb;
  border-radius: 8px;
  border: 1.2px solid #d6dde1;
  color: #223150;
  font-weight: 500;
  font-size: 1.04rem;
}
.manual-card input:focus {
  border: 1.2px solid #2966ff;
  background: #f4f9fb;
  outline: none;
}
.demo-codes-text {
  color: #6787a5;
  font-size: 0.93rem;
  letter-spacing: 0.01em;
  margin-top: 0.6rem;
}
.btn-lookup {
  background: #178544;
  border-radius: 7px;
  color: #fff;
  font-weight: 600;
  margin-top: 0.2rem;
  font-size: 1.13rem;
  border: none;
  letter-spacing: 0.03em;
  transition: background 0.2s;
}
.btn-lookup:active, .btn-lookup:hover {
  background: #116136;
  color: #fff;
}

.details-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 3px 14px #e7ecf07b;
  margin-top: 2.5rem;
  animation: fadeInSlideUp 0.6s 0.1s backwards;
  border: 1.3px solid #e7ecf0;
}
.details-card .card-header {
  background: #f6f7fa;
  border-bottom: none;
  border-radius: 14px 14px 0 0;
}
.details-card .card-body { padding-bottom: 2rem; }
.details-card .btn {
  font-weight: 600;
  padding: 0.65rem 1.1rem;
  font-size: 1.17rem;
  background: #218a65;
  border: none;
}
.details-card .btn:hover {
  background: #12523c;
}

.badge.bg-primary { background: #2966ff!important; }
.badge.bg-success { background: #218a65!important; }
.badge.bg-danger { background: #cd3a23!important; }
.badge.bg-purple { background: #7d53c4!important; }
.badge.bg-secondary { background: #c6cfda!important; color: #325a81!important; }
.badge.text-white { color: #fff!important; }

@keyframes fadeInSlideUp {
  0% { opacity: 0; transform: translateY(36px);}
  70% {opacity: 1; transform: translateY(-4px);}
  100% {opacity: 1; transform: translateY(0);}
}
`;

// -------------- COMPONENT --------------
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
        return "badge bg-primary text-white";
      case "prescription medication":
        return "badge bg-success text-white";
      case "emergency treatment":
        return "badge bg-danger text-white";
      case "dental care":
        return "badge bg-purple text-white";
      default:
        return "badge bg-secondary text-white";
    }
  };

  return (
    <div>
      {/* Inject custom style */}
      <style>{style}</style>
      <div className="voucher-panel-main">
        <div style={{ fontWeight: 700, fontSize: "1.27rem", marginBottom: 3 }}>Voucher Scanner</div>
        <div className="subtext mb-4">Scan voucher QR codes to redeem and provide services</div>

        <div className="row g-4">
          {/* QR SCANNER SECTION */}
          <div className="col-md-7 col-lg-7">
            <div className="voucher-panel qr-card">
              <div className="qr-card-header d-flex align-items-center mb-1" style={{ fontSize: "1.14rem" }}>
                <FaQrcode className="me-2" />
                QR Code Scanner
              </div>
              <div className="subtext mb-3">Scan voucher QR codes with your camera</div>
              <div className="qr-scan-area">
                {isScanning ? (
                  <div className="text-center w-100">
                    <div className="spinner-border text-primary mb-2" role="status"></div>
                    <div className="subtext">Scanning QR code...</div>
                  </div>
                ) : (
                  <div className="text-center w-100">
                    <FaCamera className="qr-icon-anim mb-2" />
                    <div className="subtext" style={{ fontWeight: 500, marginTop: 10 }}>
                      Position QR code in camera view
                    </div>
                  </div>
                )}
              </div>
              <button className="btn btn-lookup w-100" style={{ marginTop: 0 }} onClick={handleQRScan} disabled={isScanning}>
                {isScanning ? "Scanning..." : "Start QR Scan"}
              </button>
            </div>
          </div>

          {/* MANUAL ENTRY SECTION */}
          <div className="col-md-5 col-lg-5">
            <div className="voucher-panel manual-card">
              <div className="mb-2" style={{ fontWeight: 700, fontSize: "1.13rem" }}>Manual Entry</div>
              <div className="subtext mb-2">
                Enter voucher code manually if QR scan fails
              </div>
              <form onSubmit={handleManualEntry} className="mt-3">
                <label htmlFor="voucherCode" className="form-label">
                  Voucher Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="voucherCode"
                  placeholder="Enter voucher code (e.g., VCH-001)"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  disabled={isScanning}
                />
                <button type="submit" className="btn btn-lookup w-100" disabled={isScanning}>
                  Lookup Voucher
                </button>
                <div className="demo-codes-text mt-1"><span className="fw-medium">Demo codes:</span> VCH-001, VCH-002, VCH-003</div>
              </form>
            </div>
          </div>
        </div>

        {/* Scanned Voucher Details Section */}
        {scannedVoucher && (
          <div className="details-card card mt-5">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>Voucher Details</strong>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setScannedVoucher(null)}
                style={{ borderRadius: 6 }}
                aria-label="Close"
              >
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
                    <span className={getServiceTypeColor(scannedVoucher.serviceType)}>
                      {scannedVoucher.serviceType}
                    </span>
                  </p>
                  <p>
                    <strong>Service Value:</strong>{" "}
                    <span style={{ color: "#178544", fontWeight: 800, fontSize: 18 }}>
                      ${scannedVoucher.amount}
                    </span>
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
                    <span className="badge bg-secondary text-capitalize">
                      {scannedVoucher.status}
                    </span>
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    <span style={{ color: "#7f8c9f", fontWeight: 500 }}>
                      {scannedVoucher.description}
                    </span>
                  </p>
                </div>
              </div>
              <button className="btn btn-success w-100 mt-4" onClick={handleRedeemVoucher}>
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
    </div>
  );
}
