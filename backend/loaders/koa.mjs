import router from 'koa-router'
import mount from 'koa-mount'

import something from '../api/users.js'

export default async (app) => {

    app.use(mount(something));

    // console.log(router.routes())

    app.use(router);

    app.use(async ctx => {
        ctx.body = "hello tfg";
    });

    return app;
}