/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');
const express = require('express');
const Joi = require('joi');

const router = express.Router({});

/**
 * @apiGroup v1 Planning
 * @apiName planning-route
 * @api {post} /api/v1/planning/route Generate route subject to constraints
 *
 * @apiUse v1AuthHeader
 * @apiPermission All authorized users
 * @apiVersion 1.0.0
 *
 * @apiDescription <strong>Authorization required.</strong> Generate a route subject to specified constraints.
 *
 *
 * @apiParam (POST parameters) {object} constraints An object (collection of key-value pairs) that represent
 * constraints that route planner should take into account. For now constraints are ignored.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "route":[
 *       {
 *          "latitude":34.14093,
 *          "longitude":-118.129366
 *       },
 *       {
 *          "latitude":34.140947,
 *          "longitude":-118.12801
 *       },
 *       {
 *          "latitude":34.140388,
 *          "longitude":-118.128002
 *       },
 *       {
 *          "latitude":34.139434,
 *          "longitude":-118.122862
 *       }
 *    ]
 * }
 *
 * @apiSuccess {object[]} route An array of coordinate objects.
 * @apiSuccess {number} route.latitude
 * @apiSuccess {number} route.longitude
 */
router.post('/route', (req, res, next) => {
    let params = req.prepareParams({
        constraints: Joi.object().optional(),
    });

    // TODO: Add actual route generation here.
    const points = [
        [34.140930, -118.129366],
        [34.140947, -118.128010],
        [34.140388, -118.128002],
        [34.139434, -118.122862],
    ];
    const dummyRoute = [];
    for (const point of points) {
        dummyRoute.push({
            latitude: point[0],
            longitude: point[1],
        });
    }

    Promise.resolve()
        .then(() => res.json({route: dummyRoute}))
        .catch(next);
});

module.exports = router;
