import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";

export function SchemeManagement() {
  const [schemes, setSchemes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    targetBeneficiaries: "",
    fundingGoal: "",
    category: "",
  });

  const dummySchemes = [
    {
      id: "SCH-001",
      name: "Meals for 50 People",
      description: "Provide daily meals to 50 underprivileged families",
      targetBeneficiaries: 50,
      fundingGoal: 500,
      currentFunding: 200,
      category: "food",
      status: "active",
      createdAt: new Date().toISOString(),
      beneficiaries: ["John", "Alice", "Bob"],
    },
    {
      id: "SCH-002",
      name: "Medical Aid for Children",
      description: "Medical support for children in rural areas",
      targetBeneficiaries: 30,
      fundingGoal: 1000,
      currentFunding: 600,
      category: "medical",
      status: "active",
      createdAt: new Date().toISOString(),
      beneficiaries: ["David", "Emma"],
    },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ngoSchemes") || "[]");
    setSchemes(stored.length ? stored : dummySchemes);
  }, []);

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
    };

    const updated = editingScheme
      ? schemes.map((s) => (s.id === editingScheme.id ? newScheme : s))
      : [...schemes, newScheme];

    setSchemes(updated);
    localStorage.setItem("ngoSchemes", JSON.stringify(updated));
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
    localStorage.setItem("ngoSchemes", JSON.stringify(updated));
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "badge bg-success";
      case "completed":
        return "badge bg-primary";
      case "paused":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold mb-1">Aid Distribution Schemes</h5>
          <p className="text-muted mb-0">Create and manage schemes for grouping beneficiaries</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center" onClick={() => setShowForm(true)}>
          <Plus size={18} className="me-1" /> Create Scheme
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4 shadow-sm">
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

      {schemes.length > 0 ? (
        <div className="row">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h6 className="fw-bold">{scheme.name}</h6>
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
                  </div>

                  <div className="mb-2">
                    <span className={`${getBadgeClass(scheme.status)} me-1`}>{scheme.status}</span>
                    <span className="badge bg-info text-dark">{scheme.category}</span>
                  </div>

                  <p className="text-muted small">{scheme.description}</p>

                  <div className="mb-2">
                    <div className="d-flex justify-content-between small">
                      <span className="d-flex align-items-center">
                        <Users size={14} className="me-1" /> Beneficiaries
                      </span>
                      <span>
                        {scheme.beneficiaries.length}/{scheme.targetBeneficiaries}
                      </span>
                    </div>
                    <div className="progress" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: `${Math.min(
                            (scheme.beneficiaries.length / scheme.targetBeneficiaries) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="d-flex justify-content-between small">
                      <span>Funding Progress</span>
                      <span>
                        ${scheme.currentFunding}/{scheme.fundingGoal}
                      </span>
                    </div>
                    <div className="progress" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{
                          width: `${Math.min(
                            (scheme.currentFunding / scheme.fundingGoal) * 100,
                            100
                          )}%`,
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
      ) : (
        !showForm && (
          <div className="text-center py-5">
            <Users size={48} className="text-muted mb-3" />
            <h6 className="fw-semibold mb-2">No Schemes Yet</h6>
            <p className="text-muted small mb-3">
              Create your first aid distribution scheme to get started.
            </p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              <Plus size={16} className="me-1" /> Create Scheme
            </button>
          </div>
        )
      )}
    </div>
  );
}
