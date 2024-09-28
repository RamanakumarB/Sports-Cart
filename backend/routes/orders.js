const express = require('express');
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// Get order history for the authenticated user
router.get('/', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
});

// Place a new order
router.post('/place', verifyToken, async (req, res) => {
    const { products, totalAmount } = req.body;

    try {
        const order = new Order({ user: req.user.id, products, totalAmount });
        await order.save();
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// Update order status (Admin only)
router.put('/update/:orderId', verifyToken, async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.orderId);

        if (order) {
            order.status = status;
            await order.save();
            res.status(200).json({ message: 'Order status updated successfully' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

module.exports = router;
