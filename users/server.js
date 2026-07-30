const http = require('http')
const app = require('./app.js')

const server = http.createServer(app)



app.listen(3001,()=>{
    console.log("user service is running on 3001")
})