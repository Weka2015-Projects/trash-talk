'use strict'

process.env['DB_FILE'] = __dirname + '/db.json'

const expect = require('chai').expect
const storage = require('../lib/storage')
const overWriteDb = require('./helper').overwriteDb
const userFunctions = require('../lib/users')

describe('User creation test', () => {
  beforeEach(() => {overWriteDb('empty') })
  describe('loads new username to database', () => {
    it('loads database with one entry', () => {
      userFunctions.addUser({username: 'katie'})
      expect(storage.read().users.length).to.equal(1)
    })
          })
    describe('User already exists', () => {
      it('does not add second user', () => {
        userFunctions.addUser({username: 'katie'})
        userFunctions.addUser({username: 'katie'})
        expect(storage.read().users.length).to.equal(1)

    })
  })
})
