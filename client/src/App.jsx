import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { RadiusProvider } from "./context/RadiusContext";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import AddDonor from "./pages/AddDonor";
import BloodRequests from "./pages/BloodRequests";
import AddRequest from "./pages/AddRequest";

const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <RadiusProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 text-gray-800">
            <Navbar />
            <Routes>
              {/* Landing / Home page */}
              <Route path="/" element={<Home />} />

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
              <Route path="/add-donor" element={<ProtectedRoute><AddDonor /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><BloodRequests /></ProtectedRoute>} />
              <Route path="/add-request" element={<ProtectedRoute><AddRequest /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={<h2 className="text-center mt-20 text-2xl font-bold">Page Not Found</h2>} />
            </Routes>
          </div>
        </BrowserRouter>
      </RadiusProvider>
    </AuthProvider>
  );
};

export default App;
