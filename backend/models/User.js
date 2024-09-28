const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // You can add more fields if needed
});

// Prevent overwrite of the model
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

