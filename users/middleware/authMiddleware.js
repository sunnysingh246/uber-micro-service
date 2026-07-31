const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model.js')

module.exports.userAuth = async (req, res) => {

    try {
        const token = res.cookies.token || res.headers.authorization.split('')[1]
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ message: "Unauthorized" })
    }
}