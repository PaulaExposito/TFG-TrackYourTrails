const mongoose = require('mongoose');
const User = require('./User.js');

const Trail = new mongoose.Schema({
    title: { required: true, type: String },
    user: { required: true, type: User },
    description: String,
    date: Date,
    distance: Number,
    gradient: Number,
    time: Number,
    photos: Array,
    type: String,
    point: Array,
});

module.exports = mongoose.model('Trail', Trail);