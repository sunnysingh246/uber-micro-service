const mongoose = require('mongoose')

function connect() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("captain service connected with MongoDB")
    }).catch(error => {
        console.log("Failed to connect with database",error)
    })
}

module.exports=connect