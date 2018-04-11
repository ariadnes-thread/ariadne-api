/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const express = require('express');

const V1Auth = require('./V1Auth');

/**
 * @param {ApiConfig} config
 * @return {Router}
 */
const initV1Router = config => {

    const auth = new V1Auth(config);
    const router = express.Router({});


    // Augment `req` object with references to V1Auth instance
    router.use(auth.getHelperMiddleware());

    // Setup all v1 routers
    router.use('/auth', require('./routers/AuthRouter'));

    return router;
};

module.exports = initV1Router;
