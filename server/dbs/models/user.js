const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

/**
 * @typedef {Object} UserRaw
 * @property {string} username
 * @property {string} password
 * @property {string} email
 */

/**
 * @typedef {import('mongoose').Document & UserRaw} User
 */

/** @type {import('mongoose').Model<UserRaw>} */
module.exports = mongoose.model('User', UserSchema)
