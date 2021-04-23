const Koa = require('koa');
const Router = require('koa-router');
const userService = require('../services/user');
const app = new Koa();

const router = new Router({
    prefix: '/api/users'
});

router
    .get('/', async (ctx, next) => {
        const users = await userService.getAllUsers();
        ctx.response.body = { users: users, numberOfUsers: users.length };
        ctx.response.status = 200;
        await next();
    })
    /**
     * ESTE ENDPOINT HAY QUE ELIMINARLO
     */
    .post('/', async (ctx, next) => {
        const user = await userService.createUser(ctx.request.body)
        if (user == null) { 
            ctx.response.body = { msg: "User already exist" }; 
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = user;
            ctx.response.status = 200;
        }
        await next();
    })
    /********************************************************
     * 
     * 
     * 
     ********************************************************/
    .delete('/', async (ctx, next) => {
        ctx.response.body = await userService.deleteAllUsers();
        ctx.response.status = 200;
        await next();
    })
    .get('/:user', async (ctx, next) => {
        const user = await userService.getUser(ctx.params.user);
        if (user == null) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = user;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/:user', async (ctx, next) => {
        const user = await userService.updateUser(ctx.params.user, ctx.request.body);
        if (user == null) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = user;
            ctx.response.status = 200;
        }
        await next();
    })
    .delete('/:user', async (ctx, next) => {
        await userService.deleteUser(ctx.params.user);
        ctx.response.body = { msg: `${ctx.params.user} was deleted` };
        ctx.response.status = 200;
        await next();
    })
    .get('/:user/friends', async (ctx, next) => {
        const user = await userService.getUserFriends(ctx.params.user);
        if (user == null) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = user;
            ctx.response.status = 200;
        }
        await next();
    })
    .get('/:user/statistics', async (ctx, next) => {
        const user = await userService.getUserStatistics(ctx.params.user);
        if (user == null) {
            ctx.response.body = { msg: "User Not Found" };
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = user;
            ctx.response.status = 200;
        }
        await next();
    });

app.use(router.routes());
module.exports = app;