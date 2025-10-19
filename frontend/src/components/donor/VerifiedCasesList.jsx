import React, { useState, useEffect } from "react";
import { FaHeart, FaUser, FaMapMarkerAlt, FaClock, FaFilter } from "react-icons/fa";

export default function VerifiedCasesList() {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [filters, setFilters] = useState({
    urgency: "all",
    assistanceType: "all",
    fundingStatus: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadVerifiedCases();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cases, filters, searchTerm]);

  const loadVerifiedCases = () => {
    const allCases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    const verified = allCases
      .filter((c) => c.status === "verified" || c.status === "funded" || c.status === "in-progress")
      .map((c) => ({
        ...c,
        currentFunding: Math.floor(Math.random() * parseFloat(c.estimatedCost || "1000")),
        fundingGoal: parseFloat(c.estimatedCost || "1000"),
        donorCount: Math.floor(Math.random() * 20) + 1,
      }));
    setCases(verified);
  };

  const applyFilters = () => {
    let filtered = [...cases];

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.urgency !== "all") {
      filtered = filtered.filter((c) => c.urgencyLevel === filters.urgency);
    }

    if (filters.assistanceType !== "all") {
      filtered = filtered.filter((c) => c.assistanceType.includes(filters.assistanceType));
    }

    if (filters.fundingStatus !== "all") {
      if (filters.fundingStatus === "urgent") {
        filtered = filtered.filter((c) => c.currentFunding < c.fundingGoal * 0.3);
      } else if (filters.fundingStatus === "partial") {
        filtered = filtered.filter(
          (c) => c.currentFunding >= c.fundingGoal * 0.3 && c.currentFunding < c.fundingGoal
        );
      } else if (filters.fundingStatus === "nearly-funded") {
        filtered = filtered.filter(
          (c) => c.currentFunding >= c.fundingGoal * 0.8 && c.currentFunding < c.fundingGoal
        );
      }
    }

    setFilteredCases(filtered);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical":
        return "bg-danger text-white";
      case "high":
        return "bg-warning text-dark";
      case "medium":
        return "bg-info text-dark";
      case "low":
        return "bg-success text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  const getFundingPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const handleDonate = (caseItem) => {
    setSelectedCase(caseItem);
    setShowDonationModal(true);
  };

  const handleDonationComplete = (amount) => {
    if (selectedCase) {
      const updatedCases = cases.map((c) =>
        c.id === selectedCase.id
          ? { ...c, currentFunding: c.currentFunding + amount, donorCount: c.donorCount + 1 }
          : c
      );
      setCases(updatedCases);

      const existingDonations = JSON.parse(localStorage.getItem("userDonations") || "[]");
      const newDonation = {
        id: Math.random().toString(36).substr(2, 9),
        caseId: selectedCase.id,
        caseName: selectedCase.beneficiaryName,
        amount,
        donorId: JSON.parse(localStorage.getItem("user") || "{}").id,
        createdAt: new Date().toISOString(),
        status: "completed",
      };
      localStorage.setItem("userDonations", JSON.stringify([...existingDonations, newDonation]));
    }
    setShowDonationModal(false);
    setSelectedCase(null);
  };

  if (cases.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="bg-light rounded-circle p-4 d-inline-flex justify-content-center mb-3">
          <FaHeart size={30} className="text-muted" />
        </div>
        <h5>No verified cases available</h5>
        <p className="text-muted">Check back later for new cases that need your help.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Filters */}
      <div className="row g-3 mb-4 p-3 bg-light rounded">
        <div className="col-md-3">
          <label className="form-label">Search Cases</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Urgency Level</label>
          <select
            className="form-select"
            value={filters.urgency}
            onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
          >
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Assistance Type</label>
          <select
            className="form-select"
            value={filters.assistanceType}
            onChange={(e) => setFilters({ ...filters, assistanceType: e.target.value })}
          >
            <option value="all">All Types</option>
            <option value="Medical">Medical</option>
            <option value="Food">Food</option>
            <option value="Shelter">Shelter</option>
            <option value="Education">Education</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Funding Status</label>
          <select
            className="form-select"
            value={filters.fundingStatus}
            onChange={(e) => setFilters({ ...filters, fundingStatus: e.target.value })}
          >
            <option value="all">All Cases</option>
            <option value="urgent">Urgent (&lt;30%)</option>
            <option value="partial">Partially Funded</option>
            <option value="nearly-funded">Nearly Funded (80%+)</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="row g-4">
        {filteredCases.map((caseItem) => {
          const fundingPercentage = getFundingPercentage(caseItem.currentFunding, caseItem.fundingGoal);
          const remainingAmount = caseItem.fundingGoal - caseItem.currentFunding;

          return (
            <div className="col-md-6 col-lg-4" key={caseItem.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title">{caseItem.id}</h5>
                    <span className={`badge ${getUrgencyColor(caseItem.urgencyLevel)}`}>
                      {caseItem.urgencyLevel}
                    </span>
                  </div>

                  <p className="text-muted mb-2">
                    <FaUser className="me-1" />
                    {caseItem.beneficiaryName} ({caseItem.age}y)
                  </p>

                  <div className="mb-2">
                    {caseItem.assistanceType.map((type, i) => (
                      <span key={i} className="badge bg-secondary me-1">
                        {type}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted small">{caseItem.description}</p>

                  <p className="text-muted small">
                    <FaMapMarkerAlt className="me-1" />
                    {caseItem.address}
                  </p>

                  <div className="my-3">
                    <div className="d-flex justify-content-between small">
                      <span>Funding Progress</span>
                      <span>{fundingPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${fundingPercentage}%` }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between small mt-1">
                      <span>${caseItem.currentFunding.toLocaleString()} raised</span>
                      <span>${caseItem.fundingGoal.toLocaleString()} goal</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between text-muted small mb-3">
                    <span>
                      <FaHeart className="me-1 text-danger" />
                      {caseItem.donorCount} donors
                    </span>
                    <span>
                      <FaClock className="me-1" />
                      {new Date(caseItem.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <button
                    className={`btn w-100 ${remainingAmount <= 0 ? "btn-secondary" : "btn-primary"}`}
                    onClick={() => handleDonate(caseItem)}
                    disabled={remainingAmount <= 0}
                  >
                    <FaHeart className="me-2" />
                    {remainingAmount <= 0 ? "Fully Funded" : `Donate $${Math.min(remainingAmount, 50)}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-5">
          <div className="bg-light rounded-circle p-4 d-inline-flex justify-content-center mb-3">
            <FaFilter size={30} className="text-muted" />
          </div>
          <h5>No cases match your filters</h5>
          <p className="text-muted">Try adjusting your search criteria to see more cases.</p>
        </div>
      )}
    </div>
  );
}
