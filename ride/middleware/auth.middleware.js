const jwt = require('jsonwebtoken')
const axios = require('axios')
const rideModels = require('../models/rideModels')
const { publishToQueue } = require('../services/rabbit')


module.exports.authUser = async (req, res) => {
    try {

        const token = res.cookies.token || res.headers.authorization.split('')[1]
        if (!token) {
            return res.status(401).j = json({ message: "Unauthorizes" })
        }

        const decoded = jwt.verify(token, process.env.BASE_URL)

        const response = await axios.get(`${BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer${token}`
            }
        })

        const user = response.data
        if (!user) {
            return res.status(401).json({ message: "Unauthorize" })
        }

        res.user = user;

        next()

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.captainAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const response = await axios.get(`${process.env.BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const captain = response.data;

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain;

        next();

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.acceptRide = async (req, res, next) => {
    const { rideId } = req.query
    const ride = rideModels.findById(rideId);
    if (!ride) {
        return res.status(401).json({ message: "Ride not found" })

        ride.status("ACCEPTED")
        await ride.save()
        publishToQueue("accept-ride", JSON.parse.stringfy(ride))
        res.send(ride)
    }
}