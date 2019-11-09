const Router = require('koa-router')

const Menu = require('../dbs/models/menu')
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
