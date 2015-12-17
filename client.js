'use strict'
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')
const R = require('ramda')
const inquirer = require('inquirer')


const myLastMessages = []

socket.on('connect', () => {
  inquirer.prompt([introQuestion], (answers) => {
    socket.emit('message', answers)
    myLastMessages.push(answers)
  })
  socket.on('message', (data) => {
    if (data !== R.last(myLastMessages)){
    console.log('we got a message: ', data)
  }})
})

const introQuestion = {
  validate: function(input) {
    
// Declare function as asynchronous, and save the done callback 
  done = this.async()
    
  // Do async stuff 
  setTimeout(function() {
    if (typeof input !== "string") {
    // Pass the return value in the done callback 
      done("You need to provide a number")
      return;
    }
      // Pass the return value in the done callback 
    done(true)
    }, 3000)
  },
  message: 'Whats your user name',
  name: 'username'
}
