const userModel = require('../models/user.model.js')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.register = async (req, res) => {
    try {

        const { email, name, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            res.status(400).json({ message: "user already exist" })
        }

        const hash = bcrypt.hash(password, 10)
        const newuser = userModel({ email, name, password })
        await newuser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.cookie('cookie', cookie)
        res.send({ message: "user registered successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}