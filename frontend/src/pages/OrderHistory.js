// src/pages/OrderHistory.js

import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await fetch('/api/auth/order-history', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Include the token for authorization
                });
                if (!response.ok) throw new Error('Failed to fetch order history');
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div>
            <h2>Order History</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <li key={order._id}>
                            {/* Assuming order has fields like productName, quantity, etc. */}
                            <p>Product: {order.productName}</p>
                            <p>Quantity: {order.quantity}</p>
                            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default OrderHistory;

