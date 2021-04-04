const Koa = require('koa');
const Router = require('koa-router');
const userService = require('../services/user');
const app = new Koa();

const router = new Router({
    prefix: '/api/users'
});

router
    .get('/', async (ctx, next) => {
        ctx.response.body = await userService.getAllUsers();
        await next();
    })
    .post('/', async (ctx, next) => {
        ctx.response.body = await userService.createUser(JSON.parse(ctx.request.body));
        await next();
    })
    .delete('/', async (ctx, next) => {
        ctx.response.body = await userService.deleteAllUsers();
        await next();
    })
    .get('/:user', async (ctx, next) => {
        ctx.response.body = await userService.getUser(ctx.params.user);
        await next();
    })
    .put('/:user', async (ctx, next) => {
        ctx.response.body = await userService.updateUser(ctx.params.user, 
            JSON.parse(ctx.request.body));
        await next();
    })
    .delete('/:user', async (ctx, next) => {
        ctx.response.body = await userService.deleteUser(ctx.params.user);
        await next();
    })
    .get('/:user/friends', async (ctx, next) => {
        ctx.response.body = await userService.getUserFriends(ctx.params.user);
        await next();
    })
    .get('/:user/statistics', async (ctx, next) => {
        ctx.response.body = await userService.getUserStatistics(ctx.params.user);
        await next();
    });

app.use(router.routes());
module.exports = app;