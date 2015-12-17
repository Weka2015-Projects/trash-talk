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

//  create a delete function which delete the user

const deleteUser = (userName) => {
  const data = storage.read()
  var userToDelete
  let findUser = R.filter((user) => user.username === userName, data.users)
  if (findUser.length) {
    user = findUser[0]
  } else {
    return
  }
  const remove = R.remove(data.users.indexOf(userToDelete), 1, data.users)
  storage.write(data)
}

const getUserByUserName = (userName) => {
  const data = storage.read()
  let findUser = R.filter((user) => user.username === userName, data.users)
  return findUser
}

module.exports = {
  addUser: addUser,
  deleteUser: deleteUser
}

