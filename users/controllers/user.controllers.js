const userModel = require('../models/user.model.js')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { subscribe } = require('../routes/user.routes.js')
const { subscribeToQueue } = require('../../ride/services/rabbit.js')


module.exports.register = async (req, res) => {
    try {

        const { email, name, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            res.status(400).json({ message: "user already exist" })
        }

        const hash = await bcrypt.hash(password, 10)
        const newuser = userModel({
            email,
            name,
            password: hash
        })
        await newuser.save()

        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: newuser,
            password: hash
        });


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel
            .findOne({ email })
            .select('+password')
        if (!user) {
            return res.status(400).json({ message: "user NOT found" })
        }

        const isMatch = bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ messaage: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user._doc.password
        res.cookie("token", token)
        res.send({ token, user })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports.logOut = async (req, res) => {
    try {
        const token = res.cookies.token;
        await blackListTokenModel.create({ token })
        res.clesrCookie('token');
        res.send('token');
        res.send({ message: "user logout successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports.profile = async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        res.status(500).json({ message: error.messaage })
    }
}

module.exports.acceptedRide = async (req, res) => {

    //long polling wait for ride accepted 
    rideEventEmitter.once('ride-accept', (data) => {
        res.send(data)
    })

    //setTimeOut for long polling eg:30seconds
    subscribeToQueue("accepted-ride", async (message) => {
        const data = JSON.parse(message)
        rideEventEmitter.emit('ride-accepted', data)
    })
}