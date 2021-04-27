const Koa = require('koa');
const cors = require('koa-cors');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const router = require('./routers/index');

// 处理跨域问题
app.use(cors());

// 处理原生的node还是koa都无法直接解析request的body
app.use(koaBody()).use(bodyParser());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})
