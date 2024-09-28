// src/pages/AdminDashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="products">Manage Products</Link></li>
                    <li><Link to="orders">Manage Orders</Link></li>
                    <li><Link to="users">Manage Users</Link></li>
                    <li><Link to="/admin">Admin Dashboard</Link></li>
                </ul>
            </nav>
            <Outlet /> {/* Render nested routes here */}
        </div>
    );
};

export default AdminDashboard;
