import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NGODashboard from "../../components/ngo/NGODashboard";

export default function NGOPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "ngo") {
      navigate("/");
      return;
    }

    setUser(parsedUser);
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "8rem", height: "8rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <NGODashboard user={user} />;
}
