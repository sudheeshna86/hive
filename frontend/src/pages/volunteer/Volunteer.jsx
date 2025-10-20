import React from "react";
import VolunteerDashboard from "../../components/volunteer/VolunteerDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

export default function VolunteerPage() {
  // Get user from localStorage or assign dummy
  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;

  // If no user or wrong role, assign dummy
  const user =
    parsedUser && parsedUser.role === "volunteer"
      ? parsedUser
      : {
          id: "dummy-vol-001",
          name: "Demo Volunteer",
          role: "volunteer",
          organization: "Demo Volunteer Org",
          email: "demo@volunteer.com",
          phone: "9999999999",
          extraInfo: { completedCases: 0, ongoingCases: 0 },
        };

  return <VolunteerDashboard user={user} />;
}