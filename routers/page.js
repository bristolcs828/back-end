const router = require('koa-router')();

const Entity = require('../mongo/index');
const entity = new Entity();

router
    .get('/404', async ctx => ctx.body = '404 page!')
    .get('/helloworld', async (ctx, next) => {
        const start = new Date().getTime()
        await next();
        const ms = new Date().getTime() - start;
        ctx.response.type = 'application/json';
        ctx.body = await entity.query();
    })
    .get('/get', async ctx => {
        // Koa2 中 get方法 通过 ctx.query 来获取 xxx?name=123 中name值
        entity.query(ctx.query.id);
        ctx.body = { mgs: "提交成功", start: 200 };
    })
    .post('/post', async (ctx, next) => {
        // Koa2 中 post方法 通过 ctx.request.body 来获取前端传来的参数值
        const res = ctx.request.body
        console.log(ctx.request.body)
        entity.save(res)
        ctx.response.body = { mgs: "提交成功", start: 200 };
    })
    .get('/remove', async ctx => {
        entity.remove(ctx.query);
        ctx.body = { mgs: "删除成功", start: 200 };
    })
    .get('/update', async ctx => {
        var conditions = { name: 'Vexth---get' };  
        var updates = { $set: {name: "tiny"} };
        entity.update(conditions, updates);
        ctx.body = { mgs: "修改成功", start: 200 };
    });

module.exports = router;