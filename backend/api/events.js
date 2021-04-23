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
        const events = await eventService.getAllEvents();
        ctx.response.body = { events: events, numberOfEvents: events.length };
        ctx.response.status = 200;
        await next();
    })
    .delete('/', async (ctx, next) => {
        ctx.response.body = await eventService.deleteAllEvents();
        ctx.response.status = 200;
        await next();
    })
    .post('/', async (ctx, next) => {
        const event = await eventService.createEvent(ctx.request.body)
        if (event == null) { 
            ctx.response.body = { msg: "Event already exist" }; 
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = event;
            ctx.response.status = 200;
        }
        await next();
    })
    .get('/:event', async (ctx, next) => {
        const event = await eventService.getEvent(ctx.params.event);
        if (event == null) {
            ctx.response.body = { msg: "Event Not Found" };
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = event;
            ctx.response.status = 200;
        }
        await next();
    })
    .put('/:event', async (ctx, next) => {
        const event = await eventService.updateEvent(ctx.params.event, ctx.request.body);
        if (event == null) {
            ctx.response.body = { msg: "Event Not Found" };
            ctx.response.status = 400;
        }
        else {
            ctx.response.body = event;
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