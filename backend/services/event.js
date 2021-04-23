const Event = require('../models/Event');


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
    const event = await Event.updateOne({ "_id": eventIdDTO }, {$set: eventDataDTO});
    return await Event.findOne({ "_id": eventIdDTO }); /// Comprobar bien
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
    deleteEvent
}