'use strict'

process.env['DB_FILE'] = __dirname + '/db.json'

const expect = require('chai').expect
const command = require('../lib/chatCommands')
const storage = require('../lib/storage')
const overWriteDb = require('./helper').overwriteDb

describe('Chat commands', () => {
  beforeEach(() => {overWriteDb('bobo') })
  describe('Help / Command List', () => {
    it('loads list of commands with 3 entries', () => {
      expect(command.find(['help']).length).to.equal(3)
    })
  })
  describe('Changle Color', () => {
    it('Returns the color that the user selected', () => {
      expect(command.find(['changeColor', 'red'])[1]).to.equal('red')
    })
  })
  describe('Gets all', () => {
    it('Returns all users', () => {
      expect(command.find(['getAllUsers'])[1].length).to.equal(3)
    })
  })
  describe('Gets user', () => {
    it('Returns correct user', () => {
      expect(command.find(['getUser', 'bobo'])[1].username).to.equal('bobo')
    })
  })
})
