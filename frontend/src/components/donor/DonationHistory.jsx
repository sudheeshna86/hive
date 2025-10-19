import React, { useState, useEffect } from "react";
import { Eye, Download, Calendar, DollarSign } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    const storedDonations = JSON.parse(localStorage.getItem("userDonations") || "[]");
    setDonations(
      storedDonations.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "badge bg-success";
      case "processing":
        return "badge bg-warning text-dark";
      case "pending":
        return "badge bg-primary";
      default:
        return "badge bg-secondary";
    }
  };

  const downloadReceipt = (donation) => {
    const receiptData = {
      donationId: donation.id,
      caseId: donation.caseId,
      beneficiary: donation.caseName,
      amount: donation.amount,
      serviceFee: donation.amount * 0.09,
      netAmount: donation.amount * 0.91,
      date: donation.createdAt,
      status: donation.status,
    };

    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donation-receipt-${donation.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (donations.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "70px", height: "70px" }}>
          <DollarSign size={30} className="text-secondary" />
        </div>
        <h5>No donations yet</h5>
        <p className="text-muted">Your donation history will appear here once you make your first donation.</p>
      </div>
    );
  }

  return (
    <div className="container py-3">
      {donations.map((donation) => (
        <div key={donation.id} className="card mb-3 shadow-sm border-0">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Donation #{donation.id}</h6>
              <div className="text-muted small d-flex gap-3">
                <span>To: {donation.caseName}</span>
                <span className="d-flex align-items-center gap-1">
                  <Calendar size={14} /> {new Date(donation.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className={getStatusClass(donation.status)}>
                {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
              </span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setSelectedDonation(donation)}
              >
                <Eye size={16} className="me-1" /> View
              </button>
            </div>
          </div>

          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4 className="text-primary mb-1">${donation.amount.toLocaleString()}</h4>
              <div className="text-muted small">
                Net amount: ${(donation.amount * 0.91).toFixed(2)} • Service fee: $
                {(donation.amount * 0.09).toFixed(2)}
              </div>
            </div>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => downloadReceipt(donation)}
            >
              <Download size={16} className="me-1" /> Receipt
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedDonation && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Donation Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedDonation(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p className="text-muted">Transaction #{selectedDonation.id}</p>

                <div className="row mb-3">
                  <div className="col-6">
                    <small className="text-muted">Case ID</small>
                    <p>{selectedDonation.caseId}</p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Beneficiary</small>
                    <p>{selectedDonation.caseName}</p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Donation Amount</small>
                    <p className="fw-bold text-primary">${selectedDonation.amount.toLocaleString()}</p>
                  </div>
                  <div className="col-6">
                    <small className="text-muted">Status</small>
                    <div>
                      <span className={getStatusClass(selectedDonation.status)}>
                        {selectedDonation.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-light p-3 rounded mb-3">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Donation Amount:</span>
                    <span>${selectedDonation.amount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Service Fee (9%):</span>
                    <span>-${(selectedDonation.amount * 0.09).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between small border-top pt-2 fw-bold">
                    <span>Net Amount to Beneficiary:</span>
                    <span>${(selectedDonation.amount * 0.91).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-muted">Transaction Date</small>
                  <p>{new Date(selectedDonation.createdAt).toLocaleString()}</p>
                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => downloadReceipt(selectedDonation)}
                >
                  <Download size={16} className="me-2" />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
