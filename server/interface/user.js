const Router = require('koa-router')
const Redis = require('koa-redis')
const nodeMailer = require('nodemailer')

const config = require('../config')
const User = require('../dbs/models/user')
const { genCode, genExpire } = require('./utils/passcode')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')

const router = new Router({
  prefix: '/user'
})

/** @type {import('ioredis').Redis} */
const Store = new Redis().client

router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) { // 如果验证码正确
      if ((Date.now() - Number(saveExpire)) > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  const user = await User.find({ username })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  const nuser = await User.create({ username, password, email })
  if (nuser) {
    const res = await axios.post('/user/signin', { username, password })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user
      }
      return ctx.login(user)
    } else {
      ctx.body = {
        code: -1,
        msg: info
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  const username = ctx.request.body.username
  const saveExipre = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExipre && ((Date.now() - Number(saveExipre)) < 0)) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内一次'
    }
    return false
  }
  const transporter = nodeMailer.createTransport({
    host: config.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  })
  const ko = {
    code: genCode(),
    expire: genExpire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  const mailOptions = {
    from: `"认证邮件" <${config.smtp.user}>`,
    to: ko.email,
    subject: '《慕课网高仿美团全栈实战》注册码',
    html: `您在《慕课网高仿美团全栈实战》课程中注册，您的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

module.exports = router
