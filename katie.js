'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')
const R = require('ramda')

process.stdin.on('data', function(data) {
	// console.log('data', data.toString())
	socket.emit('message', data.toString())
})