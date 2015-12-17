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

describe('deletes user object', () => {
  beforeEach(() => {overWriteDb('empty') })
  context('deletes if user object exsists', () => {
    it('does not add second object', () => {
      userFunctions.deleteUser('bean')
      expect(storage.read().users.length).to.equal(0)
    })
  })
  context('does not delete if it user object exsists', () => {
    it('stays the same', () => {
      userFunctions.deleteUser('bobo')
      expect(storage.read().users.length).to.equal(1)
    })
  })
})

describe('get user by username', () => {
  beforeEach(() => {overWriteDb('empty') })
  context('find user if username exsists', () => {
    xit('finds user', () => {
      userFunctions.getUserByUserName('bobo')
      expect(storage.read().users.length).to.equal(1)
    })
  })
  context('return undefined if user does not exsist', () => {
    xit('returns undefined if user does not exsist', () => {
        userfunctions.getUserByUserName('wakaflocka')
        expect(storage.read().users.length).to.equal(0)
    })
  })
})

describe('patch object if exsists', () => {
  beforeEach(() => {overWriteDb('empty') })
  context('change object if a valid change', () => {
    xit('object changed if object exsists', () => {
      userFunctions.changeUserName('bobo')
      userFunctions.changeUserName('babe')
      expect(storage.read().users.length).to.equal(1)
      })
    })
    context('does not change if object does not exsist', () => {
      xit('returns undefined if object does not exsist', () => {
        userFunctions.changeUserName('bambie')
        expect(storage.read().users.length).to.equal(0)
    })
  })
})
