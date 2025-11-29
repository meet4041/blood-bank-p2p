import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobile = () => setMobileOpen((s) => !s);

  return (
    <header className="bg-red-600 text-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Blood Bank System</h1>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-3">
          {token ? (
            <>
              <button onClick={() => navigate("/dashboard")} className="text-white text-sm hover:underline">Dashboard</button>
              <button onClick={() => navigate("/donors")} className="text-white text-sm hover:underline">Donors</button>
              <button onClick={() => navigate("/requests")} className="text-white text-sm hover:underline">Requests</button>
              <button onClick={logout} className="text-white text-sm hover:underline">Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="text-white text-sm hover:underline">Login</button>
              <button onClick={() => navigate("/register")} className="text-white text-sm hover:underline">Register</button>
            </>
          )}
        </nav>

        {/* Mobile toggle */}
        <div className="sm:hidden">
          <button onClick={toggleMobile} aria-label="Open menu" className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sliding menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-red-600 text-white p-3">
          {token ? (
            <div className="flex flex-col gap-2">
              <button className="text-left w-full" onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}>Dashboard</button>
              <button className="text-left w-full" onClick={() => { navigate('/donors'); setMobileOpen(false); }}>Donors</button>
              <button className="text-left w-full" onClick={() => { navigate('/requests'); setMobileOpen(false); }}>Requests</button>
              <button className="text-left w-full" onClick={() => { logout(); setMobileOpen(false); }}>Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button className="text-left w-full" onClick={() => { navigate('/login'); setMobileOpen(false); }}>Login</button>
              <button className="text-left w-full" onClick={() => { navigate('/register'); setMobileOpen(false); }}>Register</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
