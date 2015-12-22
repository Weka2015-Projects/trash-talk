'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://192.168.1.35:3000')
const R = require('ramda')
const inquirer = require('inquirer')
const colors = require('colors')
const client = require('./lib/clientFunctions')

var currentUser
var textColor
var existingUsers = []
const myLastMessages = []



socket.on('connect', () => {
  onJoin()

  socket.on('registeruser', (data) => {
    currentUser = data
  })
  socket.on('channel', (data) => {
    existingUsers = data
  })
  socket.on('commandRes', (data) => {
    client.executeCommand(data, socket)
  })
  socket.on('disconnect', (data) => {
    console.log('You\'ve been Disconnected'.red)
  })

})


const onJoin = () => {
  inquirer.prompt([introQuestion], (answers) => {
    if (R.filter((user) => user.username === answers.username, existingUsers).length > 0) {
      console.log("Name taken, pick a new one".red)
      return onJoin()
    }
    else {
      socket.emit('newuser', answers)
      startChatInput()
    }
  })
}


const startChatInput = () => {
  socket.on('message', (data) => {
    if(R.last(myLastMessages) !== data) {
      console.log(data)
    }
  })
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (text) => {
    if (text.split('')[0] === '/') {
      client.parseCommand(text, socket, currentUser)
    } else {
      text = R.replace(/\n/, '', text)
      text = `${currentUser.username}: ${text}`
      myLastMessages.push(text)
      if(textColor) {
        socket.emit('message', colors[textColor](text))
      } else {
        socket.emit('message', text)
      }
    }
  })
}


const introQuestion = {
  validate: function(input) {

    // Declare function as asynchronous, and save the done callback
    var done = this.async()

    // Do async stuff
    setTimeout(function() {
      if (typeof input !== "string") {
        // Pass the return value in the done callback
        done("Try again scrub");
        return;
      }
      // Pass the return value in the done callback
      done(true);
    }, 10)
  },
  message: 'Whats your user name? \n',
  name: 'username'
}
