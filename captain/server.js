const http = require('http')
const app = require('./app.js')

const server = http.createServer(app)


app.listen(3002,()=>{
    console.log("Captain server is listening on 3002")
})