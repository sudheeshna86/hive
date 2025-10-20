import React from "react";
import DonorDashboard from "../../components/donor/DonorDashboard";

export default function DonorPage() {
  // Get user from localStorage
  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;

  // Assign dummy user if none or wrong role
  const user =
    parsedUser && parsedUser.role === "donor"
      ? parsedUser
      : {
          id: "dummy-donor-001",
          name: "Demo Donor",
          role: "donor",
          organization: "Demo Donor Org",
          email: "demo@donor.com",
          phone: "9999999999",
          extraInfo: { totalDonations: 5, activeCases: 3 },
        };

  return <DonorDashboard user={user} />;
}