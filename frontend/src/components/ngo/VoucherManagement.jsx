import React, { useState } from "react";
import { Card, Button, Tab, Nav, Form, Row, Col, Table, Badge, Modal, ProgressBar, Dropdown } from "react-bootstrap";

// Dummy data for demonstration
const vouchers = [
  {
    id: "VCH-0452", beneficiary: "Seema Rao", caseId: "CASE-102", type: "Food", issued: "2025-10-20 13:20",
    by: "Priya Sharma", value: 700, expiry: "2025-11-04", status: "Active"
  },
  { id: "VCH-0480", beneficiary: "Anil Kumar", caseId: "CASE-101", type: "Medical", issued: "2025-10-16 09:10",
    by: "System-AI", value: 3800, expiry: "2025-10-31", status: "Expired"
  }
];
const redeemed = [
  {
    id: "VCH-0452", beneficiary: "Seema Rao", caseId: "CASE-102", type: "Food", provider: "Sahara Orphanage",
    location: "Noida", date: "2025-10-21 14:01", proof: ["img"], verified: true
  }
];
// Dummy proof content
const proofs = {
  "VCH-0452": { photo: true, gps: { lat: 28.56, lng: 77.42 }, voice: true, bill: true }
};
const pendingVerifications = [
  {
    id: "VCH-0480", caseId: "CASE-101", type: "Medical", by: "HeartCare Hospital",
    date: "2025-10-22", ai: 84, status: "Pending", proof: proofs["VCH-0452"]
  }
];
// Analytics data, feel free to attach real or API-backed stats
const summary = { issued: 1230, redeemed: 1080, pending: 45, flagged: 12 };

