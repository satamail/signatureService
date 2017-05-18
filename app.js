'use strict';

const Koa = require('koa');
const app = new Koa();
const cors = require('koa-cors');
const api = require('./api/api');


app.use(cors({
    credentials: true,
    headers: ['Content-Type']
}));
app.use(api.routes());

app.listen(9900);
