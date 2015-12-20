const R = require('ramda')

const parseCommand = (command, socket) => {
  command = R.replace('/', '', command)
  command = R.replace('\n', '', command).split(' ')
  const commandArgs = []
  for (var i = 1; i < command.length; i++) {
    commandArgs.push(command[i])
  }
  command = [command[0], commandArgs]
  socket.emit('command', command)
}

const executeCommand = (command, socket) => {
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
    case "whisper":
      socket.emit('whisper', command[1])
      break
  }
}

module.exports = {
  parseCommand:parseCommand,
  executeCommand: executeCommand
}