function VoucherCard({ voucher, onQR, onReissue, onViewCase }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={8}>
            <div className="fw-bold">{voucher.id} - {voucher.beneficiary}</div>
            <div>Case: <Badge bg="secondary">{voucher.caseId}</Badge> | Type: {voucher.type}</div>
            <div>Issued: {voucher.issued} by <b>{voucher.by}</b></div>
            <div>Amount: <span className="fw-bold">₹{voucher.value}</span></div>
            <div>Expiry: {voucher.expiry}</div>
            <div>Status: <Badge bg={voucher.status === "Active" ? "success" : voucher.status === "Expired" ? "secondary" : "info"}>{voucher.status}</Badge></div>
          </Col>
          <Col md={4} className="d-flex align-items-end flex-column justify-content-end gap-1">
            <Button size="sm" variant="outline-primary" onClick={onQR}>View QR Code</Button>
            <Button size="sm" variant="outline-success" onClick={onReissue}>Reissue Voucher</Button>
            <Button size="sm" variant="outline-secondary" onClick={onViewCase}>View Linked Case</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default function VoucherManagement() {
  const [tab, setTab] = useState("issued");
  const [qrModal, setQRModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [proofModal, setProofModal] = useState(false);
  const [pendingModal, setPendingModal] = useState(false);

  // Filter example states
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // For simplicity, table filters are minimal. Add more as desired.
  const filteredVouchers = vouchers.filter(v =>
    (!typeFilter || v.type === typeFilter) &&
    (!statusFilter || v.status === statusFilter) &&
    (!dateFilter || v.issued.startsWith(dateFilter))
  );

  // Dummy chart stubs (replace with real chart libs)
  const PieChart = () => <div style={{height:180, textAlign:'center', paddingTop:55}}>Pie/Donut Chart Placeholder</div>;
  const Heatmap = () => <div style={{height:100, textAlign:'center', paddingTop:35}}>Heatmap Chart Placeholder</div>;
  const BarChart = () => <div style={{height:160, textAlign:'center', paddingTop:50}}>Bar Chart Placeholder</div>;
  const LineChart = () => <div style={{height:160, textAlign:'center', paddingTop:50}}>Line Chart Placeholder</div>;

  return (
    <div>
      <Tab.Container activeKey={tab} onSelect={setTab}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item><Nav.Link eventKey="issued">Issued Vouchers</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="redeemed">Redeemed Vouchers</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="pending">Pending Verifications</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="analytics">Redemption Analytics</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          {/* --------- 1. Issued Vouchers --------- */}
          <Tab.Pane eventKey="issued">
            <Card className="mb-3">
              <Card.Body>
                <Form className="row g-2">
                  <Col md>
                    <Form.Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                      <option value="">Filter by Type</option>
                      <option>Food</option>
                      <option>Shelter</option>
                      <option>Medical</option>
                      <option>Transport</option>
                    </Form.Select>
                  </Col>
                  <Col md>
                    <Form.Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                      <option value="">Filter by Status</option>
                      <option>Active</option>
                      <option>Expired</option>
                      <option>Redeemed</option>
                    </Form.Select>
                  </Col>
                  <Col md>
                    <Form.Control type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
                  </Col>
                  <Col md="auto" className="d-flex gap-2">
                    <Button variant="outline-secondary" size="sm">Export PDF</Button>
                    <Button variant="outline-secondary" size="sm">Export CSV</Button>
                  </Col>
                </Form>
              </Card.Body>
            </Card>
            {filteredVouchers.map((voucher, idx) =>
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
                onQR={() => { setSelectedVoucher(voucher); setQRModal(true); }}
                onReissue={() => alert("Voucher reissued!")}
                onViewCase={() => alert("Show Linked Case Summary")}
              />
            )}
            <Modal show={qrModal} onHide={() => setQRModal(false)} centered>
              <Modal.Header closeButton><Modal.Title>Voucher QR Code</Modal.Title></Modal.Header>
              <Modal.Body>
                <div style={{textAlign:"center"}}>
                  <div style={{margin:"24px auto",background:"#eee",width:180,height:180,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>QR CODE</div>
                  <div className="text-muted small">Scan this code at provider location for redemption.</div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setQRModal(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Tab.Pane>
          {/* --------- 2. Redeemed Vouchers ---------- */}
          <Tab.Pane eventKey="redeemed">
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Voucher ID</th>
                  <th>Beneficiary</th>
                  <th>Case ID</th>
                  <th>Type</th>
                  <th>Redeemed At</th>
                  <th>Date & Time</th>
                  <th>Proof</th>
                  <th>Verified</th>
                </tr>
              </thead>
              <tbody>
                {redeemed.map(v =>
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.beneficiary}</td>
                    <td>{v.caseId}</td>
                    <td>{v.type}</td>
                    <td>{v.provider}, {v.location}</td>
                    <td>{v.date}</td>
                    <td>
                      <Button size="sm" variant="outline-primary"
                        onClick={() => { setSelectedVoucher(v); setProofModal(true); }}>
                        View Proof
                      </Button>
                    </td>
                    <td>
                      <Badge bg={v.verified ? "success" : "secondary"}>{v.verified ? "Yes" : "No"}</Badge>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Modal show={proofModal} onHide={() => setProofModal(false)}>
              <Modal.Header closeButton><Modal.Title>Redemption Proofs</Modal.Title></Modal.Header>
              <Modal.Body>
                {/* Replace with thumbnails and map location etc */}
                <div>
                  <div><Badge bg="info">Photo</Badge></div>
                  <img alt="Proof" src="https://via.placeholder.com/180" style={{margin:"10px 0"}} />
                  <div><Badge bg="info">GPS</Badge> Lat: 28.56, Lng: 77.42</div>
                  <div><Badge bg="info">Voice</Badge> (audio)</div>
                  <div><Badge bg="info">Bill</Badge> (PDF/Image link)</div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setProofModal(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Tab.Pane>
          {/* --------- 3. Pending Verifications ---------- */}
          <Tab.Pane eventKey="pending">
            <div className="mb-3">
              <b>Verification Queue:</b> These vouchers require review (AI + manual).
            </div>
            {pendingVerifications.map((pv, idx) =>
              <Card key={pv.id} className="mb-3">
                <Card.Body>
                  <Row>
                    <Col md={9}>
                      <div><b>Voucher ID:</b> <a href={"#case_" + pv.caseId}>{pv.id}</a></div>
                      <div><b>Type:</b> {pv.type}</div>
                      <div><b>Submitted By:</b> {pv.by}</div>
                      <div><b>Submission Date:</b> {pv.date}</div>
                      <div><b>AI Confidence:</b> {pv.ai}%</div>
                      <div><b>Status:</b> <Badge bg={pv.status === "Pending" ? "secondary" : pv.status === "Flagged" ? "danger" : "primary"}>{pv.status}</Badge></div>
                    </Col>
                    <Col md={3} className="d-flex flex-column align-items-end justify-content-end gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => setPendingModal(true)}>View Proof</Button>
                      <Button size="sm" variant="outline-info">AI Verify</Button>
                      <Button size="sm" variant="outline-secondary">Add Notes</Button>
                      <Button size="sm" variant="success">Approve</Button>
                      <Button size="sm" variant="danger">Reject</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            <Modal show={pendingModal} onHide={() => setPendingModal(false)}>
              <Modal.Header closeButton><Modal.Title>Submitted Proofs</Modal.Title></Modal.Header>
              <Modal.Body>
                <div><Badge bg="info">Photo</Badge> (img)</div>
                <div><Badge bg="info">GPS</Badge> 28.56, 77.42</div>
                <div><Badge bg="info">Voice</Badge> (play audio)</div>
                <div><Badge bg="info">Bill</Badge> (file link)</div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setPendingModal(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Tab.Pane>
          {/* --------- 4. Analytics Charts ---------- */}
          <Tab.Pane eventKey="analytics">
            <Row>
              {/* a. Pie for type */}
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header>Voucher Breakdown by Type</Card.Header>
                  <Card.Body>
                    <PieChart />
                    <div className="d-flex gap-3 mt-3">
                      <div><Badge bg="primary">Food</Badge></div>
                      <div><Badge bg="secondary">Shelter</Badge></div>
                      <div><Badge bg="info">Medical</Badge></div>
                      <div><Badge bg="success">Transport</Badge></div>
                    </div>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Time Trend (Line Chart)</Card.Header>
                  <Card.Body>
                    <LineChart />
                  </Card.Body>
                </Card>
              </Col>
              {/* b. Regional distribution */}
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Header>Regional Redemption Heatmap</Card.Header>
                  <Card.Body>
                    <Heatmap />
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Header>Provider-wise Analysis</Card.Header>
                  <Card.Body>
                    <BarChart />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className="mt-4">
              <Card.Header>Summary Stats</Card.Header>
              <Card.Body>
                <Row>
                  <Col>Total Vouchers Issued: <Badge bg="primary">{summary.issued}</Badge></Col>
                  <Col>Total Redeemed: <Badge bg="success">{summary.redeemed}</Badge></Col>
                  <Col>Verification Pending: <Badge bg="warning">{summary.pending}</Badge></Col>
                  <Col>AI Flagged: <Badge bg="danger">{summary.flagged}</Badge></Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
