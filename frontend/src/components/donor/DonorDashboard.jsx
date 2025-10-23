import React, { useState } from "react";
import { FiHeart, FiLogOut, FiBell } from "react-icons/fi";
import VerifiedCasesList from "./VerifiedCasesList";
import DonationHistory from "./DonationHistory";
import DonorStats from "./DonorStats";
import ImpactStories from "./ImpactStories";

// Demo stats and donations for example UI
const demoStats = {
  totalDonated: 0,
  casesSupported: 0,
  peopleHelped: 0,
  impactScore: 0,
  impactScoreMax: 100,
  completed: 12,
  helped: 18,
  reached: 5
};
const demoDonations = [
  { caseId: "#AID-001", desc: "Medical assistance - John Doe", amount: "$250", time: "2 days ago" },
  { caseId: "#AID-003", desc: "Food assistance - Jane Smith", amount: "$100", time: "1 week ago" },
  { caseId: "#AID-005", desc: "Shelter assistance - Bob Wilson", amount: "$500", time: "2 weeks ago" }
];

export default function DonorDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Helper for header summary cards (top row)
  const TopStatCard = ({ label, value, sublabel, color, highlight }) => (
    <div style={{
      background: "#fff", borderRadius: 12, boxShadow: "0 0 0.5rem #ececec",
      padding: "28px 20px 18px 20px", minHeight: 120, display: "flex", flexDirection: "column",
      justifyContent: "center", position: "relative"
    }}>
      <div style={{ fontSize: 15, fontWeight: 500, color: "#3d3e45" }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: highlight || "#195c2d", margin: "6px 0" }}>{value}</div>
      <div style={{ fontSize: 14, color: "#75757e" }}>{sublabel}</div>
      {color && <div style={{
        position: "absolute", right: 18, top: 16,
        background: color, width: 20, height: 20, borderRadius: "50%"
      }} />}
    </div>
  );

  return (
    <div style={{ background: "#fafcfc", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid #ececec", background: "#fff", position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "24px 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            <div style={{
              background: "#e0f3e4", padding: 7, borderRadius: "50%"
            }}>
              <FiHeart size={26} color="#198754" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 21, color: "#222" }}>Donor Dashboard</div>
              <div style={{ color: "#7a8e90", fontSize: 15, marginTop: 2 }}>
                Welcome back, {user.name}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
              <FiBell /> Updates
            </button>
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Top Nav */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 16px"
      }}>
        <div style={{
          display: "flex", justifyContent: "center", margin: "32px 0 0 0", background: "#f5f7fa",
          borderRadius: 8, boxShadow: "0 0 0.5rem #f4f4f4"
        }}>
          {["overview", "cases", "history", "impact"].map(tab => (
            <button key={tab}
              className={`btn py-2 px-4 fw-semibold ${activeTab === tab ? "btn-light border-bottom border-3 border-success" : ""}`}
              style={{
                background: "none", border: "none", boxShadow: "none", outline: "none",
                fontSize: 16, minWidth: 180
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "overview" && "Overview"}
              {tab === "cases" && "Browse Cases"}
              {tab === "history" && "My Donations"}
              {tab === "impact" && "Impact Stories"}
            </button>
          ))}
        </div>
      </div>

      {/* Main section */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        {activeTab === "overview" && (
          <div>
            <div style={{ marginBottom: 36, marginTop: 15 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#222" }}>Your Impact Dashboard</div>
              <div style={{ color: "#555e60", marginTop: 2 }}>
                Track your donations and see the difference you're making
              </div>
            </div>

            {/* Row: 4 main summary cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 21, marginBottom: 36
            }}>
              <TopStatCard
                label="Total Donated"
                value={"$" + demoStats.totalDonated}
                sublabel="Your generous contributions"
                highlight="#068941"
              />
              <TopStatCard
                label="Cases Supported"
                value={demoStats.casesSupported}
                sublabel="Individual cases helped"
                highlight="#355dc4"
              />
              <TopStatCard
                label="People Helped"
                value={demoStats.peopleHelped}
                sublabel="Lives directly impacted"
                highlight="#068941"
              />
              <TopStatCard
                label="Impact Score"
                value={demoStats.impactScore + "/" + demoStats.impactScoreMax}
                sublabel="Community impact rating"
                highlight="#9819b2"
              />
            </div>

            {/* Row: 2 main cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 21 }}>
              {/* Recent Donations */}
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 0 0.5rem #ececec", padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 6 }}>Recent Donations</div>
                <div style={{ color: "#748680", fontSize: 14, marginBottom: 16 }}>Your latest contributions</div>
                {demoDonations.map(donation => (
                  <div key={donation.caseId}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      background: "#f6f7fa", borderRadius: 7, marginBottom: 15, padding: "16px 14px"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{donation.caseId}</div>
                      <div style={{ fontSize: 14, color: "#7c8d95" }}>{donation.desc}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700, color: "#17ad49", fontSize: 18 }}>{donation.amount}</div>
                      <div style={{ fontSize: 13, color: "#999", marginTop: 2 }}>{donation.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Impact Summary */}
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 0 0.5rem #ececec", padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 19, marginBottom: 6 }}>Impact Summary</div>
                <div style={{ color: "#748680", fontSize: 14, marginBottom: 16 }}>Lives you've helped change</div>
                <div
                  style={{
                    borderRadius: 9,
                    background: "#e7fae8",
                    border: "1.5px solid #a4f0b2",
                    padding: "16px 18px",
                    fontWeight: 600,
                    color: "#097634", marginBottom: 13, fontSize: 18,
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}
                >
                  <span>
                    Cases Completed<br /><span style={{ fontWeight: 400, color: "#41a464", fontSize: 14 }}>Successfully helped</span>
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 24, color: "#097634" }}>{demoStats.completed}</span>
                </div>
                <div
                  style={{
                    borderRadius: 9,
                    background: "#eaf3ff",
                    border: "1.5px solid #aad0ff",
                    padding: "16px 18px",
                    fontWeight: 600,
                    color: "#1554ad", marginBottom: 13, fontSize: 18,
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}
                >
                  <span>
                    People Helped<br /><span style={{ fontWeight: 400, color: "#3365a2", fontSize: 14 }}>Direct beneficiaries</span>
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 24, color: "#1554ad" }}>{demoStats.helped}</span>
                </div>
                <div
                  style={{
                    borderRadius: 9,
                    background: "#f8eafd",
                    border: "1.5px solid #eabfff",
                    padding: "16px 18px",
                    fontWeight: 600,
                    color: "#982bcb", fontSize: 18,
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                  }}
                >
                  <span>
                    Communities Reached<br /><span style={{ fontWeight: 400, color: "#bc79ce", fontSize: 14 }}>Areas impacted</span>
                  </span>
                  <span style={{ fontWeight: 700, fontSize: 24, color: "#982bcb" }}>{demoStats.reached}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* TAB: BROWSE CASES */}
        {activeTab === "cases" && (
          <div style={{ background: "#fff", padding: 26, borderRadius: 10, boxShadow: "0 0 0.5rem #ececec", margin: "50px 0" }}>
            <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 2 }}>Verified Cases</div>
            <div style={{ color: "#748680", fontSize: 14, marginBottom: 14 }}>
              Browse and donate to verified cases that need your help
            </div>
            <VerifiedCasesList />
          </div>
        )}

        {/* TAB: DONATION HISTORY */}
        {activeTab === "history" && (
          <div style={{ background: "#fff", padding: 26, borderRadius: 10, boxShadow: "0 0 0.5rem #ececec", margin: "50px 0" }}>
            <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 2 }}>Donation History</div>
            <div style={{ color: "#748680", fontSize: 14, marginBottom: 14 }}>
              Track all your donations and their impact
            </div>
            <DonationHistory />
          </div>
        )}

        {/* TAB: IMPACT STORIES */}
        {activeTab === "impact" && (
          <div style={{ background: "#fff", padding: 26, borderRadius: 10, boxShadow: "0 0 0.5rem #ececec", margin: "50px 0" }}>
            <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 2 }}>Impact Stories</div>
            <div style={{ color: "#748680", fontSize: 14, marginBottom: 14 }}>
              See how your donations have made a difference
            </div>
            <ImpactStories />
          </div>
        )}

      </div>
    </div>
  );
}
