import React, { useState, useRef, useEffect } from "react";
import { createDonor } from "../api/donorApi";
import { useNavigate } from "react-router-dom";

const AddDonor = () => {
  const navigate = useNavigate();

  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.bloodGroup || !form.phone) {
      alert('Please fill in name, blood group and phone');
      return;
    }

    try {
      await createDonor(form);
      alert("Donor added!");
      navigate("/donors");
    } catch (err) {
      alert("Failed to add donor");
    }
  };

  return (
    <main>
      <div className="max-w-xl mx-auto px-4 mt-8">
        <header>
          <h2 className="text-2xl font-semibold text-center">Add Donor</h2>
        </header>

        <section className="mt-6 bg-white p-6 rounded shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input ref={nameRef} name="name" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400" />
            </div>

            <div>
              <label className="block text-sm font-medium">Blood Group</label>
              <input name="bloodGroup" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input name="city" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input name="phone" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Add</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AddDonor;
