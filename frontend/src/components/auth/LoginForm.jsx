import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // if using React Router
import { Eye, EyeOff, LogIn } from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // replace useRouter with useNavigate for React Router

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store user data in localStorage (simulate auth)
    localStorage.setItem(
      "user",
      JSON.stringify({
        email,
        role,
        name: email.split("@")[0],
        id: Math.random().toString(36).substr(2, 9),
      })
    );

    // Redirect based on role
    switch (role) {
      case "volunteer":
        navigate("/volunteer");
        break;
      case "ngo":
        navigate("/ngo");
        break;
      case "donor":
        navigate("/donor");
        break;
      case "service-provider":
        navigate("/service-provider");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        navigate("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow animate_animated animate_fadeInUp" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-header text-center">
          <h5 className="card-title d-flex justify-content-center align-items-center gap-2 mb-2">
            <LogIn className="text-primary" />
            Sign In
          </h5>
          <p className="card-text text-muted">Access your AidTrack dashboard</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-light position-absolute top-0 end-0 h-100 px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="text-muted" /> : <Eye className="text-muted" />}
              </button>
            </div>

            {/* Role */}
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select your role</option>
                <option value="volunteer">Volunteer</option>
                <option value="ngo">NGO</option>
                <option value="donor">Donor</option>
                <option value="service-provider">Service Provider</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}