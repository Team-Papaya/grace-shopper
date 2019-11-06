/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')

//the above is for authentication

describe('User Model', () => {
  let user
  before(() => db.sync({force: true}))
  beforeEach(() => {
    user = {
      email: 'papa@ya.com',
      password: '0000',
      role: 'Inactive',
      username: 'Papa',
      firstname: 'papa'
    }
  })
  afterEach(() => db.sync({force: true}))

  it('has fields email, role, username, firstname', async () => {
    user.notARealAttribute = 'does not compute'
    const savedUser = await User.create(user)
    expect(savedUser.email).to.equal('papa@ya.com')
    expect(savedUser.role).to.equal('Inactive')
    expect(savedUser.username).to.equal('Papa')
    expect(savedUser.firstname).to.equal('papa')
    expect(savedUser.notARealAttribute).to.equal(undefined)
  })

  it('email cannot be null or an empty string', async () => {
    try {
      user.email = ''
      const userEmail = await User.create(user)
      if (userEmail === '') {
        throw Error('Validation should have failed with empty email')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
    try {
      user.email = null
      const userEmail = await User.create(user)
      if (userEmail === null) {
        throw Error('Validation should have failed with null email')
      }
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
  })

  it('role can only be Normal, Admin, or Invalid (defaults to Normal)', async () => {
    user.role = 'papaya'
    try {
      const badUser = await User.create(user)
      if (badUser)
        throw Error('Validation should have failed with invalid role')
    } catch (err) {
      expect(err.message).to.not.have.string('Validation should have failed')
    }
    delete user.role
    const defaultUser = await User.create(user)
    expect(defaultUser.role).to.equal('Normal')
  })
})
