const Koa = require('koa');
const mongoose = require('mongoose');
const database = require('./config/database');

const app = new Koa();

// Connecting to MongoAtlas
mongoose.connect(database.url)
.then(db => console.log("Conectado a MongoAtlas"))
.catch(err => console.log(`Error con mongo ${err}`))

app.use(async ctx => {
    ctx.body = "hello world";
});

app.listen(3000);