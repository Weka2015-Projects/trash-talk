'use strict'
const storage = require('./storage')
const R = require('ramda')

const addUser = (userObject) => {
  const data = storage.read()
  let match = R.filter((user) => user.username === userObject.username, data.users)
  if (match.length) {
    return match[0]
  }
  data.users.push(userObject)
  storage.write(data)
}

module.exports = {
  addUser: addUser
}
