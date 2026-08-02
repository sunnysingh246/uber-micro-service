const mongoose = require('mongoose')

function connect() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Ride service connected to database")
    }).catch(error => {
        console.log(error)
    })
}

module.exports = connect