const mongoose = require('mongoose');
const User = require('./User.js');

const Trail = new mongoose.Schema({
    title: String,
    user: User,
    description: User,
    date: Date,
    distance: Number,
    gradient: Number,
    time: Number,
    photos: Array,
    type: String,
    point: Array,
});

module.exports = mongoose.model('Trail', Trail);