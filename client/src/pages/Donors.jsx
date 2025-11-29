import React, { useEffect, useState } from "react";
import { getDonors, deleteDonor } from "../api/donorApi";
import { useNavigate } from "react-router-dom";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const data = await getDonors();
      setDonors(data || []);
    } catch (err) {
      alert("Error fetching donors");
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteDonor(id);
      fetchDonors();
    } catch (err) {
      alert("Failed to delete donor");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <header>
          <h2 className="text-2xl font-semibold text-center">Donors</h2>
        </header>

        <section className="mt-6 mb-6">
          <div className="text-center">
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => navigate("/add-donor")}>Add Donor</button>
          </div>
        </section>

        <section>
          {loading ? (
            <p className="text-center mt-6">Loading donors...</p>
          ) : donors.length === 0 ? (
            <p className="text-center mt-6">No donors found.</p>
          ) : (
            donors.map((d) => (
              <article key={d._id} className="mb-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold">{d.name}</h3>
                  <p>Blood Group: {d.bloodGroup}</p>
                  <p>City: {d.city}</p>
                  <p>Phone: {d.phone}</p>

                  <nav className="mt-3" aria-label="Donor actions">
                    <div className="flex gap-2">
                      <button onClick={() => navigate(`/edit-donor/${d._id}`)} className="px-3 py-1 border rounded">Edit</button>
                      <button onClick={() => handleDelete(d._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                    </div>
                  </nav>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default Donors;
