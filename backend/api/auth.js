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
        const user = await authService.signup(ctx.request.body);
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
    .put('/login', async (ctx, next) => {
        const user = await authService.login(ctx.request.body);
        if (user == null) { 
            ctx.response.body = { msg: "User not found" }; 
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = user;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/logout', async (ctx, next) => {
        await authService.logout(ctx.request.body);
        // if (user == null) { 
        //     ctx.response.body = { msg: "User not found" }; 
        //     ctx.response.status = 400;
        // }
        // else {
        //     ctx.response.body = user;
        //     ctx.response.status = 200;
        // }
        ctx.body = "logout";
        await next();
    });

app.use(router.routes());
module.exports = app;