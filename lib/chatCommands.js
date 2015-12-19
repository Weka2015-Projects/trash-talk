const users = require('./users')
const R = require('ramda')

const chatCommands =  {
    getAllUsers: {
      description: 'get all users in database (no parameter)',
      action: () => {
        return users.getAllUsers()
      }
    },
    getUser: {
      description: 'get a user by name (username)',
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
      description: 'resets your text color (no parameters)',
      action: () => {
        return
      }
    }
}

const findCommand = (command) => {
  const keyList = R.keys(chatCommands)
  if (command[0] === 'help') {
    return printDescription(keyList)
  } else if (keyList.indexOf(command[0]) === -1)  {
    return "Invalid"
  } else if (!command[1]){
    return [command[0], chatCommands[command[0]].action()]
  } else {
    return [command[0], chatCommands[command[0]].action(command[1])]

  }
}

const printDescription = (keys) => {
  const helpList = []
  for (var key in keys) {
    helpList.push([keys[key], chatCommands[keys[key]].description])
  }
  return ['help', helpList]
}

module.exports = {
  chat : chatCommands,
  find : findCommand,
  description : printDescription
}
