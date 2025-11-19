import React from "react";
import { Link } from "react-router-dom";


const Dashboard = () => (
    <div>
        <h2>Dashboard</h2>
        <Link to="/invoices">Invoices</Link> |
        <Link to="/users">Users</Link>
    </div>
);
export default Dashboard;