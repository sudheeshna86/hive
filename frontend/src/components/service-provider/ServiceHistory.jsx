import { useState, useEffect } from "react";
import { FaEye, FaDownload, FaCalendar, FaDollarSign, FaCheckCircle } from "react-icons/fa";

export function ServiceHistory() {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const mockRecords = [
      {
        id: "SRV-001",
        voucherId: "VCH-001",
        caseId: "AID-001",
        beneficiaryName: "John Doe",
        serviceType: "Medical Consultation",
        amount: 150,
        completedAt: "2024-01-15T14:30:00Z",
        status: "completed",
        paymentStatus: "paid",
        serviceNotes: "General health checkup completed. Patient in good health with minor concerns addressed.",
      },
      {
        id: "SRV-002",
        voucherId: "VCH-002",
        caseId: "AID-002",
        beneficiaryName: "Jane Smith",
        serviceType: "Prescription Medication",
        amount: 75,
        completedAt: "2024-01-16T16:45:00Z",
        status: "completed",
        paymentStatus: "paid",
        serviceNotes: "Prescribed medication dispensed for chronic condition management. Patient counseled on usage.",
      },
      {
        id: "SRV-003",
        voucherId: "VCH-003",
        caseId: "AID-003",
        beneficiaryName: "Bob Wilson",
        serviceType: "Emergency Treatment",
        amount: 300,
        completedAt: "2024-01-14T20:15:00Z",
        status: "completed",
        paymentStatus: "pending",
        serviceNotes: "Emergency treatment provided for acute condition. Patient stabilized and discharged.",
      },
    ];
    setServiceRecords(mockRecords);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "primary";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "processing":
        return "primary";
      case "failed":
        return "danger";
      default:
        return "secondary";
    }
  };

  const downloadServiceReport = (record) => {
    const reportData = JSON.stringify(record, null, 2);
    const blob = new Blob([reportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `service-report-${record.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (serviceRecords.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 64, height: 64 }}>
          <FaCheckCircle size={32} className="text-muted" />
        </div>
        <h5>No service history</h5>
        <p className="text-muted">Your completed services will appear here once you start redeeming vouchers.</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {serviceRecords.map((record) => (
        <div key={record.id} className="card shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-start flex-wrap">
            <div>
              <h6 className="mb-1">Service #{record.id}</h6>
              <small className="text-muted d-flex gap-3">
                <span>Voucher: {record.voucherId}</span>
                <span className="d-flex align-items-center gap-1">
                  <FaCalendar size={12} />
                  {new Date(record.completedAt).toLocaleDateString()}
                </span>
              </small>
            </div>
            <div className="d-flex gap-2 flex-wrap mt-2 mt-sm-0">
              <span className={`badge bg-${getStatusColor(record.status)} text-capitalize`}>{record.status}</span>
              <span className={`badge bg-${getPaymentStatusColor(record.paymentStatus)} text-capitalize`}>{record.paymentStatus}</span>
              <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => setSelectedRecord(record)}>
                <FaEye size={14} /> View
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div>
                <p className="mb-1 fw-medium">{record.beneficiaryName}</p>
                <p className="text-muted mb-0">{record.serviceType}</p>
              </div>
              <div className="text-end">
                <div className="d-flex align-items-center gap-1 justify-content-end">
                  <FaDollarSign /> <span className="fw-bold">${record.amount}</span>
                </div>
                <small className="text-muted">Service fee</small>
              </div>
            </div>
            <p className="text-muted mt-2">{record.serviceNotes}</p>
            <div className="d-flex justify-content-between align-items-center border-top pt-2 mt-2">
              <small className="text-muted">Completed: {new Date(record.completedAt).toLocaleString()}</small>
              <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={() => downloadServiceReport(record)}>
                <FaDownload /> Report
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedRecord && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Service Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedRecord(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-6">
                    <small className="fw-medium">Voucher ID</small>
                    <p>{selectedRecord.voucherId}</p>
                  </div>
                  <div className="col-6">
                    <small className="fw-medium">Case ID</small>
                    <p>{selectedRecord.caseId}</p>
                  </div>
                  <div className="col-6">
                    <small className="fw-medium">Beneficiary</small>
                    <p>{selectedRecord.beneficiaryName}</p>
                  </div>
                  <div className="col-6">
                    <small className="fw-medium">Service Type</small>
                    <p>{selectedRecord.serviceType}</p>
                  </div>
                  <div className="col-6">
                    <small className="fw-medium">Service Fee</small>
                    <p className="fw-bold">${selectedRecord.amount}</p>
                  </div>
                  <div className="col-6">
                    <small className="fw-medium">Status</small>
                    <span className={`badge bg-${getStatusColor(selectedRecord.status)} text-capitalize`}>{selectedRecord.status}</span>
                  </div>
                  <div className="col-6">
                    <small className="fw-medium">Payment Status</small>
                    <span className={`badge bg-${getPaymentStatusColor(selectedRecord.paymentStatus)} text-capitalize`}>{selectedRecord.paymentStatus}</span>
                  </div>
                  <div className="col-6">
                    <small className="fw-medium">Completed Date</small>
                    <p>{new Date(selectedRecord.completedAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <small className="fw-medium">Service Notes</small>
                  <p className="bg-light p-3 rounded">{selectedRecord.serviceNotes}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2" onClick={() => downloadServiceReport(selectedRecord)}>
                  <FaDownload /> Download Service Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
