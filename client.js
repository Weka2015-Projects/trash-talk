'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://10.6.0.226:3000')
const R = require('ramda')
const inquirer = require('inquirer')
const colors = require('colors')

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
    executeCommand(data)
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
      parseCommand(text)
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

const parseCommand = (command) => {
  command = R.replace('/', '', command)
  command = R.replace('\n', '', command).split(' ')
  socket.emit('command', command)
}

const executeCommand = (command) => {
  switch(command[0]) {
    case "help":
      R.forEach((content) => {
        console.log(content[0].green, content[1])
      },command[1])
      break
    case "getAllUsers":
      R.forEach((content) => {
        console.log(content)
      },command[1])
      break
    case "getUser":
      console.log(command[1])
      break
    case "changeColor":
      textColor = command[1]
      break
    case "clearColor":
      textColor = command[1]
      break
  }
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
