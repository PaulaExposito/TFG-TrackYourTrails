const Koa = require('koa');
const Router = require('koa-router');
const eventService = require('../services/event');
const app = new Koa();

const router = new Router({
    prefix: '/api/events'
});

router
    .get('/', async (ctx, next) => {
        // incluir la opción de /events?active="boolean" y /events?user=username 
        const res = await eventService.getAllEvents();
        ctx.response.body = { events: res, numberOfEvents: res.length };
        ctx.response.status = 200;
        await next();
    })
    .delete('/', async (ctx, next) => {
        ctx.response.body = await eventService.deleteAllEvents();
        ctx.response.status = 200;
        await next();
    })
    .post('/', async (ctx, next) => {
        const res = await eventService.createEvent(ctx.request.body);
        if (res == null) { 
            ctx.response.body = { msg: "Event already exist" }; 
            ctx.response.status = 409;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 201;
        }
        await next();
    })
    .get('/:event', async (ctx, next) => {
        const res = await eventService.getEvent(ctx.params.event);
        if (res == null) {
            ctx.response.body = { msg: "Event Not Found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/:event', async (ctx, next) => {
        const res = await eventService.updateEvent(ctx.params.event, ctx.request.body);
        if (res == null) {
            ctx.response.body = { msg: "Event Not Found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    // Actualizar los usuarios de un evento
    .put('/:event/user', async (ctx, next) => {
        const res = await eventService.modifyEventUser(ctx.params.event, ctx.request.body);
        if (res == -1) {
            ctx.response.body = { msg: "Event Not Found" };
            ctx.response.status = 404;
        }
        else {
            ctx.response.body = res;
            ctx.response.status = 200;
        }
        await next();
    })
    .delete('/:event', async (ctx, next) => {
        await eventService.deleteEvent(ctx.params.event);
        ctx.response.body = { msg: `${ctx.params.event} was deleted` };
        ctx.response.status = 200;
        await next();
    });

app.use(router.routes());
module.exports = app;