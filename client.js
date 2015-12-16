'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')
socket.on('connect', () => {
  socket.on('message', (data) => {
    console.log('we got a message: ', data)
  })
})