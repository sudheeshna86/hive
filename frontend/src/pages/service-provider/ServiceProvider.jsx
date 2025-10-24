import React from "react";
import ServiceProviderDashboard from "../../components/service-provider/ServiceProviderDashboard";

export default function ServiceProviderPage() {
  // Get user from localStorage
  const userData = localStorage.getItem("user");
  const parsedUser = userData ? JSON.parse(userData) : null;

  // Assign dummy service provider if none or wrong role
  const user =
    parsedUser && parsedUser.role === "service-provider"
      ? parsedUser
      : {
          id: "dummy-provider-001",
          name: "Demo Service Provider",
          role: "service-provider",
          organization: "Demo Aid Services",
          email: "demo@serviceprovider.com",
          phone: "9998887777",
          extraInfo: {
            totalVouchers: 12,
            redeemedVouchers: 8,
            ongoingCases: 4,
          },
        };

  return <ServiceProviderDashboard user={user} />;
}
