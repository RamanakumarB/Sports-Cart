const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Get all products
router.get('/products', verifyToken, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Add a new product
router.post('/products', verifyToken, async (req, res) => {
    const { name, price, description, image } = req.body;
    const product = new Product({ name, price, description, image });

    try {
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to add product' });
    }
});

// Update a product
router.put('/products/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image } = req.body;

    try {
        await Product.findByIdAndUpdate(id, { name, price, description, image }, { new: true });
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update product' });
    }
});

// Delete a product
router.delete('/products/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete product' });
    }
});

// Get all orders
router.get('/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find().populate('user');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Delete a user
router.delete('/users/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;
