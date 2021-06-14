const Trail = require('../models/Trail');
const User = require('../models/User');

async function getAllTrails() {
  return await Trail.find();
}

async function createTrail(trailDTO) {
  if (trailDTO.user == null)
    return -1;

  const user = await User.findOne({ "username": trailDTO.user });
  if (user == null) 
    return -2;
  
  const trail = new Trail(trailDTO);
  trail.date = Date.now();
  await trail.save();
  return trail;
}

async function deleteAllTrails() {
  await Trail.remove({});
  return "All trails have been removed"; 
}

async function getTrail(idDTO) {
  const trail = await Trail.findOne({ "_id": idDTO });
  return trail;
}

async function updateTrailData(idDTO, trailDTO) {
  const trail = await Trail.findOne({ "_id": idDTO });
  if (trail == null)
    return -1;

  await Trail.updateOne({ "_id": idDTO }, { $set: trailDTO });
  return await Trail.findById(idDTO);
}

async function deleteTrail(idDTO) {
  await Trail.remove({ "_id": idDTO });
}

async function getUserTrails(userDTO) {
  const user = await User.findOne({ "username": userDTO });
  if (user == null) 
    return -1;

  const trails = await Trail.find({ "user": userDTO });
  return trails;
}

async function getTrailPoints(idDTO) {
  const trail = await Trail.findOne({ "_id": idDTO });
  if (trail == null)
    return -1;

  return trail.points;
}

async function addPointToTrail(idDTO, trailDTO) {
  const trail = await Trail.findOne({ "_id": idDTO });
  if (trail == null)
    return -1;

  trail.points.push(trailDTO);
  await Trail.updateOne({ "_id": idDTO }, { $set: { "points": trail.points }});
  return trail;
}


module.exports = {
  getAllTrails,
  createTrail,
  deleteAllTrails,
  getTrail,
  updateTrailData,
  deleteTrail,
  getUserTrails,
  getTrailPoints,
  addPointToTrail,
}
