import React, { useState } from "react";
import {
  Card,
  Button,
  Tab,
  Nav,
  Form,
  Row,
  Col,
  ProgressBar,
  Modal,
  Table,
  Badge,
  Alert,
} from "react-bootstrap";
import "./ServiceProviderCoordination.css"; // <-- custom CSS styles

// Dummy data for demonstration
const fundedCases = [
  {
    id: "CASE-101",
    beneficiary: "Anil Kumar",
    aidType: "Medical Aid",
    status: "Funded",
    urgency: "High",
    amount: 5000,
    location: "New Delhi - Sector 10",
    volunteer: {
      name: "Priya Sharma",
      phone: "9876543123",
      volunteerLocation: "New Delhi - Sector 9",
      address: "Flat 12B, Green Residency, Sector 9, New Delhi",
    },
    assigned: false,
    completed: false,
  },
  {
    id: "CASE-102",
    beneficiary: "Rekha Devi",
    aidType: "Food Aid",
    status: "Funded",
    urgency: "Medium",
    amount: 3200,
    location: "Noida - Sector 62",
    volunteer: {
      name: "Arjun Reddy",
      phone: "9456723123",
      volunteerLocation: "Noida - Sector 58",
      address: "House 20, Sunrise Apartments, Noida",
    },
    assigned: true,
    completed: true,
  },
];

const providers = [
  {
    id: "PROV-01",
    name: "HeartCare Hospital",
    type: "Hospital",
    address: "Dwarka Sec-7, Delhi",
    contact: "011-23456987",
    distance: 3.2,
    rating: 4.7,
    services: ["Medical Aid", "Transport"],
  },
  {
    id: "PROV-02",
    name: "Sahara Orphanage",
    type: "Orphanage",
    address: "Sector 10, Noida",
    contact: "9876543210",
    distance: 1.5,
    rating: 4.2,
    services: ["Food Aid", "Shelter"],
  },
];

const pendingRequests = [
  {
    requestId: "REQ-202",
    provider: providers[0],
    caseId: "CASE-101",
    beneficiary: "Anil Kumar",
    time: "2025-10-23 13:07",
    location: "New Delhi - Sector 10",
    status: "Awaiting Response",
  },
];

const acceptedRequests = [
  {
    requestId: "REQ-210",
    provider: providers[1],
    case: fundedCases[1],
    time: "2025-10-22 18:01",
    status: "Active",
  },
];

const progressStats = {
  funded: fundedCases.length,
  assigned: fundedCases.filter((c) => c.assigned).length,
  completed: fundedCases.filter((c) => c.completed).length,
};

// Mock geolocation
function useMyLocation() {
  const [coords, setCoords] = useState(null);
  const trigger = () => setCoords({ lat: 28.6139, lng: 77.209 });
  return [coords, trigger];
}

