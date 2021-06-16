const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
    username: { required: true, type: String },
    firstName: String,
    lastName: String,
    email: String,
    password: { required: true, type: String },
    phone: String,
    statistics: {
        distance: { type: Number, default: 0 },
        gradient: { type: Number, default: 0 },
        time: { type: Number, default: 0 },
        numberOfRegisters: { type: Number, default: 0 }
    },
    events: [{
        eventId: mongoose.Types.ObjectId,
        title: String
    }],
    friends: Array,
    token: String,
});

User.methods.encryptPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};
  

User.methods.validatePass = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);