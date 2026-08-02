const rideModel = require('../models/ride.model');
const { subscribeToQueue, publishToQueue } = require('../service/rabbit')


module.exports.createRide = async (req, res, next) => {
    const { pickUp, destination } = req.body

    const newRide = new rideModel({
        user: req.user._id,
        pickUp,
        destination
    })

    await newRide.save()
}

