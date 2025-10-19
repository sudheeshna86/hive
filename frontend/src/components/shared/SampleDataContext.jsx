import React, { createContext, useContext } from "react";
import { sampleUsers, sampleCases, sampleVouchers, sampleDonations, sampleSchemes } from "../../lib/sample-data";

const SampleDataContext = createContext(undefined);

export function SampleDataProvider({ children }) {
  const value = {
    users: sampleUsers,
    cases: sampleCases,
    vouchers: sampleVouchers,
    donations: sampleDonations,
    schemes: sampleSchemes,
  };

  return <SampleDataContext.Provider value={value}>{children}</SampleDataContext.Provider>;
}

export function useSampleData() {
  const context = useContext(SampleDataContext);
  if (context === undefined) {
    throw new Error("useSampleData must be used within a SampleDataProvider");
  }
  return context;
}
