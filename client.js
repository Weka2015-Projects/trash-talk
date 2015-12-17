'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')
const R = require('ramda')
const inquirer = require('inquirer')

var userName
const myLastMessages = []

socket.on('connect', () => {

  // inquirer.prompt([introQuestion], (answers) => {
  //   socket.emit('newuser', answers)
  //   userName = answers.username
  // })

  process.stdin.resume()

  socket.on('message', (data) => {
    if(R.last(myLastMessages) === data) { return }
    console.log(data)
  })
  process.stdin.setEncoding('utf8')

  process.stdin.on('data', (text) => {
    text = R.replace(/\n/, '', text)
    text = `${userName}: ${text}`
    myLastMessages.push(text)
    socket.emit('message', text)
  })
})

const introQuestion = {
 validate: function(input) {

    // Declare function as asynchronous, and save the done callback
    var done = this.async();

    // Do async stuff
    setTimeout(function() {
      if (typeof input !== "string") {
        // Pass the return value in the done callback
        done("You need to provide a number");
        return;
      }
      // Pass the return value in the done callback
      done(true);
    }, 3000)
  },
  message: 'Whats your user name \n',
  name: 'username'
}
