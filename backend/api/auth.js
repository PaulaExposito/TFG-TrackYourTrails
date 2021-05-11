const Koa = require('koa');
const Router = require('koa-router');
const authService = require('../services/auth');
const app = new Koa();

let router = new Router({
    prefix: '/api'
});


/**
 * A lo mejor todos deberían ser POST
 * 
 * TODO: Falta el middleware para comprobar el token
 */

router
    .post('/signup', async (ctx, next) => {
        const res = await authService.signup(ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "Must pass user and password" };
            ctx.response.status = 409;
        }
        else if (res == -2) { 
            ctx.response.body = { msg: "User already exist" }; 
            ctx.response.status = 409;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 201;
        }
        await next();
    })
    .put('/login', async (ctx, next) => {
        const res = await authService.login(ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "Must pass user and password" };
            ctx.response.status = 409;
        }
        else if (res == -2) { 
            ctx.response.body = { msg: "User not found" }; 
            ctx.response.status = 404;
        }
        else if (res == -3) {
            ctx.response.body = { msg: "Wrong password" }; 
            ctx.response.status = 401;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/logout', async (ctx, next) => {
        const res = await authService.logout(ctx.request.body);
        if (res == -1) { 
            ctx.response.body = { msg: "Not user logged found" }; 
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