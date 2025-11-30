import React, { useState, useRef, useEffect } from "react";
import { createRequest } from "../api/requestApi";
import { useNavigate } from "react-router-dom";

const AddRequest = () => {
  const navigate = useNavigate();

  const patientRef = useRef(null);
  useEffect(() => {
    patientRef.current?.focus();
  }, []);

  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    units: "",
    hospital: "",
    city: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.patientName || !form.bloodGroup || !form.units) {
      alert('Please fill in patient name, blood group and units needed');
      return;
    }

    try {
      await createRequest({
        patientName: form.patientName,
        bloodGroup: form.bloodGroup,
        unitsRequired: Number(form.units),
        hospital: form.hospital,
        city: form.city
      });
      alert("Blood request added!");
      navigate("/requests");
    } catch (err) {
      alert("Failed to add request");
      console.error(err);
    }
  };

  return (
    <main>
      <div className="max-w-xl mx-auto px-4 mt-8">
        <header>
          <h2 className="text-2xl font-semibold text-center">Add Blood Request</h2>
        </header>

        <section className="mt-6 bg-white p-6 rounded shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Patient Name</label>
              <input ref={patientRef} name="patientName" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Blood Group</label>
              <input name="bloodGroup" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Units Needed</label>
              <input name="units" type="number" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Hospital</label>
              <input name="hospital" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input name="city" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Add Request</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AddRequest;
