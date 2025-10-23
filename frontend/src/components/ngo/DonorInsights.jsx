import React, { useState } from "react";
import { Card, Button, Form, Table, Row, Col, Badge, Dropdown } from "react-bootstrap";
import "./DonorInsights.css";

// --- Dummy Data ---
const donations = [
  { donor: "Anil Kapoor", amount: 5000, date: "2025-10-21", purpose: "Food Aid", campaign: "Winter Relief", method: "UPI" },
  { donor: "Seema Rao", amount: 2500, date: "2025-10-22", purpose: "Medical", campaign: "Health Drive", method: "Card" },
  { donor: "Anonymous", amount: 800, date: "2025-10-22", purpose: "Shelter", campaign: "Night Shelter", method: "Wallet" },
  { donor: "Mukesh Sharma", amount: 4200, date: "2025-10-18", purpose: "Transport", campaign: "Mobility Aid", method: "Netbanking" }
];

const allocationCategories = [
  { category: "Food Aid", value: 16000 },
  { category: "Shelter", value: 9000 },
  { category: "Healthcare", value: 7500 },
  { category: "Transport", value: 3400 },
  { category: "Other", value: 2200 }
];

const utilizationStats = [
  { category: "Food Aid", issued: 120, redeemed: 112 },
  { category: "Shelter", issued: 74, redeemed: 67 },
  { category: "Healthcare", issued: 41, redeemed: 39 },
  { category: "Transport", issued: 22, redeemed: 19 }
];

function filterDonations({ text = "", campaign = "" }) {
  return donations.filter(
    d =>
      (!text || d.donor.toLowerCase().includes(text.toLowerCase())) &&
      (!campaign || d.campaign === campaign)
  );
}

export default function DonorInsights() {
  const [searchText, setSearchText] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("");
  const [timeRange, setTimeRange] = useState("month");

  const filteredDonations = filterDonations({ text: searchText, campaign: campaignFilter });

  const today = "2025-10-22";
  const todayDonations = donations.filter(d => d.date === today).reduce((sum, d) => sum + d.amount, 0);
  const weekDonations = donations.filter(d => d.date >= "2025-10-16").reduce((sum, d) => sum + d.amount, 0);
  const monthDonations = donations.filter(d => d.date >= "2025-10-01").reduce((sum, d) => sum + d.amount, 0);
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  const PieChart = () => (
    <div className="chart-placeholder">Pie Chart Here</div>
  );
  const BarGraph = () => (
    <div className="chart-placeholder">Bar Graph Here</div>
  );
  const Heatmap = () => (
    <div className="heatmap-placeholder">Heatmap Here</div>
  );

  return (
    <div className="donor-insights-container">
      {/* Quick Summary Cards */}
      <Row className="mb-4 g-3">
        <Col md>
          <Card className="summary-card border-success">
            <Card.Body>
              <span className="summary-amount text-success">₹{todayDonations}</span>
              <div className="summary-label">Today's Donations</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card className="summary-card border-primary">
            <Card.Body>
              <span className="summary-amount text-primary">₹{weekDonations}</span>
              <div className="summary-label">This Week</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card className="summary-card border-info">
            <Card.Body>
              <span className="summary-amount text-info">₹{monthDonations}</span>
              <div className="summary-label">This Month</div>
            </Card.Body>
          </Card>
        </Col>
        <Col md>
          <Card className="summary-card border-dark">
            <Card.Body>
              <span className="summary-amount">₹{totalDonations}</span>
              <div className="summary-label">Total Received</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Donations */}
      <Card className="mb-4 shadow-sm rounded-4">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <div>
            <h6 className="fw-bold mb-0">Recent Donations</h6>
            <small className="text-muted">Live contributions for all campaigns</small>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <Form.Control
              type="text"
              size="sm"
              placeholder="Search donor/campaign"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 180 }}
            />
            <Form.Select
              size="sm"
              value={campaignFilter}
              onChange={e => setCampaignFilter(e.target.value)}
              style={{ width: 140 }}
            >
              <option value="">All Campaigns</option>
              <option>Winter Relief</option>
              <option>Health Drive</option>
              <option>Night Shelter</option>
              <option>Mobility Aid</option>
            </Form.Select>
            <Button variant="outline-success" size="sm">Download</Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover responsive size="sm" className="modern-table">
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount (₹)</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Campaign</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((d, i) => (
                <tr key={i}>
                  <td>{d.donor}</td>
                  <td>{d.amount}</td>
                  <td>{d.date}</td>
                  <td>{d.purpose}</td>
                  <td>{d.campaign}</td>
                  <td>{d.method}</td>
                </tr>
              ))}
              {!filteredDonations.length && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-3">
                    No donations found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Allocation Section */}
      <Row className="mb-4 g-3">
        <Col md={7}>
          <Card className="shadow-sm rounded-4">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <span>
                <h6 className="fw-bold mb-0">Funds Allocated by Category</h6>
                <small className="text-muted">Aid type-wise allocation (₹)</small>
              </span>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" size="sm">
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setTimeRange("month")}>Month</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeRange("quarter")}>Quarter</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeRange("year")}>Year</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Header>
            <Card.Body>
              <PieChart />
              <Table size="sm" className="mt-3">
                <tbody>
                  {allocationCategories.map((cat, i) => (
                    <tr key={i}>
                      <td>{cat.category}</td>
                      <td><Badge bg="secondary">₹{cat.value}</Badge></td>
                      <td><Button variant="outline-primary" size="sm">View Cases</Button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm rounded-4">
            <Card.Header className="bg-light">
              <h6 className="fw-bold mb-0">Category Balances</h6>
              <small className="text-muted">Unutilized funds</small>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled mb-0">
                {allocationCategories.map((cat, i) => (
                  <li key={i} className="mb-3">
                    <Badge bg="info" className="me-2">{cat.category}</Badge>
                    Remaining: <span className="fw-bold">₹{cat.value / 3}</span>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Utilization Section */}
      <Row className="g-3">
        <Col md={7}>
          <Card className="shadow-sm rounded-4">
            <Card.Header className="bg-light">
              <h6 className="fw-bold mb-0">Vouchers Issued vs Redeemed</h6>
              <small className="text-muted">By aid category</small>
            </Card.Header>
            <Card.Body>
              <BarGraph />
              <Table size="sm" className="mt-3">
                <tbody>
                  {utilizationStats.map((cat, i) => (
                    <tr key={i}>
                      <td>{cat.category}</td>
                      <td>Issued: <span className="fw-bold">{cat.issued}</span></td>
                      <td>Redeemed: <span className="fw-bold">{cat.redeemed}</span></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="shadow-sm rounded-4">
            <Card.Header className="bg-light">
              <h6 className="fw-bold mb-0">Geographical Utilization Map</h6>
              <small className="text-muted">Hotspots of impact</small>
            </Card.Header>
            <Card.Body>
              <Heatmap />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
