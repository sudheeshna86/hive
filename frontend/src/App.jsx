import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import VolunteerPage from "./pages/volunteer/Volunteer.jsx";
import NgoPage from './pages/ngo/NGO.jsx';
import DonorPage from './pages/donor/Donor.jsx';
import ServiceProviderPage from './pages/service-provider/ServiceProvider.jsx';
import AdminPage from './pages/admin/Admin.jsx';
import { VolunteerRegisterForm } from "./components/auth/VolunteerRegisterForm.jsx";
import { NgoRegisterForm } from "./components/auth/NgoRegisterForm.jsx";
import { RegisterForm } from "./components/auth/RegisterForm.jsx";
import { DonorRegisterForm } from "./components/auth/DonorRegisterForm.jsx";
import { ServiceProviderRegisterForm } from "./components/auth/ServiceProviderRegisterForm.jsx";
import { LoginForm } from "./components/auth/LoginForm.jsx";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/ngo" element={<NgoPage />} />
        <Route path="/donor" element={<DonorPage />} />
        <Route path="/service-provider" element={<ServiceProviderPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/register/donor" element={<DonorRegisterForm />} />
        <Route path="/register/serviceprovider" element={<ServiceProviderRegisterForm />} />
        <Route path="/register/volunteer" element={<VolunteerRegisterForm />} />
        <Route path="/register/ngo" element={<NgoRegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
