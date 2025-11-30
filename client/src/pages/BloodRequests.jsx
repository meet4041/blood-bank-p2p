import React, { useState, useEffect } from "react";
import { getRequests } from "../api/requestApi";

const BloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getRequests();
      console.log("Fetched requests response:", response);
      
      // Backend returns: { success: true, data: [...] }
      if (response.success && Array.isArray(response.data)) {
        setRequests(response.data);
      } else {
        console.error("Unexpected response structure:", response);
        setError("Failed to load requests - invalid response format");
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err.message || "Failed to load blood requests");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Blood Requests</h2>
        <div className="text-center">Loading requests...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Blood Requests</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={fetchRequests}
            className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Blood Requests</h2>
      
      {requests.length === 0 ? (
        <div className="text-center text-gray-500">
          No blood requests found.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{request.patientName}</h3>
                  <p className="text-gray-600">
                    Blood Group: <span className="font-medium">{request.bloodGroup}</span>
                  </p>
                  <p className="text-gray-600">
                    Units Required: <span className="font-medium">{request.unitsRequired}</span>
                  </p>
                  <p className="text-gray-600">
                    Hospital: <span className="font-medium">{request.hospital}</span>
                  </p>
                  <p className="text-gray-600">
                    City: <span className="font-medium">{request.city}</span>
                  </p>
                  <p className="text-gray-600">
                    Requested by: <span className="font-medium">
                      {request.requestedBy?.name || 'Unknown'}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'fulfilled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {request.status?.toUpperCase() || 'UNKNOWN'}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BloodRequests;