const Router = require('koa-router')

const Category = require('../dbs/models/category')
const axios = require('./utils/axios')

const router = new Router({ prefix: '/category' })

router.get('/crumbs', async (ctx) => {
  const result = await Category.findOne({ city: ctx.query.city.replace('市', '') || '北京' })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    const { status, data: { areas, types } } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
      params: {
        city: ctx.query.city.replace('市', '') || '北京'
      }
    })
    ctx.body = {
      areas: status === 200 ? areas : [],
      types: status === 200 ? types : []
    }
  }
})

module.exports = router
