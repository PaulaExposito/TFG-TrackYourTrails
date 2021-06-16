const Event = require('../models/Event');
const User = require('../models/User');


// TODO: Incluir los filtros de "active" y "user"
async function getAllEvents() {
    const events = await Event.find();
    return events;
}

async function deleteAllEvents() {
    await Event.remove({});
    return "All events have been removed";
}

async function createEvent(eventDTO) {
    const eventExists = await Event.findOne({ "title": eventDTO.title });
    if (eventExists != null) 
        return null;
    
    const event = new Event(eventDTO);
    await event.save();
    return event;
}

async function getEvent(eventIdDTO) {
    const event = await Event.findOne({ 
        "_id": eventIdDTO
    });
    return event;
}

async function updateEvent(eventIdDTO, eventDataDTO) {
    await Event.updateOne({ "_id": eventIdDTO }, {$set: eventDataDTO});
    return await Event.findOne({ "_id": eventIdDTO });
}

async function modifyEventUser(eventIdDTO, eventDataDTO) {
    const event = await Event.findOne({ "_id": eventIdDTO });
    if (event == null || eventDataDTO.username == null)
        return -1;

    const user = await User.findOne({ "username": eventDataDTO.username });
    if (user == null)
        return -2;

    if (!event.users.includes(eventDataDTO.username))
        event.users.push(eventDataDTO.username);
    else {
        event.users = event.users.filter((value) => {
            return (value != eventDataDTO.username);
        });
    }

    await Event.updateOne( { "_id": eventIdDTO }, {$set: {"users": event.users}} );
    return event.users;
}

async function deleteEvent(eventIdDTO) {
    await Event.remove({ "_id": eventIdDTO });
}


module.exports = {
    getAllEvents,
    deleteAllEvents,
    createEvent,
    getEvent,
    updateEvent,
    modifyEventUser,
    deleteEvent
};