import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(form); // returns { token, user }
      alert("Registration successful!");

      if (result?.token) {
        login(result.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      alert(err.message || "Registration Failed");
    }
  };

  return (
    <main>
      <div className="max-w-md mx-auto px-4 mt-12">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input name="name" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="email" type="email" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input name="password" type="password" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">Register</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
