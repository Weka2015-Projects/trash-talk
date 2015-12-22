const users = require('./users')
const R = require('ramda')

const chatCommands =  {
  allusers: {
    description: 'get all users in database (no parameter)',
    role: 'user',
    action: () => {
      return users.getAllUsers()
    }
  },
  whois: {
    description: 'get a user by name (username)',
    role: 'user',
    action: (user) => {
      return users.getUserByUserName(user[0])
    }
  },
  changeColor: {
    description: 'choose a chat text color (color)',
    role: 'user',
    action: (color) => {
      return color[0]
    }
  },
  clearColor: {
    description: 'resets your text color (no parameters)',
    role: 'user',
    action: () => {
      return
    }
  },
  whisper: {
    description: 'whisper a user in the channel (username, message)',
    role: 'user',
    action: (username) => {
      return username
    }
  },
  silence: {
    description: 'Prevents user from sending messages to chat',
    role: 'admin',
    action: (username, user) => {
      console.log(username, user)
      return username
    }
  }
}

const findCommand = (command) => {

  const user = command[2] ? user = users.getUserByUserName(command[2].username) : 'no user'
  const keyList = R.keys(chatCommands)
  if (command[0] === 'help') {
    return printDescription(keyList, user)
  }  if (command[0] === 'silence') {
    return [command[0], chatCommands[command[0]].action(command[1], user)]
  }
   else if (keyList.indexOf(command[0]) === -1)  {
    return "Invalid"
  } else if (!command[1]){
    return [command[0], chatCommands[command[0]].action()]
  } else {
    return [command[0], chatCommands[command[0]].action(command[1])]
  }
}

const printDescription = (keys, user) => {
  const helpList = []
  for (var key in keys) {
     if (chatCommands[keys[key]].role !== 'admin') {
      helpList.push([keys[key], chatCommands[keys[key]].description])
    } else if (chatCommands[keys[key]].role === 'admin' && user.role === 'admin') {
      helpList.push([keys[key], chatCommands[keys[key]].description])
  }
}
  return ['help', helpList]
}

module.exports = {
  chat : chatCommands,
  find : findCommand,
  description : printDescription
}
