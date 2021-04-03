import Koa from 'koa'
import loaders from './loaders/index.mjs'

async function startServer() {
    
    const app = new Koa();
    await loaders(app);

    app.listen(3000, err => {
        if (err)
            console.log(err);
        else
            console.log('El servidor está listo')
    })
}

startServer();
