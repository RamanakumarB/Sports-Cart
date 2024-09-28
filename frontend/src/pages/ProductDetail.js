import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products'; // Ensure the path is correct
import './ProductDetail.css'; // Import the CSS file for styling

const ProductDetail = ({ addToCart }) => {
    const { id } = useParams(); // Get the product ID from the URL
    const product = products.find((prod) => prod.id === parseInt(id)); // Find the product by ID

    if (!product) {
        return <h2>Product not found</h2>; // Handle case when product is not found
    }

    return (
        <div className="product-detail-container">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2> {/* Added class for centering */}
            <p>{product.description}</p>
            <p>{product.detailedDescription}</p> {/* Added detailed description */}
            <p className="product-price">${product.price}</p>
            
            <div className="product-actions">
                {/* Add to Cart Button */}
                <button 
                    className="add-to-cart-btn" 
                    onClick={() => addToCart(product)} // Call addToCart on click
                >
                    Add to Cart
                </button>
                
                {/* View Cart Button */}
                <Link to="/cart">
                    <button className="view-cart-btn">
                        View Cart
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;


