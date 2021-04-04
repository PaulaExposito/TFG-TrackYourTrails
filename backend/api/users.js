const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

const router = new Router({
    prefix: '/api/users'
});

router
    .get('/', async (ctx, next) => {
        ctx.body = "tututututu";
        await next();
    })
    .post('/', async (ctx, next) => {
        await next();
    })
    .delete('/', async (ctx, next) => {
        await next();
    })
    .get('/:user', async (ctx, next) => {
        ctx.body = "tututututu";
        await next();
    })
    .put('/:user', async (ctx, next) => {
        await next();
    })
    .delete('/:user', async (ctx, next) => {
        await next();
    })
    .get('/:trail/friends', async (ctx, next) => {
        ctx.body = "tututututu";
        await next();
    })
    .get('/:trail/statistics', async (ctx, next) => {
        ctx.body = "tututututu";
        await next();
    });

app.use(router.routes());
module.exports = app;