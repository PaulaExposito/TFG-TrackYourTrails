import router from 'koa-router';
import mount from 'koa-mount';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser'
import users from '../api/users.js';
import events from '../api/events.js';
import trails from '../api/trails.js';
import auth from '../api/auth.js';

export default async (app) => {
    app.use(logger());
    app.use(bodyParser({ enableTypes: ['json', 'text'] }));

    app.use(mount(users));
    app.use(mount(events));
    app.use(mount(trails));
    app.use(mount(auth));
    
    app.use(router);

    return app;
}