const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Get cart by user ID
router.get('/', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// Add item to cart
router.post('/add', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        let cart = await Cart.findOne({ userId: req.user.id });

        if (cart) {
            const itemIndex = cart.products.findIndex(item => item.productId == productId);
            if (itemIndex > -1) {
                cart.products[itemIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        } else {
            cart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add item to cart' });
    }
});

// Update cart item quantity
router.put('/update', verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (cart) {
            const itemIndex = cart.products.findIndex(item => item.productId == productId);

            if (itemIndex > -1) {
                cart.products[itemIndex].quantity = quantity;
                await cart.save();
                return res.status(200).json(cart);
            } else {
                return res.status(404).json({ error: 'Product not in cart' });
            }
        } else {
            return res.status(404).json({ error: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update cart item' });
    }
});

// Remove item from cart
router.delete('/remove/:productId', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (cart) {
            cart.products = cart.products.filter(item => item.productId != req.params.productId);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ error: 'Cart not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove item from cart' });
    }
});

module.exports = router;

