import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products'; // Import product data
import './ProductListing.css'; // Add your CSS file for styling

const ProductListing = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter handler
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-listing-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </Link>
            <button className="buy-now-btn">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;


