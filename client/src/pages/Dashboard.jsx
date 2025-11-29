import React from "react";
import { useNavigate } from "react-router-dom";
import QuoteWidget from "../components/NearbyCenters";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <header>
          <h2 className="text-2xl font-semibold text-center">Dashboard</h2>

          {/* Overpass widget */}
          <div className="mt-4">
            <QuoteWidget />
          </div>

          <p className="text-center mt-4">Welcome to the Blood Bank Management System!</p>
        </header>

        <section className="mt-8">
          <div className="flex justify-center gap-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => navigate("/donors")}>Manage Donors</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => navigate("/requests")}>Manage Requests</button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
