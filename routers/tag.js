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
             ctx.response.body = res.tags
          })
    })
    .post('/update', async(ctx)=>{
        const user = ctx.request.body
        const {userName} = user
        const {newTags} = user
        await entity
        .updateTags(userName, newTags)
        .then(res=>{
           ctx.response.body = res
        })
        .catch(e=>console.log(e))
    })


module.exports = router;