const rideModel = require('../models/rideModels')
const { subscribeToQueue, publishToQueue } = require('../services/rabbit.js')


module.exports.createRide = async (req, res, next) => {
    const { pickUp, destination } = req.body

    const newRide = new rideModel({
        user: req.user._id,
        pickUp,
        destination
    })

    publishToQueue("new-ride", JSON.stringify(newRide))

    await newRide.save()
    publishToQueue("new-ride", JSON.stringify(newRide))
    res.send(newRide);
}


module.exports.acceptRide = async (req, res, next) => {
    const { rideId } = req.query
    const ride = await rideModel.findById(rideId)
    if (!ride) {
        return res.status(401).json({ message: "Ride not found" })
    }

    ride.status("ACCEPTED")
    await ride.save()
    publishToQueue("ride-accepted", JSON.stringify(ride))
    res.send(ride)
}

