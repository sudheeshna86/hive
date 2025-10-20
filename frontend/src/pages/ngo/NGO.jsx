import React from "react";
import NGODashboard from "../../components/ngo/NGODashboard";

export default function NGOPage() {
  // Get user from localStorage
  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;

  // Assign dummy user if none or wrong role
  const user =
    parsedUser && parsedUser.role === "ngo"
      ? parsedUser
      : {
          id: "dummy-ngo-001",
          name: "Demo NGO Admin",
          role: "ngo",
          organization: "Demo NGO Organization",
          email: "demo@ngo.com",
          phone: "9999999999",
          extraInfo: { totalSchemes: 5, verifiedCases: 10 },
        };

  return <NGODashboard user={user} />;
}