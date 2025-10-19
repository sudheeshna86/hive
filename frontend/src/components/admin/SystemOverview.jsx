import React from "react";
import { Server, Shield, Globe, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const systemMetrics = {
  serverStatus: [
    { name: "Web Server", status: "healthy", uptime: "99.9%", load: 45 },
    { name: "Database", status: "healthy", uptime: "99.8%", load: 62 },
    { name: "File Storage", status: "healthy", uptime: "100%", load: 23 },
    { name: "Payment Gateway", status: "warning", uptime: "98.5%", load: 78 },
  ],
  regionalStats: [
    { region: "Mumbai", cases: 234, volunteers: 45, ngos: 12, active: true },
    { region: "Delhi", cases: 189, volunteers: 38, ngos: 8, active: true },
    { region: "Bangalore", cases: 156, volunteers: 29, ngos: 6, active: true },
    { region: "Chennai", cases: 123, volunteers: 22, ngos: 5, active: true },
    { region: "Kolkata", cases: 98, volunteers: 18, ngos: 4, active: false },
  ],
};

// Helper functions
const getStatusVariant = (status) => {
  switch (status) {
    case "healthy":
      return "success";
    case "warning":
      return "warning";
    case "critical":
      return "danger";
    default:
      return "secondary";
  }
};

export default function SystemOverview() {
  return (
    <Row className="g-4">
      {/* System Health */}
      <Col lg={6}>
        <Card>
          <Card.Header className="d-flex align-items-center gap-2">
            <Server size={20} className="text-success" />
            <strong>System Health</strong>
          </Card.Header>
          <Card.Body>
            {systemMetrics.serverStatus.map((server, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-3 p-3 rounded bg-light"
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    className={`rounded-circle d-inline-block`}
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor:
                        server.status === "healthy"
                          ? "green"
                          : server.status === "warning"
                          ? "orange"
                          : "red",
                    }}
                  />
                  <div>
                    <p className="mb-0 fw-medium">{server.name}</p>
                    <small className="text-muted">Uptime: {server.uptime}</small>
                  </div>
                </div>
                <div className="text-end">
                  <Badge bg={getStatusVariant(server.status)}>{server.status}</Badge>
                  <div className="mt-2" style={{ width: "120px" }}>
                    <ProgressBar now={server.load} label={`${server.load}%`} />
                  </div>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>

      {/* Regional Overview */}
      <Col lg={6}>
        <Card>
          <Card.Header className="d-flex align-items-center gap-2">
            <Globe size={20} className="text-success" />
            <strong>Regional Overview</strong>
          </Card.Header>
          <Card.Body>
            {systemMetrics.regionalStats.map((region, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center mb-3 p-3 rounded bg-light"
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    className="rounded-circle d-inline-block"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: region.active ? "green" : "gray",
                    }}
                  />
                  <div>
                    <p className="mb-1 fw-medium">{region.region}</p>
                    <small className="text-muted">
                      {region.cases} cases • {region.volunteers} volunteers • {region.ngos} NGOs
                    </small>
                  </div>
                </div>
                <Badge bg={region.active ? "success" : "secondary"}>
                  {region.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>

      {/* Performance Metrics */}
      <Col lg={6}>
        <Card>
          <Card.Header className="d-flex align-items-center gap-2">
            <Activity size={20} className="text-success" />
            <strong>Performance Metrics</strong>
          </Card.Header>
          <Card.Body>
            <Row>
              {[
                { label: "Avg Response Time", value: "2.3s", color: "success" },
                { label: "Uptime", value: "99.9%", color: "primary" },
                { label: "Daily Active Users", value: "1.2K", color: "purple" },
                { label: "Data Processed", value: "45GB", color: "warning" },
              ].map((metric, idx) => (
                <Col md={6} key={idx} className="mb-3">
                  <div className={`text-center p-3 rounded`} style={{ backgroundColor: "#f8f9fa" }}>
                    <div className={`fw-bold`} style={{ color: metric.color }}>{metric.value}</div>
                    <small className="text-muted">{metric.label}</small>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>

      {/* Security Status */}
      <Col lg={6}>
        <Card>
          <Card.Header className="d-flex align-items-center gap-2">
            <Shield size={20} className="text-success" />
            <strong>Security Status</strong>
          </Card.Header>
          <Card.Body>
            {[
              {
                icon: <CheckCircle size={20} className="text-success" />,
                title: "SSL Certificate",
                subtitle: "Valid until Dec 2024",
                badge: "Active",
                color: "success",
                bgColor: "#d4edda",
              },
              {
                icon: <CheckCircle size={20} className="text-success" />,
                title: "Firewall",
                subtitle: "All ports secured",
                badge: "Protected",
                color: "success",
                bgColor: "#d4edda",
              },
              {
                icon: <AlertTriangle size={20} className="text-warning" />,
                title: "Failed Login Attempts",
                subtitle: "23 attempts in last hour",
                badge: "Monitoring",
                color: "warning",
                bgColor: "#fff3cd",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="d-flex justify-content-between align-items-center mb-3 p-3 rounded"
                style={{ backgroundColor: item.bgColor }}
              >
                <div className="d-flex align-items-center gap-3">
                  {item.icon}
                  <div>
                    <p className="mb-1 fw-medium">{item.title}</p>
                    <small className="text-muted">{item.subtitle}</small>
                  </div>
                </div>
                <Badge bg={item.color}>{item.badge}</Badge>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
