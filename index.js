const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
 ctx.body = 'Index!'
});

router.get('/koa', (ctx, next) => {
 ctx.body = 'Koa!'
});

app.use(router.routes())

const server = app.listen(3000)
module.exports = server
