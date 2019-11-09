const Router = require('koa-router')

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

module.exports = router
