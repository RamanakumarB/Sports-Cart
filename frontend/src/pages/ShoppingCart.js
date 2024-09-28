import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './ShoppingCart.css'; // Import the CSS file for styling

const ShoppingCart = ({ cart, setCart }) => {
    // Function to remove an item from the cart
    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    // Function to adjust the quantity of an item in the cart
    const adjustQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative quantity
        const updatedCart = [...cart];
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
    };

    // Calculate total cost of items in the cart
    const totalCost = cart.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);

    return (
        <div className="shopping-cart-container">
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((product, index) => (
                        <div key={index} className="cart-item">
                            <h3>{product.name}</h3>
                            <img src={product.imageUrl} alt={product.name} className="cart-item-image" />
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <div className="quantity-adjustment">
                                <button onClick={() => adjustQuantity(index, (product.quantity || 1) - 1)}>-</button>
                                <span>{product.quantity || 1}</span>
                                <button onClick={() => adjustQuantity(index, (product.quantity || 1) + 1)}>+</button>
                            </div>
                            <button onClick={() => removeFromCart(index)} className="remove-item-btn">Remove</button>
                        </div>
                    ))}
                    <h3>Total Cost: ${totalCost.toFixed(2)}</h3>
                    {/* Use Link for navigation to the Checkout page */}
                    <Link to="/checkout" className="checkout-btn">Checkout</Link>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;



