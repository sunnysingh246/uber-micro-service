const jwt = require('jsonwebtoken')
const captainModel = require('../models/captain.model.js')
const blackListTokenModel = require('../models/blackListToken.model.js')

module.exports.captainAuth = async (req, res) => {

    try {
        const token = res.cookies.token || res.headers.authorization.split('')[1]
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const isBlackListToken = await blackListTokenModel.find({ token })

        if (isBlackListToken.length) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.captain = captain
        next()
    } catch (error) {
        res.status(500).json({ message: "Unauthorized" })
    }
}