const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Menu = new Schema({
  menu: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Menu', Menu, 'menu')
