const Koa = require('koa');
const Router = require('koa-router');
const userService = require('../services/user');
const authenticated = require('./middlewares/verifyToken');
const app = new Koa();

const router = new Router({
    prefix: '/api/users'
});

router
    .get('/', async (ctx, next) => {
        const res = await userService.getAllUsers();
        ctx.response.body = { users: res, numberOfUsers: res.length };
        ctx.response.status = 200;
        await next();
    })
    .delete('/', async (ctx, next) => {
        ctx.response.body = await userService.deleteAllUsers();
        ctx.response.status = 200;
        await next();
    })
    .get('/:user', authenticated, async (ctx, next) => {
        const res = await userService.getUser(ctx.params.user);
        if (res == null) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/:user', authenticated, async (ctx, next) => {
        const res = await userService.updateUser(ctx.params.user, ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 404;
        }
        else if (res == -2) {
            ctx.response.body = { msg: "This username is already in use" };
            ctx.response.status = 409;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .delete('/:user', authenticated, async (ctx, next) => {
        await userService.deleteUser(ctx.params.user);
        ctx.response.body = { msg: `${ctx.params.user} was deleted` };
        ctx.response.status = 200;
        await next();
    })
    .put('/:user/event', authenticated, async (ctx, next) => {
        const res = await userService.updateUserEvents(ctx.params.user, ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "Data is incomplete" };
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .get('/:user/friends', authenticated, async (ctx, next) => {
        const res = await userService.getUserFriends(ctx.params.user);
        if (res == null) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .get('/:user/statistics', authenticated, async (ctx, next) => {
        const res = await userService.getUserStatistics(ctx.params.user);
        if (res == null) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    });

app.use(router.routes());
module.exports = app;