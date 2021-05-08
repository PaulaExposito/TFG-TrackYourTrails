const mongoose = require('mongoose');
const User = require('./User.js');

const Event = new mongoose.Schema({
    title: { required: true, type: String },
    date: Date,
    equipment: String,
    users: Array,
    photos: Array,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    active: Boolean
});

module.exports = mongoose.model('Event', Event);