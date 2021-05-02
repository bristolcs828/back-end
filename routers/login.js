const router = require('koa-router')();
const sha256 = require('js-sha256');
const Entity = require('../mongo/index');
const entity = new Entity();

router
    .post('/', async (ctx, next) => {
        const newUser = ctx.request.body
        const {userName} = newUser
        const {passWord} = newUser
        const shaPassWord = sha256(passWord)
        await entity
          .query("login", userName, shaPassWord)
          .then(res => {
              if(res.length === 0){
                ctx.response.body = { "success" : "false" };
              }else{
                ctx.response.body = {
                  "success" : "true",
                  "userName" : userName};
              }
            })    
    })


module.exports = router;