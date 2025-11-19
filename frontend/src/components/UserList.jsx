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

  const handleSaveEdit = async () => {
    try {
      await updateUserRole(editingUser._id, newRole, token);
      loadUsers();
      setEditingUser(null);
    } catch (err) {
      console.error("Edit failed:", err.message);
    }
  };

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
    <div className="mt-10 px-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Users</h3>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">UserID</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border">{u.role}</td>
                <td className="px-4 py-2 border">{u.userId}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => {
                      setEditingUser(u);
                      setNewRole(u.role);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="ml-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleDelete(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80">
            <h4 className="text-xl font-bold mb-3">Edit User Role</h4>

            <p className="text-gray-600 mb-2">
              Name: <span className="font-semibold">{editingUser.name}</span>
            </p>

            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            >
              <option value="SUPERADMIN">SUPERADMIN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="UNITMANAGER">UNITMANAGER</option>
              <option value="USER">USER</option>
            </select>

            <div className="flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>

              <button
                onClick={() => setEditingUser(null)}
                className="ml-3 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
