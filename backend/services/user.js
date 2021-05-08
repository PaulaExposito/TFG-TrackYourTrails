const User = require('../models/User');

async function getAllUsers() {
    const users = await User.find();
    return users;
}


/**
 * ESTA FUNCIÓN HAY QUE ELIMINARLA
 */
async function createUser(userDTO) {
    const userExists = await User.findOne({ "username": userDTO.username });
    if (userExists != null) 
        return null;
    
    const user = new User(userDTO);
    await user.save();
    return user;
}
/*
**********************************************/

async function deleteAllUsers() {
    await User.remove({});
    return "All users have been removed";
}

async function getUser(usernameDTO) {
    const user = await User.findOne({ 
        "username": usernameDTO
    });
    return user;
}

async function updateUser(usernameDTO, userDataDTO) {
    const user = await User.updateOne({ "username": usernameDTO }, {$set: userDataDTO});
    return await User.findOne({ "username": usernameDTO });    
    // return await User.findOne({ "username": user.username });    // ?????    
    // return await User.findOne({ "_id": user._id });    // ?????    
}

async function deleteUser(usernameDTO) {
    await User.remove({ "username": usernameDTO });
}

async function getUserFriends(usernameDTO) {
    if (await User.findOne({ "username": usernameDTO }) == null )
        return null;
    return await User.find({ "username": usernameDTO }, { "friends": 1 });
}

async function getUserStatistics(usernameDTO) {
    if (await User.findOne({ "username": usernameDTO }) == null )
        return null;
    return await User.find({ "username": usernameDTO }, { "statistics": 1 });
}


module.exports = {
    getAllUsers, 
    //createUser,
    deleteAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserFriends,
    getUserStatistics
};