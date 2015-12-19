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
    },
    clearColor: {
      description: 'resets your text color parameter (resets)',
      action: (reset) => {
        return
      }
    }
}

const findCommand = (command) => {
  const keyList = R.keys(chatCommands)
  if (command[0] === 'help') {
    const helpList = []
    for (var key in keyList) {
      helpList.push([keyList[key], chatCommands[keyList[key]].description])
    }
    return helpList
  } else if (keyList.indexOf(command[0]) === -1)  {
    return "Invalid"
  } else {
    return [command[0], chatCommands[command[0]].action(command[1])]
  }
}

const printDescription = (key) => {
}

module.exports = {
  chat : chatCommands,
  find : findCommand,
  description : printDescription
}
