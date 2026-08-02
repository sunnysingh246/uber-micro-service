const jwt = require('jsonwebtoken')
const axios = require('axios')


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

      const user=response.data
        if (!user) {
            return res.status(401).json({ message: "Unauthorize" })
        }

        res.user = user;

        next()
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}