const router = require('koa-router')();
const Entity = require('../mongo/index');
const entity = new Entity();

router
    .post('/', async (ctx, next) => {
        const user = ctx.request.body
        const {userName} = user
        
        await entity
          .getData(userName)
          .then(res=>{
             ctx.response.body = res.sign
          })
    })
    .post('/update', async(ctx)=>{
        const user = ctx.request.body
        const {userName} = user
        const {newSign} = user
        await entity
        .updateSign(userName, newSign)
        .then(res=>{
           ctx.response.body = res
        })
        .catch(e=>console.log(e))
    })


module.exports = router;