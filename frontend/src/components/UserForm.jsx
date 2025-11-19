import React from "react";
const UserList = ({ users, onEdit, onDelete }) => (
    <div>
        <h3>Users</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((u) => (
                    <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                            <button onClick={() => onEdit(u)}>Edit</button>
                            <button onClick={() => onDelete(u._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
export default UserList;