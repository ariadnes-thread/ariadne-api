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
 * constraints that route planner should take into account. 
 * @apiParamExample {json} Request-Example:
 *
 *       {
 *          "constraints": {
 *              "origin": {
 *                  "longitude": -118.12780,
 *                  "latitude": 34.14175
 *              },
 *              "destination": {
 *                  "longitude": -118.12139,
 *                  "latitude": 34.13612
 *              }
 *          }
 *      }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *{
 *    "route": {
 *        "type": "LineString",
 *        "coordinates": [
 *            [
 *                -118.1280149,
 *                34.141899
 *            ],
 *            [
 *                -118.1259376,
 *                34.1419191
 *            ],
 *            [
 *                -118.1259364,
 *                34.1409536
 *            ]
 *        ]
 *    },
 *    "length": 1261.67188402488
 *}
 *
 * @apiSuccess {object} route A GeoJSON object
 * @apiSuccess {object[]} route.coordinates An array of coordinate objects.
 * @apiSuccess {number} route.coordinates.latitude
 * @apiSuccess {number} route.coordinates.longitude
 * @apiSuccess {number} length Length of route in meters
 */
router.post('/route', (req, res, next) => {
    let params = req.prepareParams({
        constraints: Joi.object().optional(),
    });

    // const points = [
    //     [34.140930, -118.129366],
    //     [34.140947, -118.128010],
    //     [34.140388, -118.128002],
    //     [34.139434, -118.122862],
    // ];
    // const dummyRoute = [];
    // for (const point of points) {
    //     dummyRoute.push({
    //         latitude: point[0],
    //         longitude: point[1],
    //     });
    // }

    let constraints = params.constraints;
    if (!constraints) constraints = {testProperty: 'Hello Wordl!'};

    Promise.resolve()
        .then(() => req.routePlannerClient.planRoute(constraints))
        .then(route => res.json(route))
        .catch(next);
});

/**
 * @apiGroup v1 Planning
 * @apiName planning-points-of-interest
 * @api {get} /api/v1/planning/points-of-interest Get list of points of interest
 *
 * @apiUse v1AuthHeader
 * @apiPermission All authorized users
 * @apiVersion 1.0.0
 *
 * @apiDescription <strong>Authorization required.</strong> Get an array with all points of interest. These points
 * can be used as origin/destination suggestions.
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "pointsOfInterest": [
 *       {
 *          "name":"Pasadena 10",
 *          "latitude":34.140975,
 *          "longitude":-118.1243505
 *       },
 *       {
 *          "name":"Metro",
 *          "latitude":34.138,
 *          "longitude":-118.1211784
 *       },
 *       {
 *          "name":"Olive Tree Condo",
 *          "latitude":34.1399729,
 *          "longitude":-118.1297093
 *       },
 *       {
 *          "name":"Bechtel Mall",
 *          "latitude":34.1368473,
 *          "longitude":-118.127086
 *       }
 *    ]
 * }
 *
 * @apiSuccess {object[]} pointsOfInterest Array of objects representing points of interest
 * @apiSuccess {number} pointsOfInterest.name Human-readable name of the point of interest
 * @apiSuccess {number} pointsOfInterest.latitude
 * @apiSuccess {number} pointsOfInterest.longitude
 */
router.get('/points-of-interest', (req, res, next) => {
    Promise.resolve()
        .then(() => req.gisDb.fetchPointsOfInterest())
        .then(pointsOfInterest => res.json({pointsOfInterest}))
        .catch(error => next(error));
});

module.exports = router;
