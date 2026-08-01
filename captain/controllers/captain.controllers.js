const captainModel = require('../models/captain.model.js')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.register = async (req, res) => {
    try {

        const { email, name, password } = req.body
        const captain = await captainModel.findOne({ email })
        if (captain) {
            res.status(400).json({ message: "captain already exist" })
        }

        const hash = await bcrypt.hash(password, 10)
        const newcaptain = captainModel({
            email,
            name,
            password: hash
        })
        await newcaptain.save()

        const token = jwt.sign({ id: newcaptain._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        return res.status(201).json({
            message: "captain registered successfully",
            token,
            captain: newcaptain,
            password: hash
        });


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const captain = await captainModel
            .findOne({ email })
            .select('+password')
        if (!captain) {
            return res.status(400).json({ message: "captain NOT found" })
        }

        const isMatch = bcrypt.compare(password, captain.password)

        if (!isMatch) {
            return res.status(400).json({ messaage: "Invalid credentials" })
        }

        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET)
        delete captain._doc.password
        res.cookie("token", token)
        res.send({ token, captain })

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
        res.send({ message: "captain logout successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports.profile = async (req, res) => {
    try {
        res.send(req.captain)
    } catch (error) {
        res.status(500).json({ message: error.messaage })
    }
}

module.exports.toggleAvailability = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id)
        captain.isAvailable = !captain.isAvailable
        await captain.save()
        res.send(captain)
    } catch (error) {
        res.status(500).json({ message: error.messaage })
    }
}