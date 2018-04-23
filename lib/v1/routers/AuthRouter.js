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
 * @apiSampleRequest /api/v1/auth/staff-login
 *
 * @apiDescription <strong>No authorization required.</strong> Authorize a staff user using a email and a password.
 *
 *
 * @apiParam (POST parameters) {string} email
 * @apiParam (POST parameters) {string} password
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "accessToken": "eyJhbGciOiJIUzI1NiIsICJ9.eyJzdWIiOiIxMjM0NTY3OSI6IkpvE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922o",
 *       "userData": {
 *         "userId": "abcdefgh-1234-5678-9101-qwert12345xy",
 *         "firstName": "John",
 *         "lastName": "Smith"
 *         "email": "john@example.com"
 *       }
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "status": 400,
 *         "name": "BadRequestError",
 *         "message": "Parameter validation error: \"email\" is required."
 *       }
 *     }
 *
 * @apiSuccess {string} accessToken Fizzyo API access token needed for subsequent requests.
 * @apiSuccess {object} user Basic user data
 * @apiSuccess {string} user.userId
 * @apiSuccess {string} user.firstName
 * @apiSuccess {string} user.lastName
 * @apiSuccess {string} user.email
 */
router.post('/staff-login', (req, res, next) => {
    let params = req.prepareParams({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    Promise.resolve()
        .then(() => req.auth.authenticateStaffUser(params.email, params.password))
        .then(tokenData => res.json(tokenData))
        .catch(next);
});

module.exports = router;
