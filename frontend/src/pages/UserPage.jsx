// src/pages/UserPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUsers } from "../api/users";
import UserList from "../components/UserList";
// import CreateUser from '../components/CreateUser'


const UserPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  const loadData = async () => {
    try {
      const res = await getUsers(token, 1);
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div>
      <h2>User Management</h2>
      {/* <CreateUser/> */}
      <UserList users={users} />
    </div>
  );
};
export default UserPage;
