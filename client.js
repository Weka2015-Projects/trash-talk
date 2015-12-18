'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://192.168.1.49:3000')
const R = require('ramda')
const inquirer = require('inquirer')
const chatCommands = require('./lib/chatCommands').chatCommands
const colors = require('colors')

var userName
var textColor = 'white'
const myLastMessages = []


socket.on('connect', () => {
  inquirer.prompt([introQuestion], (answers) => {
    socket.emit('newuser', answers)
    userName = answers.username
    if (userName) {
      startChatInput()
    }
  })
})


const startChatInput = () => {
  socket.on('message', (data) => {
    if(R.last(myLastMessages) === data) { return }
    console.log(data)
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
    socket.emit('message', colors[textColor](text))
  }
  })
}

const parseCommand = (command) => {
  command = R.replace('/', '', command)
  command = R.replace('\n', '', command).split(' ')
  findCommand(command)
}

const findCommand = (command) => {
  if (command[0] === 'help') {
    R.forEach(printDescription , R.keys(chatCommands))
  } else if (command[0] === 'changeColor') {
    textColor = chatCommands[command[0]].action(command[1])
  }
  else {
    console.log(chatCommands[command[0]].action(command[1]))
  }
}

const printDescription = (key) => {
  console.log(key.green, chatCommands[key].description)
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
