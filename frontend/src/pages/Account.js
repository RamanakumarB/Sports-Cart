// frontend/src/pages/Account.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Account = () => {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user);
            setOrders(response.data.orders);
        };
        fetchUserData();
    }, []);

    return (
        <div>
            <h2>Welcome, {user.username}</h2>
            <h3>Your Orders:</h3>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>{order.productName} - {order.totalAmount}</li>
                ))}
            </ul>
        </div>
    );
};

export default Account;
