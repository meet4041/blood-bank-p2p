import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-red-50">
      <h1 className="text-5xl font-extrabold text-red-600 mb-6 text-center">
        Blood Bank Management System
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Welcome to our Blood Bank P2P system. Please login or register to continue.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-white border border-red-600 text-red-600 rounded-lg hover:bg-red-100 transition"
        >
          Register
        </Link>
      </div>
    </main>
  );
};

export default Home;
