const Koa = require('koa');
const Router = require('koa-router');
const trailService = require('../services/trail');
const authenticated = require('./middlewares/verifyToken');
const app = new Koa();

let router = new Router({
    prefix: '/api/trails'
});

router
    .get('/', async (ctx, next) => {
        // incluir la opción de /trails?user="username" 
        const res = await trailService.getAllTrails();
        ctx.response.body = { trails: res, numberOfTrails: res.length };
        ctx.response.status = 200;
        await next();
    })
    .post('/', authenticated, async (ctx, next) => {
        const res = await trailService.createTrail(ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "Data is incomplete" };
            ctx.response.status = 409;
        }
        else if (res == -2) {
            ctx.response.body = { msg: "User not found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 201;
        }
        await next();
    })
    .delete('/', async (ctx, next) => {
        ctx.response.body = await trailService.deleteAllTrails();
        ctx.response.status = 200;
        await next();
    })
    .get('/:trail', async (ctx, next) => {
        const res = await trailService.getTrail(ctx.params.trail);
        if (res == null) {
            ctx.response.body = { msg: "Trail not found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/:trail', authenticated, async (ctx, next) => {
        const res = await trailService.updateTrailData(ctx.params.trail, ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "Trail not found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;   
        }
        await next();
    })
    .delete('/:trail', async (ctx, next) => {
        await trailService.deleteTrail(ctx.params.trail);
        ctx.response.body = { msg: `${ctx.params.trail} was deleted` };
        ctx.response.status = 200;
        await next();
    })
    .get('/user/:user', async (ctx, next) => {
        const res = await trailService.getUserTrails(ctx.params.user);
        if (res == -1) {
            ctx.response.body = { msg: "User not found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .get('/:trail/points', async (ctx, next) => {
        const res = await trailService.getTrailPoints(ctx.params.trail);
        if (res == -1) {
            ctx.response.body = { msg: "Trail not found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/:trail/point', async (ctx, next) => {
        const res = await trailService.addPointToTrail(ctx.params.trail, ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "Trail not found" };
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