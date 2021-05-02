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
        newUser.passWord = shaPassWord
        await entity
          .query("register", userName)
          .then(res => {
              if(res.length === 0){
                newUser.tags = ["eat", "clothes", "traffic", "room"]
                newUser.list = []
                newUser.sign = 0
                entity.save(newUser)
                ctx.response.body = { mgs: "register success", start: 200 };
              }else{
                ctx.response.body = { mgs: "userName has already exist"};
              }
            })    
    })


module.exports = router;