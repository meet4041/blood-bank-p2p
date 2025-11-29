import React, { useState, useContext, useEffect, useRef } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);
  const emailInputRef = useRef(null);

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) navigate("/dashboard");
    if (emailInputRef.current) emailInputRef.current.focus();
  }, [token, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Login Failed");
    }
  };

  return (
    <main>
      <div className="max-w-md mx-auto px-4 mt-12">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                ref={emailInputRef}
                name="email"
                type="email"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
