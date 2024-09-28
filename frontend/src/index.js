import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new 'createRoot' API
import './styles/global.css'; // Your global CSS imports
import App from './App';
import { CartProvider } from './context/CartContext'; // Import CartProvider for cart management

// Get the root element where the app will be rendered
const rootElement = document.getElementById('root');

// Create the root using React 18's createRoot API
const root = ReactDOM.createRoot(rootElement);

// Render the app using the new root
root.render(
    <React.StrictMode>
        <CartProvider> {/* Wrapping the App with CartProvider */}
            <App />
        </CartProvider>
    </React.StrictMode>
);
