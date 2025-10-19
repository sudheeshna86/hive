import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { Users, Search, MoreHorizontal, Eye } from "lucide-react";

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@volunteer.com",
    role: "volunteer",
    status: "active",
    cases: 23,
    joinDate: "2024-01-15",
    location: "Mumbai",
  },
  {
    id: 2,
    name: "HelpIndia NGO",
    email: "contact@helpindia.org",
    role: "ngo",
    status: "active",
    verified: 156,
    joinDate: "2023-11-20",
    location: "Delhi",
  },
  {
    id: 3,
    name: "Rajesh Patel",
    email: "rajesh@donor.com",
    role: "donor",
    status: "active",
    donated: 45000,
    joinDate: "2024-02-10",
    location: "Bangalore",
  },
  {
    id: 4,
    name: "City Hospital",
    email: "admin@cityhospital.com",
    role: "service_provider",
    status: "active",
    services: 89,
    joinDate: "2023-12-05",
    location: "Chennai",
  },
  {
    id: 5,
    name: "Admin User",
    email: "admin@aidtrack.com",
    role: "admin",
    status: "active",
    permissions: "full",
    joinDate: "2023-10-01",
    location: "Mumbai",
  },
  {
    id: 6,
    name: "John Doe",
    email: "john@volunteer.com",
    role: "volunteer",
    status: "suspended",
    cases: 5,
    joinDate: "2024-03-01",
    location: "Kolkata",
  },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleVariant = (role) => {
    switch (role) {
      case "volunteer":
        return "primary";
      case "ngo":
        return "success";
      case "donor":
        return "purple"; // custom color
      case "service_provider":
        return "warning";
      case "admin":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "suspended":
        return "danger";
      case "pending":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="mb-5">
      {/* User Stats */}
      <Row className="mb-4">
        {[
          { label: "Total Users", value: "1,247", variant: "primary" },
          { label: "Volunteers", value: "456", variant: "success" },
          { label: "NGOs", value: "89", variant: "secondary" },
          { label: "Donors", value: "567", variant: "warning" },
          { label: "Service Providers", value: "135", variant: "danger" },
        ].map((stat, index) => (
          <Col md={2} key={index}>
            <Card className="text-center">
              <Card.Body>
                <h4 className={`text-${stat.variant} fw-bold`}>{stat.value}</h4>
                <small className="text-muted">{stat.label}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* User Management */}
      <Card>
        <Card.Header className="d-flex align-items-center gap-2">
          <Users size={20} className="text-success" />
          <strong>User Management</strong>
        </Card.Header>
        <Card.Body>
          {/* Search & Filter */}
          <Row className="mb-3 g-2">
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="volunteer">Volunteers</option>
                <option value="ngo">NGOs</option>
                <option value="donor">Donors</option>
                <option value="service_provider">Service Providers</option>
                <option value="admin">Admins</option>
              </Form.Select>
            </Col>
          </Row>

          {/* User List */}
          <div className="d-flex flex-column gap-3">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                      <Users size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="mb-0 fw-medium">{user.name}</p>
                      <small className="text-muted">{user.email}</small>
                      <div className="mt-1 d-flex gap-2 align-items-center flex-wrap">
                        <Badge bg={getRoleVariant(user.role)}>
                          {user.role.replace("_", " ")}
                        </Badge>
                        <Badge bg={getStatusVariant(user.status)}>
                          {user.status}
                        </Badge>
                        <small className="text-muted">{user.location}</small>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="text-end">
                      {user.role === "volunteer" && <small>{user.cases} cases</small>}
                      {user.role === "ngo" && <small>{user.verified} verified</small>}
                      {user.role === "donor" && <small>₹{user.donated?.toLocaleString()}</small>}
                      {user.role === "service_provider" && <small>{user.services} services</small>}
                      <small className="d-block text-muted">Joined {user.joinDate}</small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-secondary" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
