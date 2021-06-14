const User = require('../models/User');
const Event = require('../models/Event');

async function getAllUsers() {
    const users = await User.find();
    return users;
}

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
    const user = await User.findOne({ "username": usernameDTO });
    if (user == null) 
        return -1;

    if (usernameDTO != userDataDTO.username) {
        const newUsernameExists = await User.findOne({ "username": userDataDTO.username });
        if (newUsernameExists != null)
            return -2;
    }

    // Si la contraseña es diferente a la actual (puede que se rellene un formulario y siempre
    // esté la contraseña como un campo a actualizar pero en realidad no se quiere actualizar)
    if (usernameDTO.password != null) {
        if (user.password == userDataDTO.password)
            delete userDataDTO.password;
        else
            userDataDTO.password =  await user.encryptPass(userDataDTO.password);
    }

    await User.updateOne({ "username": usernameDTO }, {$set: userDataDTO});

    return await User.findOne({ "_id": user._id });
}

async function deleteUser(usernameDTO) {
    await User.remove({ "username": usernameDTO });
}

async function updateUserEvents(usernameDTO, eventDTO) {
    const user = await User.findOne({ "username": usernameDTO });
    let events = user.events;
    let newEvents = [];

    const event = await Event.findOne({ "title": eventDTO.title });
    if (!user || !event)
        return -1;

    for (let i in events) {
        if (events[i].eventId != eventDTO.event_id)
            newEvents.push(events[i]);
    }
    
    if (events.length === newEvents.length) 
        newEvents.push({ "eventId": eventDTO.event_id, "title": eventDTO.title });
    
    return await User.updateOne({ "username": usernameDTO }, { $set: { "events": newEvents }} );
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
    deleteAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updateUserEvents,
    getUserFriends,
    getUserStatistics
};