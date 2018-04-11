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
 * @api {post} /api/v1/auth/staff-login Generate staff access token
 * @apiVersion 1.0.0
 * @apiGroup v1 Auth
 * @apiName auth-staff-token
 *
 * @apiDescription <strong>No authorization required.</strong> Authorize a staff user using a username and a password.
 *
 *
 * @apiParam (POST parameters) {string} username
 * @apiParam (POST parameters) {string} password
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": "12345678910",
 *       "userData": {
 *         "userId": "12345678910",
 *         "firstName": "John",
 *         "lastName": "Smith"
 *       }
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "status": 400,
 *         "name": "BadRequestError",
 *         "message": "Parameter validation error: \"username\" is required."
 *       }
 *     }
 *
 * @apiSuccess {string} accessToken Fizzyo API access token needed for subsequent requests.
 * @apiSuccess {object} user Basic user data
 * @apiSuccess {string} user.userId
 * @apiSuccess {string} user.firstName
 * @apiSuccess {string} user.lastName
 */
router.post('/staff-login', (req, res, next) => {
    let params = req.prepareParams({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });

    Promise.resolve()
        .then(() => req.auth.authenticateUsernameAndPassword(params.username, params.password))
        .then(tokenData => res.json(tokenData))
        .catch(next);
});

module.exports = router;
