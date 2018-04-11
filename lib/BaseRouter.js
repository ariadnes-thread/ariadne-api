/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const httpErrors = require('http-errors');
const express = require('express');
const path = require('path');
const Joi = require('joi');

/**
 * @param {ApiConfig} config
 * @return {Router}
 */
const initBaseRouter = config => {

    /**
     * Express Router instance for our base router.
     */
    const router = express.Router({});

    /**
     * Here we add extract methods, properties and other data to the `req` object. Now, every nested
     * router and endpoint can access this data through the `req` object.
     */
    router.use((req, res, next) => {

        /** @type {Logger} */
        req.logger = config.logger;

        /** @type {RoutePlannerClient} */
        req.routePlannerClient = config.routePlannerClient;

        /**
         * This method consolidates data from URI query parameters, post parameters and Express
         * route parameters into one giant object that holds everything - this makes the logic
         * for accessing different parameters simpler.
         *
         * If `template` is specified, `Joi` is used to enforce a particular structure on the
         * resultant data object. As a consequence this method can also be used for validation.
         *
         * @example In the beginning of your Express route definition:
         *
         *     let params = req.prepareParams({
         *         userId: Joi.string().required().guid({version: 'uuidv4'}),
         *         count: Joi.number().required(),
         *         date: Joi.number().required(),
         *     });
         *
         * @template T
         * @param {T} [template]
         * @returns {T}
         */
        req.prepareParams = template => {
            let params = Object.assign({}, req.query, req.params, req.body);
            if (!template) return params;
            let schema = Joi.object().keys(template);
            const result = Joi.validate(params, schema);
            if (result.error) {
                let errorString = result.error.details.map(detail => detail.message).join(', ');
                throw new httpErrors.BadRequest(`Parameter validation error: ${errorString}.`);
            }
            return result.value;
        };

        next();

    });

    /**
     * Serve API documentation from `doc/` directory as website root
     */
    let staticPath = path.normalize(path.join(__dirname, '..', 'doc'));
    router.use(express.static(staticPath));

    /**
     * @api {get} /api Get available API versions
     * @apiVersion 1.0.0
     * @apiName api-versions
     *
     * @apiDescription <strong>No authorisation required.</strong> This endpoint returns the
     * list of available API versions. Each API version is accessed through
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "currentVersion": 1,
     *       "availableVersions": [1]
     *     }
     *
     * @apiGroup API Info
     * @apiSuccess {number} currentVersion The most recent version of the API.
     * @apiSuccess {number[]} availableVersions All available API versions.
     */
    router.get('/api', (req, res) => {
        res.json({
            currentVersion: 1,
            availableVersions: [1],
        });
    });

    // Bootstrap routers for different API versions
    router.use('/api/v1', require('./v1/V1Router')(config));

    return router;
};

module.exports = {initBaseRouter};
