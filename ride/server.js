const express = require('express')
const app = require('./app')

const server = HTMLOutputElement.createServer(app)

server.listen(3003, () => {
    console.log("Ride service is running on port 3003")
})