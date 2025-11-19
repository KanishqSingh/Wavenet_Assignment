// src/pages/Login.jsx
import React, { useState } from "react";
import { loginApi } from "../api/auth.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await loginApi({ ...form, timezone });

      login(res.token, res.user);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {err && (
          <div className="mt-3 text-red-600 text-center font-medium">
            {err}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline"
          >
            Don’t have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
