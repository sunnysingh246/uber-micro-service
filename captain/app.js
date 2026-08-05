const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const connect = require('./db/db.js')
connect()

const captainRoutes = require('../captain/routes/captain.routes.js')
const expressProxy = require('express-http-proxy')
const cookiePharser = require('cookie-parser')

const rabbitMq = require('./service/rabbit.js')
rabbitMq.connect()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePharser())

module.exports = app;