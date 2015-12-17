'use strict'
const R = require('ramda')
const colors = require('colors')
const emoji = require('emoji-and-emoticons')
const users = require('./lib/users')
const server = require('http').createServer()
const io = require('socket.io')(server)


const chatLog = []
const sockets = []

io.on('connection', (socket) => {
  sockets.push(socket)
  const userAddress = R.replace(/\:\:[a-z]+\:/g, '', socket.handshake.address)

  var currentUser

  socket.on('newuser', (data) => {
    users.addUser(data)
    currentUser = data.username
    broadcast('message', currentUser +' connected'.green)
  })
  socket.on('message', (data) => {
    broadcast('message', data)
  })
  socket.on('disconnect', () => {
    broadcast('message', currentUser +' disconnected'.red)
    console.log(currentUser + ' disconnected'.red)
  })
})

const broadcast = (event, data) => {
  sockets.forEach((socket) => {
    socket.emit(event, data)
  })
}


server.listen(3000)
console.log('server listening on port 3000')
