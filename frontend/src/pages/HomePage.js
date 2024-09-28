import React, { useState } from 'react';
import './HomePage.css'; // Import custom styles for the home page

const HomePage = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <div className="homepage-container">


            {/* Hero Section for Promotions */}
            <section 
                className="hero-section" 
                style={{
                    backgroundImage: 'url(/images/hero-banner.jpeg)',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'white'
                }}
            >
                <div className="hero-content">
                    <h1>Welcome to Sports Cart!</h1>
                    <p>Check out our amazing deals on sports equipment!</p>
                    <a href="/products" className="shop-now-btn">Shop Now</a>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {/* Example product items */}
                    <div className="product-item">
                        <img src="/images/football.jpg" alt="football" />
                        <h3>FootBall</h3>
                        <p>$49.99</p>
                        <a href="/products/1" className="buy-now-btn">Buy Now</a>
                    </div>
                    <div className="product-item">
                        <img src="/images/basketball.jpeg" alt="basketball" />
                        <h3>BasketBall</h3>
                        <p>$69.99</p>
                        <a href="/products/2" className="buy-now-btn">Buy Now</a>
                    </div>
                    <div className="product-item">
                        <img src="/images/Tennis Racket.jpeg" alt="Tennis racket" />
                        <h3>Tennis Racket</h3>
                        <p>$89.99</p>
                        <a href="/products/3" className="buy-now-btn">Buy Now</a>
                    </div>
                </div>
            </section>

            {/* Links to Other Sections */}
            <section className="quick-links">
                <h2>Quick Links</h2>
                <div className="links-container">
                    <a href="/products" className="link-btn">Products</a>
                    <a href="/cart" className="link-btn">Cart</a>
                    <a href="/checkout" className="link-btn">Checkout</a>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
