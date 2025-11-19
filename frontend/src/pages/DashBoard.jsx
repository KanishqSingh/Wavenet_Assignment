import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
    
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      <div className="flex flex-col space-y-4">
        <Link
          to="/invoices"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Manage Invoices
        </Link>

        <Link
          to="/users"
          className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Manage Users
        </Link>
      </div>
    </div>
  </div>
);

export default Dashboard;
