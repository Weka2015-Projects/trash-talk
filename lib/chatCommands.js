const users = require('./users')

module.exports = {
  chatCommands : {
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
}
