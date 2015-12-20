'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://192.168.1.35:3000')
const R = require('ramda')
const inquirer = require('inquirer')
const colors = require('colors')
const client = require('./lib/clientFunctions')

var userName
var textColor
const myLastMessages = []


socket.on('connect', () => {
  inquirer.prompt([introQuestion], (answers) => {
    socket.emit('newuser', answers)
    userName = answers.username
    if (userName) {
      startChatInput()
    }
  })
  socket.on('commandRes', (data) => {
    client.executeCommand(data, socket)
  })
})


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
      client.parseCommand(text, socket)
    } else {
      text = R.replace(/\n/, '', text)
      text = `${userName}: ${text}`
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
        done("Provide a string dude!");
        return;
      }
      // Pass the return value in the done callback
      done(true);
    }, 10)
  },
  message: 'Whats your user name? \n',
  name: 'username'
}
