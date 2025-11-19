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
      // loginApi returns { token, user }
      login(res.token, res.user);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button>Login</button>
      </form>
      {err && <div style={{ color: "red" }}>{err}</div>}

      <button onClick={()=>navigate('/signup')}>Sign Up</button>
    </div>
  );
};

export default Login;
