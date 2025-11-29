import React, { useEffect, useState } from "react";
import { getRequests, deleteRequest } from "../api/requestApi";
import { useNavigate } from "react-router-dom";

const BloodRequest = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getRequests();
      setRequests(data || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      alert("Error fetching requests");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await deleteRequest(id);
      fetchRequests();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <header>
          <h2 className="text-2xl font-semibold text-center">Blood Requests</h2>
        </header>

        <section className="mt-6 text-center">
          <button onClick={() => navigate("/add-request")} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Add New Request</button>
        </section>

        <section className="mt-6">
          {loading ? (
            <p className="text-center mt-6">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-center mt-6">No blood requests found.</p>
          ) : (
            <ul className="space-y-4 mt-4">
              {requests.map((req) => (
                <li key={req._id} className="bg-white p-4 rounded shadow flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{req.patientName}</h3>
                    <p>Blood Group: <strong>{req.bloodGroup}</strong></p>
                    <p>Units Needed: <strong>{req.unitsRequired ?? req.units}</strong></p>
                    <p>Hospital: <strong>{req.hospital}</strong></p>
                    <p>City: <strong>{req.city}</strong></p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate(`/edit-request/${req._id}`)} className="px-3 py-1 border rounded">Edit</button>
                    <button onClick={() => handleDelete(req._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default BloodRequest;
