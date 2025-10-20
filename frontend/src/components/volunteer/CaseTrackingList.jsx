// components/volunteer/CaseTrackingList.jsx
import React, { useEffect, useState } from "react";
import { Table, Badge, Button, Card } from "react-bootstrap";
import { FiEye, FiEdit, FiCheckCircle } from "react-icons/fi";
import { useToast } from "../../hooks/useToast";
import { motion, AnimatePresence } from "framer-motion";

export function CaseTrackingList() {
  const [cases, setCases] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCases = JSON.parse(localStorage.getItem("volunteerCases") || "[]");
    setCases(storedCases);
  }, []);

  const updateStatus = (caseId, newStatus) => {
    const updatedCases = cases.map((c) =>
      c.id === caseId ? { ...c, status: newStatus } : c
    );
    setCases(updatedCases);
    localStorage.setItem("volunteerCases", JSON.stringify(updatedCases));

    toast({
      title: "Status Updated",
      description: `Case ${caseId} marked as ${newStatus}.`,
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "in-progress":
        return <Badge bg="primary">In Progress</Badge>;
      case "completed":
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  // Row animation variants
  const rowVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-3 text-primary">Registered Cases</h5>
        {cases.length === 0 ? (
          <p>No cases registered yet.</p>
        ) : (
          <Table responsive bordered hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Case ID</th>
                <th>Beneficiary</th>
                <th>Assistance Type</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {cases.map((c, idx) => (
                  <motion.tr
                    key={c.id}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={rowVariants}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                  >
                    <td>{c.id}</td>
                    <td>{c.beneficiaryName}</td>
                    <td>{c.assistanceType.join(", ")}</td>
                    <td>{c.urgencyLevel}</td>
                    <td>{getStatusBadge(c.status)}</td>
                    <td>{formatDate(c.createdAt)}</td>
                    <td className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          toast({
                            title: "Case Details",
                            description: JSON.stringify(c, null, 2),
                          })
                        }
                      >
                        <FiEye />
                      </Button>
                      {c.status !== "completed" && (
                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => updateStatus(c.id, "completed")}
                        >
                          <FiCheckCircle />
                        </Button>
                      )}
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          toast({
                            title: "Edit Action",
                            description: "Editing functionality can be added here.",
                          })
                        }
                      >
                        <FiEdit />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}
