const mongoose = require('mongoose');
const User = require('./User.js');

const Event = new mongoose.Schema({
    title: String,
    date: Date,
    equipment: String,
    users: Array,
    photos: Array,
    owner: User,
    active: Boolean
});

module.exports = mongoose.model('Event', Event);