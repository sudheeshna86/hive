import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import "./SchemeManagement.css";


// Helper for category color
function getCategoryColor(category) {
  switch (category) {
    case "food":
      return "bg-warning text-dark";
    case "medical":
      return "bg-danger text-white";
    case "education":
      return "bg-primary text-white";
    case "shelter":
      return "bg-info text-dark";
    case "clothing":
      return "bg-secondary text-white";
    case "health":
      return "bg-dark text-white";
    default:
      return "bg-secondary text-white";
  }
}
function getStatusColor(status) {
  switch (status) {
    case "active":
      return "bg-success text-white";
    case "completed":
      return "bg-primary text-white";
    case "paused":
      return "bg-warning text-dark";
    default:
      return "bg-secondary text-white";
  }
}

export function SchemeManagement() {
  const [schemes, setSchemes] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    targetBeneficiaries: "",
    fundingGoal: "",
    category: "",
  });

  // Unchanged sample data—mix of full, half, and partial
  const dummySchemes = [
    {
      id: "SCH-001",
      name: "Meals for 50 People",
      description: "Provide daily meals to 50 underprivileged families",
      targetBeneficiaries: 4,
      fundingGoal: 500,
      currentFunding: 500,
      category: "food",
      status: "active",
      createdAt: "2025-10-22T09:00:00Z",
      beneficiaries: ["John", "Alice", "Bob", "Sara"],
      image: "image.jpg"
    },
    {
      id: "SCH-003",
      name: "School Supplies Distribution",
      description: "Providing notebooks and stationery to 100 students",
      targetBeneficiaries: 2,
      fundingGoal: 300,
      currentFunding: 300,
      category: "education",
      status: "active",
      createdAt: "2025-10-22T09:00:00Z",
      beneficiaries: ["Alan", "Priya"],
      image: "image.jpg"
    },
    {
      id: "SCH-005",
      name: "Clothing Drive for Community",
      description: "Distribute warm clothes to underprivileged families",
      targetBeneficiaries: 10,
      fundingGoal: 400,
      currentFunding: 200,
      category: "clothing",
      status: "active",
      createdAt: "2025-10-22T09:00:00Z",
      beneficiaries: ["Esha", "Ajay", "Manoj", "Sheela", "Vikram"],
      image: "image.jpg"
    },
    {
      id: "SCH-006",
      name: "Rural Health Camp",
      description: "Organize free medical checkups in rural villages",
      targetBeneficiaries: 12,
      fundingGoal: 800,
      currentFunding: 300,
      category: "medical",
      status: "active",
      createdAt: "2025-10-22T09:00:00Z",
      beneficiaries: ["Dr. Raj", "Meena", "Hitesh", "Namrata"],
      image: "image.jpg"
    },
    {
      id: "SCH-002",
      name: "Medical Aid for Children",
      description: "Medical support for children in rural areas",
      targetBeneficiaries: 6,
      fundingGoal: 1000,
      currentFunding: 800,
      category: "medical",
      status: "active",
      createdAt: "2025-10-22T09:00:00Z",
      beneficiaries: ["David", "Emma", "Arjun", "Maya"],
      image: "image.jpg"
    },
    {
      id: "SCH-004",
      name: "Emergency Shelter Setup",
      description: "Temporary shelters for families affected by floods",
      targetBeneficiaries: 20,
      fundingGoal: 800,
      currentFunding: 200,
      category: "shelter",
      status: "active",
      createdAt: "2025-10-22T09:00:00Z",
      beneficiaries: ["Ramesh", "Sneha"],
      image: "image.jpg"
    }
  ];

  useEffect(() => {
    setSchemes(dummySchemes);
  }, []);

  // Filter for Funded Schemes tab
  const fundedSchemes = schemes.filter(
    s =>
      s.currentFunding === s.fundingGoal &&
      s.beneficiaries.length === s.targetBeneficiaries
  );
  const displayedSchemes = activeTab === "funded" ? fundedSchemes : schemes;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScheme = {
      id: editingScheme?.id || `SCH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      name: formData.name,
      description: formData.description,
      targetBeneficiaries: parseInt(formData.targetBeneficiaries),
      fundingGoal: parseFloat(formData.fundingGoal),
      currentFunding: editingScheme?.currentFunding || 0,
      category: formData.category,
      status: editingScheme?.status || "active",
      createdAt: editingScheme?.createdAt || new Date().toISOString(),
      beneficiaries: editingScheme?.beneficiaries || [],
      image: editingScheme?.image || "image.jpg"
    };
    const updated = editingScheme
      ? schemes.map((s) => (s.id === editingScheme.id ? newScheme : s))
      : [...schemes, newScheme];
    setSchemes(updated);
    setShowForm(false);
    setEditingScheme(null);
    setFormData({ name: "", description: "", targetBeneficiaries: "", fundingGoal: "", category: "" });
  };

  const handleEdit = (scheme) => {
    setFormData({
      name: scheme.name,
      description: scheme.description,
      targetBeneficiaries: scheme.targetBeneficiaries,
      fundingGoal: scheme.fundingGoal,
      category: scheme.category,
    });
    setEditingScheme(scheme);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = schemes.filter((s) => s.id !== id);
    setSchemes(updated);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-1">Aid Distribution Schemes</h5>
          <p className="text-muted mb-0">Create and manage schemes for grouping beneficiaries</p>
        </div>
        {activeTab === "all" && (
          <button className="btn btn-success d-flex align-items-center" onClick={() => setShowForm(true)}>
            <Plus size={18} className="me-1" /> Create Scheme
          </button>
        )}
      </div>
      <div className="mb-3">
        <button
          className={`btn btn-light me-2 px-4 py-2 border rounded-pill ${activeTab === "all" ? "fw-bold shadow-sm" : ""}`}
          style={{
            background: activeTab === "all" ? "#fff" : "#fff",
            borderColor: "#37b24d"
          }}
          onClick={() => setActiveTab("all")}
        >
          All Schemes
        </button>
        <button
          className={`btn btn-light px-4 py-2 border rounded-pill ${activeTab === "funded" ? "fw-bold shadow-sm" : ""}`}
          style={{
            background: activeTab === "funded" ? "#E9FBE4" : "#fff",
            borderColor: "#37b24d"
          }}
          onClick={() => setActiveTab("funded")}
        >
          Funded Schemes
        </button>
      </div>

      {activeTab === "all" && showForm && (
        <div className="card p-3 mb-4 border-0 shadow" style={{ borderRadius: "1rem" }}>
          <h6 className="fw-bold mb-3">{editingScheme ? "Edit Scheme" : "Create New Scheme"}</h6>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Scheme Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select category</option>
                  <option value="medical">Medical</option>
                  <option value="food">Food</option>
                  <option value="shelter">Shelter</option>
                  <option value="education">Education</option>
                  <option value="clothing">Clothing</option>
                  <option value="health">Health</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleInput}
                required
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Target Beneficiaries</label>
                <input
                  type="number"
                  name="targetBeneficiaries"
                  className="form-control"
                  value={formData.targetBeneficiaries}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Funding Goal (USD)</label>
                <input
                  type="number"
                  name="fundingGoal"
                  className="form-control"
                  value={formData.fundingGoal}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                {editingScheme ? "Update Scheme" : "Create Scheme"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingScheme(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="row">
        {displayedSchemes.map((scheme) => (
          <div key={scheme.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0" style={{ borderRadius: "1.5rem" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h6 className="fw-bold">{scheme.name}</h6>
                  {activeTab === "all" && (
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => handleEdit(scheme)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(scheme.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-2 d-flex gap-2">
                  <span className={`badge ${getStatusColor(scheme.status)}`} style={{ fontSize: 15, padding: "6px 14px" }}>{scheme.status}</span>
                  <span className={`badge ${getCategoryColor(scheme.category)}`} style={{ fontSize: 15, padding: "6px 14px" }}>{scheme.category}</span>
                </div>
                <p className="mb-2" style={{ fontSize: 15 }}>{scheme.description}</p>
                <div className="mb-2">
                  <div className="d-flex justify-content-between small">
                    <span className="d-flex align-items-center fw-semibold">
                      <Users size={14} className="me-1" /> Beneficiaries
                    </span>
                    <span>
                      {scheme.beneficiaries.length}/{scheme.targetBeneficiaries}
                    </span>
                  </div>
                  <div className="progress bg-light" style={{ height: "6px", borderRadius: 6 }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width: `${Math.min((scheme.beneficiaries.length / scheme.targetBeneficiaries) * 100, 100)}%`,
                        borderRadius: 6
                      }}
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between small">
                    <span className="fw-semibold">Funding Progress</span>
                    <span className="fw-bold">
                      ${scheme.currentFunding}/{scheme.fundingGoal}
                    </span>
                  </div>
                  <div className="progress bg-light" style={{ height: "6px", borderRadius: 6 }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{
                        width: `${Math.min((scheme.currentFunding / scheme.fundingGoal) * 100, 100)}%`,
                        borderRadius: 6
                      }}
                    />
                  </div>
                </div>
                <p className="text-muted small mb-0">
                  Created: {new Date(scheme.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
