const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const userRouter = require('./routes/user.routes.js')

const cookiePaser = require('cookie-parser')
const connect = require('./db/db.js')
connect()


const rabbitMq = require('./services/rabbit.js')
rabbitMq.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookiePaser())


app.use('/', userRouter);

module.exports = app;