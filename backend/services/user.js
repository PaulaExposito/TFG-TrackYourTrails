const User = require('../models/User');
const Event = require('../models/Event');

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

    const user = await User.findOne({ "username": usernameDTO });
    if (user == null) 
        return -1;  // usuario no existe --> se supone que ya está autenticado

    if (usernameDTO != userDataDTO.username) {
        const newUsernameExists = await User.findOne({ "username": userDataDTO.username });
        if (newUsernameExists != null)
            return -2;
    }

    // Si la contraseña es diferente a la actual (puede que se rellene un formulario y siempre
    // esté la contraseña como un campo a actualizar pero en realidad no se quiere actualizar)
    if (usernameDTO.password !== null) {
        const actualPass = user.password
        
        const newPass = await user.encryptPass(userDataDTO.password);
        const verify = await user.validatePass(userDataDTO.password);
        console.log(verify);

        if (user.password === userDataDTO.password)
            // userDataDTO.password = user.password
            delete userDataDTO.password;
        else
            userDataDTO.password =  await user.encryptPass(userDataDTO.password);
    }

    await User.updateOne({ "username": usernameDTO }, {$set: userDataDTO});

    return await User.findOne({ "username": userDataDTO.username });
    // return await User.findOne({ "username": usernameDTO });    
    // return await User.findOne({ "username": user.username });    // ?????    
    // return await User.findOne({ "_id": user._id });    // ?????    
}

async function updateUserEvents(usernameDTO, eventDTO) {
    const user = await User.findOne({ "username": usernameDTO });
    let events = user.events;
    let newEvents = [];

    console.log(`user events -> ${events}`)
    console.log(`user eventDTO -> ${eventDTO.toString()}`)
    console.log(`user eventDTO data: -> ${eventDTO.event_id} y ${eventDTO.title}`)
    const event = await Event.findOne({ "title": eventDTO.title });
    if (!user || !event)
        return -1;

    let index = -1;
    for (let i in events) {
        console.log(`if ${events[i].eventId} != ${eventDTO.event_id}`)
        if (events[i].eventId != eventDTO.event_id)
            newEvents.push(events[i]);
        else
            console.log(`if en index ${i}`)
    }

    console.log(`size events -> ${events.length} || new -> ${newEvents.length}`)

    
    if (events.length === newEvents.length) 
        newEvents.push({ "eventId": eventDTO.event_id, "title": eventDTO.title });
    
    console.log(`user events -> ${events}`)
    console.log(`user new events -> ${newEvents}`)
    return await User.updateOne({ "username": usernameDTO }, { $set: { "events": newEvents }} );
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
    updateUserEvents,
    deleteUser,
    getUserFriends,
    getUserStatistics
};