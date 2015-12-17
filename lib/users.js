'use strict'
const storage = require('./storage')
const R = require('ramda')

const addUser = (userObject) => {
  const data = storage.read()
  // let match = R.filter((user) => user.username === userObject.username, data)

  data.users.push(userObject)
  storage.write(data)
}

module.exports = {
  addUser: addUser
}
