'use strict'
const R = require('ramda')
const color = require('colors')
const emoji = require('emoji-and-emoticons')

const server = require('http').createServer()
const io = require('socket.io')(server)
  

const chatLog = []
const sockets = []

io.on('connection', (socket) => {
  sockets.push(socket)
  const userAddress = R.replace(/\:\:[a-z]+\:/g, '', socket.handshake.address)
  console.log('connection from '.green + userAddress.yellow)
  
  socket.on('message', (data) => {
    broadcast('message', data);
  })
  socket.on('disconnect', () => {
    console.log(userAddress.yellow + ' disconnected'.red)
  })
})

const broadcast = (event, data) => {
  sockets.forEach((socket) => {
    socket.emit(event, data)
  })
}

server.listen(3000)

