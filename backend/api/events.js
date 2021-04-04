const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

const router = new Router({
    prefix: '/api/events'
});

router
    .get('/', async (ctx, next) => {
        // incluir la opción de /events?active="boolean" y /events?user=username 
        ctx.body = "tututututu";
        await next();
    })
    .post('/', async (ctx, next) => {
        await next();
    })
    .delete('/', async (ctx, next) => {
        await next();
    })
    .get('/:event', async (ctx, next) => {
        ctx.body = "tututututu";
        await next();
    })
    .put('/:event', async (ctx, next) => {
        await next();
    })
    .delete('/:event', async (ctx, next) => {
        await next();
    });

app.use(router.routes());
module.exports = app;