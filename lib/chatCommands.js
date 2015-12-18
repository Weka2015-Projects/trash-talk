const users = require('./users')

module.exports = {
  chatCommands : {
    getAllUsers: () => {
      return users.getUserByUserName('aaron')
    }
  }
}
