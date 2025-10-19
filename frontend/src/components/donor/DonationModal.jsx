import React, { useState } from "react";
import { Heart, Shield, X, DollarSign, CreditCard } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DonationModal({ caseData, onClose, onDonationComplete }) {
  const [donationAmount, setDonationAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const remainingAmount = caseData.fundingGoal - caseData.currentFunding;
  const suggestedAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (amount) => setDonationAmount(amount.toString());
  const handleCardInputChange = (field, value) =>
    setCardDetails((prev) => ({ ...prev, [field]: value }));

  const handleDonation = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const amount = parseFloat(donationAmount);
    if (amount <= 0 || amount > remainingAmount) {
      alert("Please enter a valid donation amount.");
      setIsProcessing(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const serviceFee = amount * 0.09;
    const netAmount = amount - serviceFee;

    alert(
      `Donation Successful! Thank you for donating $${amount}. $${netAmount.toFixed(
        2
      )} will go to help ${caseData.beneficiaryName}.`
    );

    onDonationComplete(amount);
    setIsProcessing(false);
  };

  const fundingPercentage = (caseData.currentFunding / caseData.fundingGoal) * 100;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                <Heart className="text-primary" size={20} />
              </div>
              <div>
                <h5 className="mb-0">Make a Donation</h5>
                <small className="text-muted">
                  Help {caseData.beneficiaryName} – {caseData.id}
                </small>
              </div>
            </div>
            <button className="btn btn-outline-secondary btn-sm" onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className="modal-body">
            {/* Case Summary */}
            <div className="p-3 bg-light rounded mb-4">
              <div className="mb-2 d-flex flex-wrap gap-2">
                {caseData.assistanceType.map((type) => (
                  <span key={type} className="badge bg-secondary">
                    {type}
                  </span>
                ))}
              </div>
              <p className="small text-muted">{caseData.description}</p>
              <div className="small text-muted d-flex justify-content-between">
                <span>Funding Progress</span>
                <span>
                  ${caseData.currentFunding.toLocaleString()} / $
                  {caseData.fundingGoal.toLocaleString()}
                </span>
              </div>
              <div className="progress my-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${fundingPercentage}%` }}
                ></div>
              </div>
              <div className="small text-muted">
                ${remainingAmount.toLocaleString()} still needed
              </div>
            </div>

            <form onSubmit={handleDonation}>
              {/* Donation Amount */}
              <div className="mb-4">
                <label className="fw-semibold mb-2">Choose Donation Amount</label>
                <div className="d-grid gap-2 mb-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))" }}>
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={`btn ${
                        donationAmount === amount.toString()
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => handleAmountSelect(amount)}
                      disabled={amount > remainingAmount}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <label htmlFor="customAmount" className="form-label">
                  Custom Amount (USD)
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <DollarSign size={16} />
                  </span>
                  <input
                    id="customAmount"
                    type="number"
                    className="form-control border-start-0"
                    placeholder="Enter amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    max={remainingAmount}
                    min="1"
                    required
                  />
                </div>
                {donationAmount && (
                  <div className="small text-muted mt-1">
                    Service fee (9%): ${(parseFloat(donationAmount) * 0.09).toFixed(2)} •
                    Net amount: ${(parseFloat(donationAmount) * 0.91).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="fw-semibold mb-2">Payment Method</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>

              {/* Card Details */}
              {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                <div className="mb-4">
                  <div className="mb-3">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => handleCardInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <CreditCard size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => handleCardInputChange("number", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => handleCardInputChange("expiry", e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardInputChange("cvv", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Anonymous Option */}
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <label htmlFor="anonymous" className="form-check-label">
                  Make this donation anonymous
                </label>
              </div>

              {/* Security Notice */}
              <div className="d-flex align-items-start gap-2 p-3 bg-success bg-opacity-10 rounded border border-success border-opacity-25 mb-4">
                <Shield className="text-success" size={16} />
                <div className="small text-success fw-semibold">
                  Secure Payment: Your payment information is encrypted and secure. Funds are held
                  in escrow until service completion.
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isProcessing || !donationAmount || !paymentMethod}
              >
                {isProcessing ? "Processing Payment..." : (
                  <>
                    <Heart size={16} className="me-2" />
                    Donate ${donationAmount || "0"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
