import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaEye, FaCalendarAlt, FaDollarSign, FaUser, FaMapMarkerAlt } from "react-icons/fa";

export function AssignedVouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [filters, setFilters] = useState({ status: "all", serviceType: "all", urgency: "all" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAssignedVouchers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [vouchers, filters, searchTerm]);

  const loadAssignedVouchers = () => {
    const mockVouchers = [
      { id: "VCH-001", caseId: "AID-001", beneficiaryName: "John Doe", serviceType: "Medical Consultation", amount: 150, validUntil: "2024-12-31", status: "active", description: "General medical consultation", assignedAt: "2024-01-15T10:00:00Z", urgency: "medium", location: "Downtown Medical Center" },
      { id: "VCH-002", caseId: "AID-002", beneficiaryName: "Jane Smith", serviceType: "Prescription Medication", amount: 75, validUntil: "2024-12-31", status: "active", description: "Prescription medication", assignedAt: "2024-01-16T14:30:00Z", urgency: "high", location: "City Pharmacy" },
      { id: "VCH-003", caseId: "AID-003", beneficiaryName: "Bob Wilson", serviceType: "Emergency Treatment", amount: 300, validUntil: "2024-12-31", status: "completed", description: "Emergency medical treatment", assignedAt: "2024-01-14T08:15:00Z", urgency: "critical", location: "Emergency Department" },
      { id: "VCH-004", caseId: "AID-004", beneficiaryName: "Alice Johnson", serviceType: "Dental Care", amount: 200, validUntil: "2024-12-31", status: "active", description: "Dental checkup", assignedAt: "2024-01-17T11:00:00Z", urgency: "low", location: "Dental Clinic" },
    ];
    setVouchers(mockVouchers);
  };

  const applyFilters = () => {
    let filtered = vouchers;
    if (searchTerm) {
      filtered = filtered.filter(
        v => v.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
             v.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.status !== "all") filtered = filtered.filter(v => v.status === filters.status);
    if (filters.serviceType !== "all") filtered = filtered.filter(v => v.serviceType === filters.serviceType);
    if (filters.urgency !== "all") filtered = filtered.filter(v => v.urgency === filters.urgency);
    setFilteredVouchers(filtered);
  };

  const getStatusClass = status => ({ active: "bg-success text-white", completed: "bg-primary text-white", expired: "bg-danger text-white", pending: "bg-warning text-dark" }[status] || "bg-secondary text-white");
  const getUrgencyClass = urgency => ({ critical: "bg-danger text-white", high: "bg-warning text-dark", medium: "bg-info text-white", low: "bg-success text-white" }[urgency] || "bg-secondary text-white");
  const getServiceTypeClass = type => ({ "medical consultation": "bg-primary text-white", "prescription medication": "bg-success text-white", "emergency treatment": "bg-danger text-white", "dental care": "bg-purple text-white" }[type.toLowerCase()] || "bg-secondary text-white");

  return (
    <div>
      {/* Filters */}
      <div className="row g-3 mb-4 bg-white p-3 rounded shadow-sm">
        <div className="col-md-3">
          <input placeholder="Search" className="form-control" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filters.serviceType} onChange={e => setFilters({ ...filters, serviceType: e.target.value })}>
            <option value="all">All Services</option>
            <option value="Medical Consultation">Medical Consultation</option>
            <option value="Prescription Medication">Prescription Medication</option>
            <option value="Emergency Treatment">Emergency Treatment</option>
            <option value="Dental Care">Dental Care</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filters.urgency} onChange={e => setFilters({ ...filters, urgency: e.target.value })}>
            <option value="all">All Urgency</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Voucher List */}
      {filteredVouchers.map(v => (
        <div key={v.id} className="card mb-3 shadow-sm">
          <div className="card-header d-flex justify-content-between">
            <div>
              <strong>{v.id}</strong> <span className={`badge ${getUrgencyClass(v.urgency)}`}>{v.urgency}</span>
            </div>
            <div>
              <span className={`badge ${getStatusClass(v.status)} me-2`}>{v.status}</span>
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setSelectedVoucher(v)}><FaEye /> View</button>
            </div>
          </div>
          <div className="card-body">
            <p><FaUser /> {v.beneficiaryName} | <FaCalendarAlt /> {new Date(v.assignedAt).toLocaleDateString()} | <FaMapMarkerAlt /> {v.location}</p>
            <span className={`badge ${getServiceTypeClass(v.serviceType)} mb-2`}>{v.serviceType}</span>
            <p>{v.description}</p>
            <div className="d-flex justify-content-between">
              <div><FaDollarSign /> ${v.amount}</div>
              <small>Valid until: {new Date(v.validUntil).toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      ))}

      {/* Modal using Portal */}
      {selectedVoucher &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1040,
              }}
              onClick={() => setSelectedVoucher(null)}
            ></div>

            {/* Modal */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1050,
                overflowY: "auto",
                padding: "1rem",
              }}
            >
              <div
                className="modal-dialog modal-lg"
                style={{
                  maxWidth: "800px",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <div
                  className="modal-content shadow-lg rounded"
                  style={{ backgroundColor: "white", padding: "1.5rem" }}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">{selectedVoucher.id}</h5>
                    <button
                      className="btn-close"
                      onClick={() => setSelectedVoucher(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <strong>Beneficiary:</strong> {selectedVoucher.beneficiaryName}
                      </div>
                      <div className="col-md-6">
                        <strong>Case ID:</strong> {selectedVoucher.caseId}
                      </div>
                      <div className="col-md-6">
                        <strong>Service Type:</strong>{" "}
                        <span
                          className={`badge ${getServiceTypeClass(
                            selectedVoucher.serviceType
                          )}`}
                        >
                          {selectedVoucher.serviceType}
                        </span>
                      </div>
                      <div className="col-md-6">
                        <strong>Service Value:</strong> ${selectedVoucher.amount}
                      </div>
                      <div className="col-md-6">
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${getStatusClass(selectedVoucher.status)}`}
                        >
                          {selectedVoucher.status}
                        </span>
                      </div>
                      <div className="col-md-6">
                        <strong>Urgency:</strong>{" "}
                        <span
                          className={`badge ${getUrgencyClass(selectedVoucher.urgency)}`}
                        >
                          {selectedVoucher.urgency}
                        </span>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <strong>Description:</strong>
                      <p>{selectedVoucher.description}</p>
                      <strong>Location:</strong>
                      <p>{selectedVoucher.location}</p>
                      <p>
                        Assigned: {new Date(selectedVoucher.assignedAt).toLocaleDateString()} | Valid until:{" "}
                        {new Date(selectedVoucher.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
