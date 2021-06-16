const mongoose = require('mongoose');

const Trail = new mongoose.Schema({
    user: { required: true, type: String },
    title: String ,
    description: String,
    date: Date,
    distance: { type: Number, default: 0 },
    gradient: { type: Number, default: 0 },
    time: { type: Number, default: 0 },
    photos: Array,
    type: String,
    points: [{
        longitude: String,
        latitude: String
    }],
});

module.exports = mongoose.model('Trail', Trail);