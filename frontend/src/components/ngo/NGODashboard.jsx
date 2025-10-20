import React, { useState } from "react";
import { Button, Card, Nav, Tab } from "react-bootstrap";
import { Shield, Bell, AlertTriangle, LogOut } from "react-feather";
import { PendingVerificationList } from "./PendingVerificationList";
import { SchemeManagement } from "./SchemeManagement";
import { NGOStats } from "./NGOStats";
import { CaseMonitoring } from "./CaseMonitoring";
import { useNavigate } from "react-router-dom";

export default function NGODashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-white border-bottom sticky-top shadow-sm py-3 px-4 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
            <Shield size={28} className="text-primary" />
          </div>
          <div>
            <h4 className="mb-0 fw-bold">NGO Dashboard</h4>
            <small className="text-muted">
              {user.organization || "Organization"} • {user.name}
            </small>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" size="sm">
            <Bell size={16} className="me-2" /> Alerts
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="me-2" /> Logout
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="container py-4">
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="overview">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="verification">Verification</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="schemes">Schemes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="monitoring">Monitoring</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* Overview Tab */}
            <Tab.Pane eventKey="overview">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-bold">Verification Overview</h5>
                  <small className="text-muted">
                    Monitor and verify aid cases for transparency
                  </small>
                </div>
                <Button variant="success" onClick={() => setActiveTab("verification")}>
                  <AlertTriangle size={16} className="me-2" />
                  Review Pending Cases
                </Button>
              </div>

              <NGOStats />

              <div className="row g-4 mt-3">
                {/* Recent Verifications */}
                <div className="col-lg-6">
                  <Card>
                    <Card.Header>
                      <h6 className="fw-bold mb-0">Recent Verifications</h6>
                      <small className="text-muted">
                        Latest case verification activities
                      </small>
                    </Card.Header>
                    <Card.Body>
                      <div className="p-3 mb-3 border rounded bg-light">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-semibold mb-0">Case #AID-001</p>
                            <small className="text-muted">
                              Medical assistance - John Doe
                            </small>
                          </div>
                          <div className="text-end">
                            <small className="text-success fw-bold">Verified</small>
                            <div className="text-muted small">2 hours ago</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 mb-3 border rounded bg-light">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-semibold mb-0">Case #AID-002</p>
                            <small className="text-muted">
                              Food assistance - Jane Smith
                            </small>
                          </div>
                          <div className="text-end">
                            <small className="text-danger fw-bold">Rejected</small>
                            <div className="text-muted small">4 hours ago</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border rounded bg-light">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fw-semibold mb-0">Case #AID-003</p>
                            <small className="text-muted">
                              Shelter assistance - Bob Wilson
                            </small>
                          </div>
                          <div className="text-end">
                            <small className="text-success fw-bold">Verified</small>
                            <div className="text-muted small">6 hours ago</div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>

                {/* Fraud Detection Alerts */}
                <div className="col-lg-6">
                  <Card>
                    <Card.Header>
                      <h6 className="fw-bold mb-0">Fraud Detection Alerts</h6>
                      <small className="text-muted">
                        Potential duplicate or suspicious cases
                      </small>
                    </Card.Header>
                    <Card.Body>
                      <div className="p-3 mb-3 border rounded bg-danger bg-opacity-10">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="fw-semibold text-danger mb-0">Potential Duplicate</p>
                            <small className="text-danger">Cases #AID-004 & #AID-007</small>
                          </div>
                          <Button variant="outline-danger" size="sm">
                            Review
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 mb-3 border rounded bg-warning bg-opacity-10">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="fw-semibold text-warning mb-0">Location Mismatch</p>
                            <small className="text-warning">Case #AID-005</small>
                          </div>
                          <Button variant="outline-warning" size="sm">
                            Review
                          </Button>
                        </div>
                      </div>

                      <div className="text-center text-muted py-3">
                        <Shield size={28} className="opacity-50 mb-2" />
                        <div>All other cases look legitimate</div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Tab.Pane>

            {/* Verification Tab */}
            <Tab.Pane eventKey="verification">
              <Card>
                <Card.Header>
                  <h6 className="fw-bold mb-0">Pending Verification</h6>
                  <small className="text-muted">
                    Review and verify cases submitted by volunteers
                  </small>
                </Card.Header>
                <Card.Body>
                  <PendingVerificationList />
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* Schemes Tab */}
            <Tab.Pane eventKey="schemes">
              <Card>
                <Card.Header>
                  <h6 className="fw-bold mb-0">Scheme Management</h6>
                  <small className="text-muted">
                    Create and manage aid distribution schemes
                  </small>
                </Card.Header>
                <Card.Body>
                  <SchemeManagement />
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* Monitoring Tab */}
            <Tab.Pane eventKey="monitoring">
              <Card>
                <Card.Header>
                  <h6 className="fw-bold mb-0">Case Monitoring</h6>
                  <small className="text-muted">
                    Monitor live cases and track progress
                  </small>
                </Card.Header>
                <Card.Body>
                  <CaseMonitoring />
                </Card.Body>
              </Card>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}
