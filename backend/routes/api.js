const express = require('express');
const router = express.Router();

// Example route
router.get('/products', (req, res) => {
    res.json([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
});

module.exports = router;
