import koaLoader from './koa.mjs';
import mongooseLoader from './mongoose.mjs';

export default async (app) => {
    await mongooseLoader();
    await koaLoader(app);
}