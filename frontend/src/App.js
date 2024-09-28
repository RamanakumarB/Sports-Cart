import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import './App.css';
import OrderHistory from './pages/OrderHistory';
import UpdateUser from './pages/UpdateUser';
import AdminDashboard from './pages/AdminDashboard';
import ManageProducts from './pages/ManageProducts'; // Create this component
import ManageOrders from './pages/ManageOrders'; // Create this component
import ManageUsers from './pages/ManageUsers'; // Create this component


const App = () => {
    const [cart, setCart] = useState([]); // Manage cart state
    const [user, setUser] = useState(null); // Manage authenticated user state

    // Function to add products to the cart
    const addToCart = (product) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);
        if (existingProductIndex >= 0) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1; // Increment quantity if already in cart
            setCart(updatedCart);
        } else {
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]); // Add new product to cart
        }
    };

    // Function to remove items from the cart
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    // Function to update the quantity of a product in the cart
    const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
    };

    // Function to handle user login
    const handleLogin = (userData) => {
        setUser(userData); // Set the authenticated user
    };

    // Function to handle user logout
    const handleLogout = () => {
        setUser(null); // Clear the authenticated user
    };

    return (
        <Router>
            <nav>
                
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li>
                        <Link to="/cart">
                            Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                        </Link>
                    </li>
                    <li><Link to="/checkout">Checkout</Link></li>
                    {user ? (
                        <>
                            <li>Hello, {user.username}</li>
                            <li><Link to="/order-history">Order History</Link></li>
                            <li><Link to="/update-user">Update User</Link></li>
                            <li><button onClick={handleLogout}>Logout</button></li>

                            {/* Admin Dashboard link only shown if the user is an admin */}
                            {user.isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>}
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListing addToCart={addToCart} />} />
                <Route
                    path="/cart"
                    element={
                        <ShoppingCart 
                            cart={cart} 
                            setCart={setCart} 
                            updateQuantity={updateQuantity} 
                            removeFromCart={removeFromCart} 
                        />
                    }
                />
                <Route path="/checkout" element={<Checkout cart={cart} />} />
                <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
                <Route path="/login" element={<Login handleLogin={handleLogin} />} /> {/* Login route */}
                <Route path="/register" element={<Register handleLogin={handleLogin} />} /> {/* Register route */}
                <Route path="/order-history" element={<OrderHistory user={user} />} /> {/* Order History route */}
                <Route path="/update-user" element={<UpdateUser user={user} />} /> {/* Update User route */}

                {/* Admin Dashboard and its child routes */}
                <Route path="/admin" element={<AdminDashboard />}>
                    <Route path="products" element={<ManageProducts />} />
                    <Route path="orders" element={<ManageOrders />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="/admin/orders" element={<ManageOrders />} />
<Route path="/admin/users" element={<ManageUsers />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;