function CaseCard({ caseItem, action, accepted, notifyVolunteer }) {
  return (
    <Card className="mb-3 shadow-sm case-card">
      <Card.Body>
        <Row>
          <Col md={8}>
            <div className="fw-bold">
              {caseItem.id} - {caseItem.beneficiary}
            </div>
            <div>
              <b>Type:</b> {caseItem.aidType}
            </div>
            <div>
              <b>Urgency:</b> {caseItem.urgency}
            </div>
            <div>
              <b>Amount:</b> ₹{caseItem.amount}
            </div>
            <div>
              <b>Beneficiary Location:</b> {caseItem.location}
            </div>
            <div>
              <b>Volunteer:</b> {caseItem.volunteer?.name} (
              {caseItem.volunteer?.phone}) -{" "}
              {caseItem.volunteer?.volunteerLocation}
            </div>
            <div>
              <b>Status:</b>{" "}
              <Badge
                bg={
                  caseItem.completed
                    ? "success"
                    : caseItem.assigned
                    ? "primary"
                    : "secondary"
                }
              >
                {caseItem.completed
                  ? "Completed"
                  : caseItem.assigned
                  ? "Assigned"
                  : "Funded"}
              </Badge>
            </div>
          </Col>
          <Col
            md={4}
            className="d-flex flex-column align-items-end justify-content-end gap-2"
          >
            <Button variant="outline-primary" size="sm" onClick={() => action(caseItem)}>
              View Details
            </Button>
            {!caseItem.assigned && (
              <Button
                variant="success"
                size="sm"
                onClick={() => action(caseItem, "request")}
              >
                Request Service Provider
              </Button>
            )}
            {accepted && (
              <Button
                variant="outline-info"
                size="sm"
                onClick={notifyVolunteer}
              >
                Notify Volunteer
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function ProviderCard({ provider, action }) {
  return (
    <Card className="mb-3 provider-card animated-card">
      <Card.Body>
        <Row>
          <Col md={8}>
            <div className="fw-bold fs-5 text-primary">{provider.name}</div>
            <div>{provider.address}</div>
            <div>
              <b>Type:</b> {provider.type} | <b>Distance:</b>{" "}
              {provider.distance} km
            </div>
            <div>
              Contact: {provider.contact} | Rating: ⭐ {provider.rating}
            </div>
            <div>
              <b>Services:</b> {provider.services.join(", ")}
            </div>
          </Col>
          <Col md={4} className="d-flex align-items-end justify-content-end">
            <Button
              variant="gradient-success"
              size="sm"
              className="glow-btn"
              onClick={() => action(provider)}
            >
              Request Service
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default function ServiceProviderCoordination() {
  const [activeTab, setTab] = useState("fundedCases");
  const [selectedCase, setSelectedCase] = useState(null);
  const [showProviderModal, setShowProviderModal] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);
  const [notif, setNotif] = useState(false);
  const [location, triggerLocation] = useMyLocation();
  const [providerType, setProviderType] = useState("Hospital");
  const [search, setSearch] = useState("");

  function handleCaseAction(caseItem, type) {
    if (type === "request") {
      setTab("requestSP");
      setSelectedCase(caseItem);
    } else {
      alert("Show timeline for " + caseItem.id);
    }
  }

  function handleProviderRequest(provider) {
    setCurrentProvider(provider);
    setShowProviderModal(true);
  }

  function handleConfirmProvider() {
    setShowProviderModal(false);
    alert(
      `Request sent to ${currentProvider.name} for Case ${selectedCase.id}. Request now pending.`
    );
    setTab("pending");
  }

  function handleNotifyVolunteer() {
    setNotif(true);
    setTimeout(() => setNotif(false), 2000);
  }

  return (
    <div>
      <Tab.Container activeKey={activeTab} onSelect={setTab}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="fundedCases">Funded Cases</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="requestSP">Request to Service Providers</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="pending">Pending Requests</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="accepted">Accepted Requests</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          {/* --- Funded Cases Tab --- */}
          <Tab.Pane eventKey="fundedCases">
            <Row className="mb-4 g-2">
              <Col>
                <ProgressBar
                  label={`Total Funded Cases: ${progressStats.funded}`}
                  now={progressStats.funded}
                  max={progressStats.funded}
                  variant="success"
                />
              </Col>
              <Col>
                <ProgressBar
                  label={`Assigned: ${progressStats.assigned}`}
                  now={progressStats.assigned}
                  max={progressStats.funded}
                  variant="warning"
                />
              </Col>
              <Col>
                <ProgressBar
                  label={`Completed: ${progressStats.completed}`}
                  now={progressStats.completed}
                  max={progressStats.funded}
                  variant="info"
                />
              </Col>
            </Row>
            {fundedCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} action={handleCaseAction} />
            ))}
          </Tab.Pane>

          {/* --- Request to Service Providers (Enhanced) --- */}
          <Tab.Pane eventKey="requestSP" className="animated-section">
            <Card className="mb-3 gradient-card fade-in">
              <Card.Header className="fw-bold fs-5">
                Step 1: Select Funded Case
              </Card.Header>
              <Card.Body className="pb-1">
                <Form.Select
                  className="styled-select"
                  value={selectedCase?.id || ""}
                  onChange={(e) => {
                    const cid = e.target.value;
                    setSelectedCase(fundedCases.find((c) => c.id === cid));
                  }}
                >
                  <option value="">Select Case</option>
                  {fundedCases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} - {c.beneficiary} ({c.aidType})
                    </option>
                  ))}
                </Form.Select>
                {selectedCase && (
                  <div className="case-info mt-4 p-3 rounded shadow-sm bg-light">
                    <h6 className="fw-bold text-secondary mb-2">Case Details</h6>
                    <p><b>Beneficiary:</b> {selectedCase.beneficiary}</p>
                    <p><b>Location:</b> {selectedCase.location}</p>
                    <p><b>Type:</b> {selectedCase.aidType}</p>
                    <p><b>Urgency:</b> {selectedCase.urgency}</p>
                    <p><b>Volunteer:</b> {selectedCase.volunteer.name}</p>
                    <p><b>Volunteer Phone:</b> {selectedCase.volunteer.phone}</p>
                    <p><b>Volunteer Address:</b> {selectedCase.volunteer.address}</p>
                  </div>
                )}
              </Card.Body>
            </Card>

            <Card className="mb-3 gradient-card slide-up">
              <Card.Header className="fw-bold fs-5">
                Step 2: Use Volunteer’s Location
              </Card.Header>
              <Card.Body>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="glow-btn"
                  onClick={triggerLocation}
                >
                  Use My Location
                </Button>
                {location && (
                  <div className="mt-3 fade-in">
                    <b>Latitude:</b> {location.lat}, <b>Longitude:</b> {location.lng}{" "}
                    <Badge bg="info">Pinned</Badge>
                  </div>
                )}
              </Card.Body>
            </Card>

            <Card className="mb-3 gradient-card slide-in">
              <Card.Header>
                <Row>
                  <Col md="auto" className="fw-bold fs-5">
                    Step 3: Search Nearby Providers
                  </Col>
                  <Col>
                    <Form.Check
                      inline
                      label="Hospitals"
                      name="provType"
                      type="radio"
                      checked={providerType === "Hospital"}
                      onChange={() => setProviderType("Hospital")}
                    />
                    <Form.Check
                      inline
                      label="Orphanages/Shelters"
                      name="provType"
                      type="radio"
                      checked={providerType === "Orphanage"}
                      onChange={() => setProviderType("Orphanage")}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      size="sm"
                      placeholder="Filter by name/service"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="styled-input"
                    />
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="pt-2">
                {providers
                  .filter(
                    (p) =>
                      p.type === providerType &&
                      (!search ||
                        p.name.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map((p) => (
                    <ProviderCard
                      provider={p}
                      key={p.id}
                      action={handleProviderRequest}
                    />
                  ))}
              </Card.Body>
            </Card>

            <Modal
              show={showProviderModal}
              onHide={() => setShowProviderModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Confirm Request</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Do you want to send a service request to{" "}
                <b>{currentProvider?.name}</b> for Case{" "}
                <b>{selectedCase?.id}</b>?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowProviderModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="success" onClick={handleConfirmProvider}>
                  Send Request
                </Button>
              </Modal.Footer>
            </Modal>
          </Tab.Pane>

          {/* --- Pending Requests --- */}
          <Tab.Pane eventKey="pending">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Type</th>
                  <th>Case ID</th>
                  <th>Beneficiary</th>
                  <th>Request Time</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map((req) => (
                  <tr key={req.requestId}>
                    <td>{req.provider.name}</td>
                    <td>{req.provider.type}</td>
                    <td>{req.caseId}</td>
                    <td>{req.beneficiary}</td>
                    <td>{req.time}</td>
                    <td>{req.location}</td>
                    <td>
                      <Badge bg="warning">{req.status}</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline-danger" className="me-2">
                        Cancel
                      </Button>
                      <Button size="sm" variant="outline-secondary">
                        Send Reminder
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab.Pane>

          {/* --- Accepted Requests --- */}
          <Tab.Pane eventKey="accepted">
            {acceptedRequests.map((req, i) => (
              <Card key={i} className="mb-3">
                <Card.Header>Case & Provider Details</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <CaseCard
                        caseItem={req.case}
                        action={() => {}}
                        accepted
                        notifyVolunteer={handleNotifyVolunteer}
                      />
                      <div className="mt-2">
                        <b>Provider:</b> {req.provider.name} (
                        {req.provider.type})
                        <br />
                        <b>Address:</b> {req.provider.address}
                        <br />
                        <b>Contact:</b> {req.provider.contact}
                      </div>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex align-items-center justify-content-end"
                    >
                      <Button
                        size="sm"
                        variant="info"
                        onClick={handleNotifyVolunteer}
                      >
                        Notify Volunteer
                      </Button>
                      {notif && (
                        <span className="text-success ms-2">
                          Volunteer Notified!
                        </span>
                      )}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
