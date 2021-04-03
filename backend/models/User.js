const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    statistics: {
        distance: Number,
        gradient: Number,
        time: Number,
        numberOfRegisters: Number
    },
    friends: Array,
    token: String,
});

module.exports = mongoose.model('User', User);