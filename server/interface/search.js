const Router = require('koa-router')

const Poi = require('../dbs/models/poi')
const axios = require('./utils/axios')

const router = new Router({ prefix: '/search' })

router.get('/top', async (ctx) => {
  try {
    const top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map((item) => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
  // const { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top`, {
  //   params: {
  //     input: ctx.query.input,
  //     city: ctx.query.city
  //   }
  // })
  // ctx.body = {
  //   top: status === 200
  //     ? top
  //     : []
  // }
})

module.exports = router
