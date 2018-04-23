/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const httpErrors = require('http-errors');
const Promise = require('bluebird');
const express = require('express');
const Joi = require('joi');

const V1Auth = require('../V1Auth');

const router = express.Router({});

/**
 * @apiGroup v1 Users
 * @apiName users-profile
 * @api {get} /api/v1/users/<userId>/profile Get user profile
 *
 * @apiUse v1AuthHeader
 * @apiPermission Owner of the profile
 * @apiVersion 1.0.0
 *
 * @apiDescription <strong>Authorization required.</strong> Get basic information about the user. You can only fetch
 * your own profile.
 *
 *
 * @apiParam (GET parameters) {string} userId ID of the user whose profile you want to fetch.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userData": {
 *         "userId": "abcdefgh-1234-5678-9101-qwert12345xy",
 *         "firstName": "John",
 *         "lastName": "Smith"
 *         "email": "john@example.com"
 *       }
 *     }
 *
 * @apiSuccess {object} userData Basic user data
 * @apiSuccess {string} userData.userId
 * @apiSuccess {string} userData.firstName
 * @apiSuccess {string} userData.lastName
 * @apiSuccess {string} userData.email
 */
router.get('/:userId/profile', (req, res, next) => {
    let params = req.prepareParams({
        userId: Joi.string().email().required(),
    });

    Promise.resolve()
        .then(() => {
            if (!req.isSelf(params.userId)) throw new httpErrors.Forbidden('You can only fetch your own profile.');
        })
        .then(() => req.apiDb.findUserById({id: params.userId}))
        .then(user => {
            if (!user) throw new httpErrors.NotFound('User with this ID does not exist!');

            return V1Auth.prepareUserData(user);
        })
        .then(userData => res.json({userData}))
        .catch(next);
});

module.exports = router;
