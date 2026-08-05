const mongoose = require('mongoose')


const rideSchema = new mongoose.Schema(
    {
        captain: {
            type: mongoose.Schema.Types.ObjectId,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        pickUp: {
            type: String,
            required: true,
        },

        destination: {
            type: String,
            emum: ['REQUESTED', 'ACCEPTED', 'STARTED', 'COMPLETED'],
            default: 'REQUESTED'
        },


    }, { timestamps: true })

module.exports = mongoose.model('ride', rideSchema)
