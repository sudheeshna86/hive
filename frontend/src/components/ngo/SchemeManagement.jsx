import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";

export function SchemeManagement() {
  const [schemes, setSchemes] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    targetBeneficiaries: "",
    fundingGoal: "",
    category: "",
  });

  useEffect(() => {
    loadSchemes();
  }, []);

  const loadSchemes = () => {
    const storedSchemes = JSON.parse(localStorage.getItem("ngoSchemes") || "[]");
    setSchemes(storedSchemes);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const schemeData = {
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

    const existingSchemes = JSON.parse(localStorage.getItem("ngoSchemes") || "[]");
    const updatedSchemes = editingScheme
      ? existingSchemes.map((s) => (s.id === editingScheme.id ? schemeData : s))
      : [...existingSchemes, schemeData];

    localStorage.setItem("ngoSchemes", JSON.stringify(updatedSchemes));
    setSchemes(updatedSchemes);
    resetForm();
    alert(editingScheme ? "Scheme Updated Successfully" : "Scheme Created Successfully");
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", targetBeneficiaries: "", fundingGoal: "", category: "" });
    setShowCreateForm(false);
    setEditingScheme(null);
  };

  const handleEdit = (scheme) => {
    setFormData({
      name: scheme.name,
      description: scheme.description,
      targetBeneficiaries: scheme.targetBeneficiaries.toString(),
      fundingGoal: scheme.fundingGoal.toString(),
      category: scheme.category,
    });
    setEditingScheme(scheme);
    setShowCreateForm(true);
  };

  const handleDelete = (schemeId) => {
    const updatedSchemes = schemes.filter((s) => s.id !== schemeId);
    localStorage.setItem("ngoSchemes", JSON.stringify(updatedSchemes));
    setSchemes(updatedSchemes);
    alert("Scheme Deleted Successfully");
  };

  const getStatusClass = (status) => {
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
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case "medical":
        return "bg-danger text-white";
      case "food":
        return "bg-warning text-dark";
      case "shelter":
        return "bg-info text-white";
      case "education":
        return "bg-purple text-white"; // custom class for purple
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3>Aid Distribution Schemes</h3>
          <p className="text-muted">Create and manage schemes for grouping beneficiaries</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
          <Plus size={16} className="me-1" /> Create Scheme
        </button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">{editingScheme ? "Edit Scheme" : "Create New Scheme"}</h5>
            <small className="text-muted">{editingScheme ? "Update scheme details" : "Set up a new aid distribution scheme"}</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Scheme Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Meals for 50 people"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
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
                <label className="form-label">Description *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Describe the scheme and its objectives"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Target Beneficiaries *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Number of people to help"
                    value={formData.targetBeneficiaries}
                    onChange={(e) => handleInputChange("targetBeneficiaries", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Funding Goal (USD) *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Total funding needed"
                    value={formData.fundingGoal}
                    onChange={(e) => handleInputChange("fundingGoal", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingScheme ? "Update Scheme" : "Create Scheme"}
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schemes List */}
      <div className="row">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{scheme.name}</h5>
                <div className="d-flex gap-1">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEdit(scheme)}>
                    <Edit size={16} />
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(scheme.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-2 d-flex gap-2">
                  <span className={`badge ${getStatusClass(scheme.status)}`}>{scheme.status}</span>
                  <span className={`badge ${getCategoryClass(scheme.category)}`}>{scheme.category}</span>
                </div>
                <p className="text-muted text-truncate">{scheme.description}</p>

                <div className="mb-2">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>
                      <Users size={16} className="me-1" />
                      Beneficiaries
                    </span>
                    <span>
                      {scheme.beneficiaries.length}/{scheme.targetBeneficiaries}
                    </span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: `${Math.min((scheme.beneficiaries.length / scheme.targetBeneficiaries) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Funding Progress</span>
                    <span>
                      ${scheme.currentFunding.toLocaleString()}/${scheme.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${Math.min((scheme.currentFunding / scheme.fundingGoal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <small className="text-muted">Created: {new Date(scheme.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {schemes.length === 0 && !showCreateForm && (
        <div className="text-center py-5">
          <div className="bg-light rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3" style={{ width: 64, height: 64 }}>
            <Users size={24} className="text-muted" />
          </div>
          <h5>No schemes created yet</h5>
          <p className="text-muted">Create your first aid distribution scheme to get started.</p>
          <button className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
            <Plus size={16} className="me-1" /> Create First Scheme
          </button>
        </div>
      )}
    </div>
  );
}
