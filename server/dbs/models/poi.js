const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Poi = new Schema({
  name: {
    type: String, // 景点名
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  areaCode: {
    type: String,
    required: true
  },
  tel: {
    type: String
  },
  area: {
    type: String// 商圈
  },
  addr: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  module: {
    type: String // 子分类
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Poi', Poi, 'poi')
