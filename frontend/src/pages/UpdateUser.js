// src/pages/UpdateUser.js

import React, { useEffect, useState } from 'react';

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('/api/auth/user'); // Update this endpoint to your actual user details endpoint
                if (!response.ok) throw new Error('Failed to fetch user details');
                const data = await response.json();
                setName(data.name);
                setEmail(data.email);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });
            if (!response.ok) throw new Error('Failed to update user details');
            setSuccess('User details updated successfully.');
            setError(''); // Clear any previous errors
        } catch (err) {
            setError(err.message);
            setSuccess(''); // Clear any previous success messages
        }
    };

    return (
        <div>
            <h2>Update User Details</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateUser;
