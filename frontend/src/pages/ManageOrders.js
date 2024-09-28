// src/pages/ManageOrders.js
import React, { useEffect, useState } from 'react';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/admin/orders');
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(`Error: ${err.message}`); // Enhanced error message
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchOrders();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                const response = await fetch(`/api/admin/orders/${orderId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Failed to delete order');
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId)); // Update state
            } catch (err) {
                setError(`Error: ${err.message}`);
            }
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        if (window.confirm("Are you sure you want to update the order status?")) {
            try {
                const response = await fetch(`/api/admin/orders/${orderId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus }),
                });
                if (!response.ok) throw new Error('Failed to update order status');
                setOrders(prevOrders => prevOrders.map(order => 
                    order._id === orderId ? { ...order, status: newStatus } : order
                )); // Update state
            } catch (err) {
                setError(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div>
            <h2>Manage Orders</h2>
            {loading && <p>Loading orders...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user?.name || 'N/A'}</td> {/* Handle optional chaining */}
                            <td>${order.totalAmount.toFixed(2)}</td> {/* Ensure proper formatting */}
                            <td>
                                <select 
                                    value={order.status} 
                                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageOrders;
