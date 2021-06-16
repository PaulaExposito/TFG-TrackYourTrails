const mongoose = require('mongoose');

const Event = new mongoose.Schema({
    title: { required: true, type: String },
    date: Date,
    equipment: String,
    users: Array,
    photos: Array,
    owner: String,
    active: Boolean
});

module.exports = mongoose.model('Event', Event);