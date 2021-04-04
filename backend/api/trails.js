const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

let router = new Router({
    prefix: '/api/trails'
});

router
    .get('/', async (ctx, next) => {
        // incluir la opción de /trails?user="username" 
        ctx.body = "tututututu";
        await next();
    })
    .post('/', async (ctx, next) => {
        await next();
    })
    .delete('/', async (ctx, next) => {
        await next();
    })
    .get('/:trail', async (ctx, next) => {
        ctx.body = "tututututu";
        await next();
    })
    .put('/:trail', async (ctx, next) => {
        await next();
    })
    .delete('/:trail', async (ctx, next) => {
        await next();
    })
    .get('/:trail/points', async (ctx, next) => {
        ctx.body = "tututututu";
        await next();
    });

app.use(router.routes());
module.exports = app;