import { useState, useEffect } from "react";
import { FaEye, FaCalendarAlt, FaDollarSign, FaUser, FaMapMarkerAlt } from "react-icons/fa";

export function AssignedVouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [filteredVouchers, setFilteredVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    serviceType: "all",
    urgency: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAssignedVouchers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [vouchers, filters, searchTerm]);

  const loadAssignedVouchers = () => {
    const mockVouchers = [
      {
        id: "VCH-001",
        caseId: "AID-001",
        beneficiaryName: "John Doe",
        serviceType: "Medical Consultation",
        amount: 150,
        validUntil: "2024-12-31",
        status: "active",
        description: "General medical consultation and basic health checkup",
        assignedAt: "2024-01-15T10:00:00Z",
        urgency: "medium",
        location: "Downtown Medical Center",
      },
      {
        id: "VCH-002",
        caseId: "AID-002",
        beneficiaryName: "Jane Smith",
        serviceType: "Prescription Medication",
        amount: 75,
        validUntil: "2024-12-31",
        status: "active",
        description: "Prescription medication for chronic condition management",
        assignedAt: "2024-01-16T14:30:00Z",
        urgency: "high",
        location: "City Pharmacy",
      },
      {
        id: "VCH-003",
        caseId: "AID-003",
        beneficiaryName: "Bob Wilson",
        serviceType: "Emergency Treatment",
        amount: 300,
        validUntil: "2024-12-31",
        status: "completed",
        description: "Emergency medical treatment and stabilization",
        assignedAt: "2024-01-14T08:15:00Z",
        urgency: "critical",
        location: "Emergency Department",
      },
      {
        id: "VCH-004",
        caseId: "AID-004",
        beneficiaryName: "Alice Johnson",
        serviceType: "Dental Care",
        amount: 200,
        validUntil: "2024-12-31",
        status: "active",
        description: "Dental checkup and basic treatment",
        assignedAt: "2024-01-17T11:00:00Z",
        urgency: "low",
        location: "Dental Clinic",
      },
    ];
    setVouchers(mockVouchers);
  };

  const applyFilters = () => {
    let filtered = vouchers;

    if (searchTerm) {
      filtered = filtered.filter(
        (v) =>
          v.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status !== "all") filtered = filtered.filter((v) => v.status === filters.status);
    if (filters.serviceType !== "all") filtered = filtered.filter((v) => v.serviceType === filters.serviceType);
    if (filters.urgency !== "all") filtered = filtered.filter((v) => v.urgency === filters.urgency);

    setFilteredVouchers(filtered);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "bg-success text-white";
      case "completed":
        return "bg-primary text-white";
      case "expired":
        return "bg-danger text-white";
      case "pending":
        return "bg-warning text-dark";
      default:
        return "bg-secondary text-white";
    }
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case "critical":
        return "bg-danger text-white";
      case "high":
        return "bg-warning text-dark";
      case "medium":
        return "bg-info text-white";
      case "low":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const getServiceTypeClass = (serviceType) => {
    switch (serviceType.toLowerCase()) {
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

  if (vouchers.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
          <FaDollarSign size={24} />
        </div>
        <h5>No vouchers assigned</h5>
        <p className="text-muted">Vouchers will appear here when they are assigned to your services.</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      {/* Filters */}
      <div className="row g-3 mb-4 p-3 bg-light rounded">
        <div className="col-md-3">
          <label className="form-label">Search Vouchers</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, ID, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Status</label>
          <select className="form-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Service Type</label>
          <select className="form-select" value={filters.serviceType} onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}>
            <option value="all">All Services</option>
            <option value="Medical Consultation">Medical Consultation</option>
            <option value="Prescription Medication">Prescription Medication</option>
            <option value="Emergency Treatment">Emergency Treatment</option>
            <option value="Dental Care">Dental Care</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Urgency</label>
          <select className="form-select" value={filters.urgency} onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}>
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Vouchers List */}
      {filteredVouchers.length === 0 && (
        <div className="text-center py-5">
          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "60px", height: "60px" }}>
            <FaEye size={24} />
          </div>
          <h5>No vouchers match your filters</h5>
          <p className="text-muted">Try adjusting your search criteria to see more vouchers.</p>
        </div>
      )}

      {filteredVouchers.map((voucher) => (
        <div key={voucher.id} className="card mb-3 shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <strong>{voucher.id}</strong>
              <span className={`badge ${getUrgencyClass(voucher.urgency)}`}>{voucher.urgency}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className={`badge ${getStatusClass(voucher.status)}`}>{voucher.status}</span>
              <button className="btn btn-outline-secondary btn-sm d-flex align-items-center" onClick={() => setSelectedVoucher(voucher)}>
                <FaEye className="me-1" /> View
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="mb-2">
              <span className="me-3">
                <FaUser /> {voucher.beneficiaryName}
              </span>
              <span className="me-3">
                <FaCalendarAlt /> {new Date(voucher.assignedAt).toLocaleDateString()}
              </span>
              <span>
                <FaMapMarkerAlt /> {voucher.location}
              </span>
            </div>
            <span className={`badge ${getServiceTypeClass(voucher.serviceType)} mb-2`}>{voucher.serviceType}</span>
            <p>{voucher.description}</p>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <FaDollarSign className="me-1" /> <strong>${voucher.amount}</strong>
              </div>
              <small className="text-muted">Valid until: {new Date(voucher.validUntil).toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      ))}

      {/* Voucher Modal */}
      {selectedVoucher && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedVoucher.id}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedVoucher(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <strong>Beneficiary:</strong> {selectedVoucher.beneficiaryName}
                  </div>
                  <div className="col-md-6">
                    <strong>Case ID:</strong> {selectedVoucher.caseId}
                  </div>
                  <div className="col-md-6">
                    <strong>Service Type:</strong> <span className={`badge ${getServiceTypeClass(selectedVoucher.serviceType)}`}>{selectedVoucher.serviceType}</span>
                  </div>
                  <div className="col-md-6">
                    <strong>Service Value:</strong> <span className="fw-bold">${selectedVoucher.amount}</span>
                  </div>
                  <div className="col-md-6">
                    <strong>Status:</strong> <span className={`badge ${getStatusClass(selectedVoucher.status)}`}>{selectedVoucher.status}</span>
                  </div>
                  <div className="col-md-6">
                    <strong>Urgency:</strong> <span className={`badge ${getUrgencyClass(selectedVoucher.urgency)}`}>{selectedVoucher.urgency}</span>
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Description:</strong>
                  <p>{selectedVoucher.description}</p>
                </div>
                <div className="mb-2">
                  <strong>Service Location:</strong>
                  <p>{selectedVoucher.location}</p>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <strong>Assigned Date:</strong> {new Date(selectedVoucher.assignedAt).toLocaleDateString()}
                  </div>
                  <div className="col-md-6">
                    <strong>Valid Until:</strong> {new Date(selectedVoucher.validUntil).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
