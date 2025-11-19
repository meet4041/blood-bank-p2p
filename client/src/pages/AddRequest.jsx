import React, { useState, useContext } from "react";
import { createRequest } from "../api/requestApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddRequest = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // get logged-in user

  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    hospital: "",
    city: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data according to schema
      const requestData = {
        ...form,
        unitsRequired: Number(form.unitsRequired), // convert to number
        requestedBy: user?.token ? user.id : null // include user ID if available
      };

      await createRequest(requestData);
      alert("Blood request added successfully!");
      navigate("/requests");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add request");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">Add Blood Request</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Patient Name
          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Blood Group
          <input
            type="text"
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            placeholder="e.g., A+, O-"
            required
          />
        </label>

        <label className="flex flex-col">
          Units Required
          <input
            type="number"
            name="unitsRequired"
            value={form.unitsRequired}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            min="1"
            required
          />
        </label>

        <label className="flex flex-col">
          Hospital
          <input
            type="text"
            name="hospital"
            value={form.hospital}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          City
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="mt-1 p-2 border rounded"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded font-semibold"
        >
          Submit Request
        </button>
      </form>
    </main>
  );
};

export default AddRequest;
