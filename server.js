'use strict'
const R = require('ramda')
const colors = require('colors')
const emoji = require('emoji-and-emoticons')
const users = require('./lib/users')
const server = require('http').createServer()
const io = require('socket.io')(server)
const commands = require('./lib/chatCommands')


const chatLog = []
const sockets = []
let currentUsers = []

io.on('connection', (socket) => {
  sockets.push(socket)
  socket.on('newuser', (data) => {
    users.addUser(data)
    socket.currentUser = data
    currentUsers.push(socket.currentUser)
    console.log(socket.currentUser.username + ' connected'.green)
    broadcast('message', socket.currentUser.username + ' connected'.green)
  })

  socket.on('message', (data) => {
    chatLog.push(data)
    broadcast('message', data)
  })
  socket.on('disconnect', () => {
    currentUsers = R.remove(currentUsers.indexOf(socket.currentUser), 1, currentUsers)
    broadcast('message', socket.currentUser +' disconnected'.red)
    console.log(socket.currentUser + ' disconnected'.red)
  })

  socket.on('command', (data) => {
    socket.emit('commandRes', (commands.find(data)))
  })

  socket.on('whisper', (data) => {
    if(whisper('message', data, socket.currentUser)){
      socket.emit('message', 'Invalid User')
    }
  })
})

const broadcast = (event, data) => {
  sockets.forEach((socket) => {
    socket.emit(event, data)
  })
}

const whisper = (event, data, user) => {
  sockets.forEach((socket) => {
    if(socket.currentUser && socket.currentUser.username === data[0]){
      socket.emit(event,
         ('Whisper from ' + user.username +
          ': ' +
          data.slice(1, data.length).join(' ')).blue)
      return true
    }
  })
  return false
}

server.listen(3000)
console.log('server listening on port 3000')
