'use strict'
const R = require('ramda')
const color = require('colors')

const server = require('http').createServer()
const io = require('socket.io')(server)


io.on('connection', (socket) => {
  const userAddress = R.replace(/\:\:[a-z]+\:/g, '', socket.handshake.address)
  
  console.log('connection from ' + userAddress)
  socket.on('message', (data) => {
    socket.emit('message', data)
  })

  socket.on('event', (data) => {
  })
  socket.on('disconnect', () => {
    console.log(userAddress + ' disconnected')
  })
})
server.listen(3000)

