// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import { getUsers, updateUserRole, deleteUser } from "../api/users";
import { useAuth } from "../contexts/AuthContext";

const UserList = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  // Load Users
  const loadUsers = async () => {
    try {
      const res = await getUsers(token, 1);
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users:", err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // EDIT — Save
  const handleSaveEdit = async () => {
    try {
      await updateUserRole(editingUser._id, newRole, token);
      loadUsers();
      setEditingUser(null);
    } catch (err) {
      console.error("Edit failed:", err.message);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteUser(id, token);
      loadUsers();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Users</h3>

      <table border="1" cellPadding="10" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>UserID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.userId}</td>
              <td>
                <button onClick={() => { setEditingUser(u); setNewRole(u.role); }}>
                  Edit
                </button>

                <button style={{ marginLeft: 10 }} onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editingUser && (
        <div style={{
          padding: 20,
          marginTop: 20,
          border: "2px solid black",
          width: 300
        }}>
          <h4>Edit User Role</h4>

          <p>Name: {editingUser.name}</p>

          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="SUPERADMIN">SUPERADMIN</option>
            <option value="ADMIN">ADMIN</option>
            <option value="UNITMANAGER">UNITMANAGER</option>
            <option value="USER">USER</option>
          </select>

          <br /><br />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setEditingUser(null)} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
