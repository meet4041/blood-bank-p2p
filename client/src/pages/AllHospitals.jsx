import React, { useEffect, useState } from "react";
import { getAllHospitals, deleteUser } from "../api/userApi";

const AllHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllHospitals();
      if (res.success) setHospitals(res.data);
    } catch (err) {
      setError("Failed to load hospitals.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;
    try {
      await deleteUser(id);
      setHospitals(hospitals.filter((h) => h._id !== id));
    } catch (err) {
      alert("Failed to delete hospital: " + err.message);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading hospitals...</div>;
  if (error) return <div className="text-center text-red-600 mt-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Hospitals</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hospitals.length === 0 ? (
               <tr><td colSpan="4" className="text-center py-4 text-gray-500">No hospitals found.</td></tr>
            ) : (
              hospitals.map((hospital) => (
                <tr key={hospital._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hospital.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(hospital.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(hospital._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllHospitals;