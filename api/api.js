'use strict';

const crypto = require('crypto');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const apiRouter = new Router();

apiRouter.post('/sign', bodyParser(), function *() {
    let {pKey, requestBody, requestRawBody} = this.request.body;

    if (!pKey) {
        this.status = 400;
        this.body = {
            message: '"pKey" required string'
        };
        return;
    }

    if (typeof pKey !== 'string') {
        this.status = 400;
        this.body = {
            message: '"pKey" should be string'
        };
    }

    if (!requestBody) {
        this.status = 400;
        this.body = {
            message: '"requestBody" required object'
        };
        return;
    }

    if (typeof requestBody !== 'object') {
        this.status = 400;
        this.body = {
            message: '"requestBody" should be an object'
        };
    }

    if (!requestRawBody) {
        this.status = 400;
        this.body = {
            message: '"requestRawBody" required object'
        };
        return;
    }

    if (typeof requestRawBody !== 'object') {
        this.status = 400;
        this.body = {
            message: '"requestRawBody" should be an object'
        };
    }

    if (requestRawBody && requestBody) {
        this.status = 400;
        this.body = {
            message: 'Only one "requestBody" or "requestRawBody" should be specified'
        };
    }

    requestBody = requestBody || requestRawBody;

    if (typeof requestBody !== 'string') {
        requestBody = JSON.stringify(requestBody);
    }
    this.body = {
        'x-signature': crypto.createSign('RSA-SHA256').update(requestBody).sign(pKey, 'base64')
    };
});

module.exports = apiRouter;
