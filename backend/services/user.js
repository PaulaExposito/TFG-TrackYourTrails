const User = require('../models/User');

async function getAllUsers() {
    const users = await User.find();
    return users;
}

async function createUser(userDTO) {
    const user = new User(userDTO);
    await user.save();
    return user;
}

async function deleteAllUsers() {
    await User.remove({});
    return "All users have been removed";
}

async function getUser(usernameDTO) {
    const user = await User.find({ 
        "username": usernameDTO
    });

    return user[0];
}

async function updateUser(usernameDTO, userDataDTO) {
    await User.updateOne({ "username": usernameDTO }, {$set: userDataDTO});
    return `${usernameDTO} entry change to: ${JSON.stringify(userDataDTO)}`;    
}

async function deleteUser(usernameDTO) {
    await User.remove({ "username": usernameDTO });
    return `${usernameDTO} deleted`;
}

async function getUserFriends(usernameDTO) {
    const userFriends = await User.find({ "username": usernameDTO }, { "friends": 1 });
    return userFriends;
}

async function getUserStatistics(usernameDTO) {
    const userStatistics = await User.find({ "username": usernameDTO }, { "statistics": 1 });
    return userStatistics;
}


module.exports = {
    getAllUsers, 
    createUser,
    deleteAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserFriends,
    getUserStatistics
}