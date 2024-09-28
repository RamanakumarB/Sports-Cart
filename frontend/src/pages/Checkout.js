import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Import CartContext
import './Checkout.css'; // Import the CSS file from the same directory

const Checkout = () => {
    const { cart } = useContext(CartContext); // Access cart data from context

    // Calculate total cost
    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="checkout-container">
            <h2 className="checkout-title">Checkout Page</h2>

            <form className="checkout-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" required />
                </div>

                <div className="form-group">
                    <label htmlFor="payment">Payment Information:</label>
                    <input type="text" id="payment" required />
                </div>

                <h3 className="order-summary-title">Order Summary</h3>
                <ul className="order-summary-items">
                    {cart.map((item) => (
                        <li key={item.id}>
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>

                <div className="total-amount">
                    Total: ${calculateTotal()}
                </div>

                <button type="submit" className="checkout-btn">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;


