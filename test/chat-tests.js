'use strict'

process.env['DB_FILE'] = __dirname + '/db.json'

const expect = require('chai').expect
const storage = require('../lib/storage')
const overWriteDb = require('./helper').overwriteDb
const userFunctions = require('../lib/users')
const chatCommands = require('../lib/chatCommands').chatCommands

describe('Get all user test', () => {
  beforeEach(() => {overWriteDb('bobo') })
  describe('get all user store in the database', () => {
    it('get all user', () => {
      expect(chatCommands.getAllUsers.action().length).to.equal(3)
    })
  })
})
