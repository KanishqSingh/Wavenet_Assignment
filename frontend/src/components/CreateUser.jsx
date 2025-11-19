import React, { useState } from "react";
import { createUser } from '../api/users.js';
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const { user, token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const allowedRoles = {
    SUPERADMIN: ["ADMIN"],
    ADMIN: ["UNITMANAGER"],
    UNITMANAGER: ["USER"],
  };

  const availableRoles = allowedRoles[user?.role] || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setSuccess(null);

    try {
      const res = await createUser(form, token);

      if (res.user) {
        setSuccess("User created successfully!");
        setForm({ name: "", email: "", password: "", role: "" });
      } else {
        setErr(res.message || "Creation failed");
      }
    } catch (error) {
      setErr("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create User</h2>

        {/* {user && (
          <p className="text-center mb-4 text-gray-700">
            Logged in as: <b>{user.role}</b>
          </p>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            {availableRoles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </form>

        {err && (
          <div className="mt-3 text-red-600 text-center font-medium">
            {err}
          </div>
        )}

        {success && (
          <div className="mt-3 text-green-600 text-center font-medium">
            {success}
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
