'use strict'

process.env['DB_FILE'] = __dirname + './db.json'

const expect = require('chai')
const storage = require('../lib/storage')
const overWriteDb = require('./helper')

describe('User creation test', () => {
  beforeEach(() => {overWriteDb('empty') })
  describe('loads new username to database', () => {
    it('loads database with one entry', () => {
   //   expect(storage.read().user.length).to.equal(1)
    })
    describe('User already exists'. () => {
      it('does not add second user', () => {
        //expect(storage.read().user.length).to.equal(1)
      })
    })
  })
})