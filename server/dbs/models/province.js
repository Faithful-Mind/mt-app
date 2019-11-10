const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Province = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('Province', Province)
