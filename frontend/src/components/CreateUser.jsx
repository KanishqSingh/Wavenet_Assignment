import React, { useState } from "react";
import { createUser} from '../api/users.js'
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
  const [login, setLogin] = useState(false);
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
      console.log(res);

      if (res.user) {
        setSuccess("User created successfully!");
        setForm({ name: "", email: "", password: "", role: "" });
        setLogin(true)
      
      } else {
        setErr(res.message || "Creation failed");
      }
    } catch (error) {
      setErr("Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px" }}>
      <h2>Create User</h2>

      {user && <p>Logged in as: <b>{user.role}</b></p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          {availableRoles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <button type="submit">Create User</button>
      </form>

      {err && <div style={{ color: "red" }}>{err}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      <button onClick={() => {navigate('/')}}>login</button>



      

      
    </div>
  );
};

export default CreateUser;
