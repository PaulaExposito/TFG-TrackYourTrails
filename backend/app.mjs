import Koa from 'koa'
import loaders from './loaders/index.mjs'
const PORT = 3000

async function startServer() {
    
    const app = new Koa();
    await loaders(app);

    app.listen(PORT, err => {
        if (err)
            console.log(err);
        else
            console.log(`El servidor está listo en el puerto ${PORT}`)
    })
}

startServer();
