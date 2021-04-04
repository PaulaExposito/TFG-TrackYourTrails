const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

let router = new Router({
    prefix: '/api'
});


/**
 * A lo mejor todos deberían ser POST
 */

router
    .get('/login', async (ctx, next) => {
        ctx.body = "login";
        await next();
    })
    .get('/signup', async (ctx, next) => {
        ctx.body = "signup";
        await next();
    })
    .get('/logout', async (ctx, next) => {
        ctx.body = "logout";
        await next();
    });

app.use(router.routes());
module.exports = app;