const users = require('./users')
const R = require('ramda')

const chatCommands =  {
    getAllUsers: {
      description: 'takes no parameters',
      action: () => {
      return users.getAllUsers()
      }
    },
    getUser: {
      description: 'takes one parameter (username)',
      action: (user) => {
      return users.getUserByUserName(user)
      }
    },
    changeColor: {
      description: 'choose a chat text color (color)',
      action: (color) => {
        return color
      }
    }
}

const findCommand = (command) => {
  if (command[0] === 'help') {
    const helpList = []
    const keyList = R.keys(chatCommands)
    for (var key in keyList) {
      helpList.push([keyList[key], chatCommands[keyList[key]].description])
    }
    return helpList
  } else if (R.keys(chatCommands).indexOf(command[0]) !== -1)  {
    return [command[0], chatCommands[command[0]].action(command[1])]
  } else {
    return "Invalid Command"
  }
}

const printDescription = (key) => {
}

module.exports = {
  chat : chatCommands,
  find : findCommand,
  description : printDescription
}
