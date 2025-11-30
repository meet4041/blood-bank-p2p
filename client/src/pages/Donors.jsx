import React, { useState, useEffect } from "react";
import { getDonors } from "../api/donorApi";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const response = await getDonors();
      console.log("Fetched donors response:", response);
      
      // Backend returns: { success: true, data: [...] }
      if (response.success && Array.isArray(response.data)) {
        setDonors(response.data);
      } else {
        console.error("Unexpected response structure:", response);
        setError("Failed to load donors - invalid response format");
      }
    } catch (err) {
      console.error("Error fetching donors:", err);
      setError(err.message || "Failed to load donors");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Donors</h2>
        <div className="text-center">Loading donors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Donors</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={fetchDonors}
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
      <h2 className="text-2xl font-semibold text-center mb-6">Donors</h2>
      
      {donors.length === 0 ? (
        <div className="text-center text-gray-500">
          No donors found.
        </div>
      ) : (
        <div className="space-y-4">
          {donors.map((donor) => (
            <div key={donor._id} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{donor.name}</h3>
                  <p className="text-gray-600">
                    Blood Group: <span className="font-medium">{donor.bloodGroup}</span>
                  </p>
                  <p className="text-gray-600">
                    Phone: <span className="font-medium">{donor.phone}</span>
                  </p>
                  {donor.email && (
                    <p className="text-gray-600">
                      Email: <span className="font-medium">{donor.email}</span>
                    </p>
                  )}
                  {donor.city && (
                    <p className="text-gray-600">
                      City: <span className="font-medium">{donor.city}</span>
                    </p>
                  )}
                  <p className="text-gray-600">
                    Added by: <span className="font-medium">
                      {donor.addedBy?.name || 'Unknown'}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                    donor.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {donor.verified ? 'VERIFIED' : 'PENDING'}
                  </span>
                  {donor.lastDonated && (
                    <p className="text-sm text-gray-500 mt-2">
                      Last donated: {new Date(donor.lastDonated).toLocaleDateString()}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(donor.createdAt).toLocaleDateString()}
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

export default Donors;