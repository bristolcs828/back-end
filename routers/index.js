
const router = require('koa-router')();


const register = require('./register')
const login = require("./login")
const tag = require('./tag')
const list = require('./list')
const sign = require('./sign')


router.use('/register', register.routes(), register.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/tag', tag.routes(), tag.allowedMethods());
router.use('/list', list.routes(), list.allowedMethods());
router.use('/sign', sign.routes(), sign.allowedMethods());
module.exports = router;