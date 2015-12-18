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
    userToDelete = findUser[0]
  } else {
    return
  }
  data.users = R.remove(data.users.indexOf(userToDelete), 1, data.users)
  storage.write(data)
}

const getUserByUserName = (userName) => {
  const data = storage.read()
  let findUser = R.filter((user) => user.username === userName, data.users)
  return findUser[0]
}

const changeUserName = (oldUserName, newUserName) => {
  const data = storage.read()
  const userIndex = data.users.indexOf(findUser[0])
  data.users[userIndex].username = newUserName
  storage.write(data)
}

const getAllUser = (all) => {
  const data = storage.read()
  return data.users[0]
}

module.exports = {
  addUser: addUser,
  deleteUser: deleteUser,
  getUserByUserName: getUserByUserName,
  changeUserName: changeUserName

}
