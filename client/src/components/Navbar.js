import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#f0f0f0" }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>

      {user ? (
        <>
          <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>

          {user.role === "HOSPITAL" && (
            <Link to="/requests" style={{ marginRight: 10 }}>Requests</Link>
          )}

          {user.role === "DONOR" && (
            <Link to="/incoming" style={{ marginRight: 10 }}>Incoming</Link>
          )}

          {user.role === "ADMIN" && (
            <Link to="/verify-hospitals" style={{ marginRight: 10 }}>Verify</Link>
          )}

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
