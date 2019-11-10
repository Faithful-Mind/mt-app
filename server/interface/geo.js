const Router = require('koa-router')

const Menu = require('../dbs/models/menu')
const Province = require('../dbs/models/province')
const axios = require('./utils/axios')

const router = new Router({ prefix: '/geo' })

router.get('/getPosition', async (ctx) => {
  const { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.status = 500
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/province', async (ctx) => {
  const province = await Province.find()
  ctx.body = {
    province: province.map((item) => {
      return {
        id: item.id,
        name: item.value
      }
    })
  }
  // const { status, data: { province } } = await axios.get('http://cp-tools.cn/geo/province')
  // ctx.body = {
  //   province: status === 200
  //     ? province
  //     : []
  // }
})

router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
  }
  // const { status, data: { menu } } = await axios.get('http://cp-tools.cn/geo/menu')
  // if (status === 200) {
  //   ctx.body = {
  //     menu
  //   }
  // } else {
  //   ctx.status = 500
  //   ctx.body = {
  //     menu: []
  //   }
  // }
})

module.exports = router
