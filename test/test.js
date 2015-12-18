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
  beforeEach(() => {overWriteDb('delete-katie') })
  context('deletes if user object exists', () => {
    it('deletes katie', () => {
      userFunctions.deleteUser('katie')
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
  beforeEach(() => {overWriteDb('bobo') })
  context('find user if username exsists', () => {
    it('finds user', () => {
      userFunctions.getUserByUserName('aaron')
      expect(storage.read().users[1].username).to.equal('aaron')
    })
  })
  context('return undefined if user does not exsist', () => {
    it('returns undefined if user does not exsist', () => {
        expect(userFunctions.getUserByUserName('wakaflocka')).to.equal(undefined)
    })
  })
})

describe('patch object', () => {
  beforeEach(() => {overWriteDb('empty') })
  context('change object if username exists', () => {
    xit('object changed if object exists', () => {
      userFunctions.changeUserName('bobo', 'babe')
      expect(storage.read().users[0].username).to.equal('bobo')
      })
    })
    context('does not change if object does not exist', () => {
      xit('returns undefined if object does not exist', () => {
        userFunctions.changeUserName('bambie')
        expect(storage.read().users.length).to.equal(0)
    })
  })
})

describe('', () => {
  beforeEach(() => {overWriteDb('empty') })
  context('', () => {
    xit('', () => {
      userFunctions
    })
  })
  context('', () => {
    xit('', () => {
      userFunctions
    })
  })
})
