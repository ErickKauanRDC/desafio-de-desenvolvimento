const port = process.env.PORT||3001
const app = require ('./app')
const server = require('http').createServer(app)
server.listen(port)