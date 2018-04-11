/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const httpErrors = require('http-errors');
const Promise = require('bluebird');

const DUMMY_ACCESS_TOKEN = 'abcdef';
const DUMMY_USER_DATA = {
    userId: 'dummy-id',
    firstName: 'John',
    lastName: 'Smith',
};

class V1Auth {

    /**
     * @param {ApiConfig} config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Returns an Express middleware that augments `req` object with a reference to V1Auth instance.
     * @returns {Function}
     */
    getHelperMiddleware() {
        if (!this._helperMiddleware) {
            this._helperMiddleware = (req, res, next) => {
                /** @type {V1Auth} */
                req.auth = this;
                next();
            };
        }
        return this._helperMiddleware;
    }

    getAuthMiddleware() {
        if (!this._authMiddleware) {
            this._authMiddleware = (req, res, next) => {
                // Check if `Authorization` header is defined
                let auth = req.get('authorization');
                if (!auth) return next(new httpErrors.Unauthorized('Authorization header is missing!'));

                // Check if the header is following required `Bearer <token>` format
                let parts = auth.split(' ');
                if (parts.length !== 2 || parts[0] !== 'Bearer')
                    return next(new httpErrors.Unauthorized('Authorization header is malformed!'));

                let accessToken = parts[1];
                req.auth.verifyAccessToken(accessToken, req)
                    .then(tokenData => {
                        req.userData = tokenData.userData;
                        next();
                    })
                    .catch(next);
            };
        }
        return this._authMiddleware;
    }

    /**
     * Returns an access token data if authorization is successful, error otherwise.
     *
     * @param {string} username
     * @param {string} password
     * @returns {Promise<TokenData>}
     */
    authenticateUsernameAndPassword(username, password) {
        // TODO: For now, this will just let anyone through. Replace this with actual Auth later.
        return Promise.resolve({
            accessToken: DUMMY_ACCESS_TOKEN,
            userData: DUMMY_USER_DATA,
        });
    }

    /**
     * Returns a promise that return access token data if the token is valid, or rejects with an error otherwise.
     *
     * @param {string} token
     * @param {Request} req Instance of Express.Request object containing data about the request.
     * @returns {Promise<TokenData>}
     */
    verifyAccessToken(token, req) {
        // TODO: This will just let anyone through. Replace this with actual token verfication.
        return Promise.resolve({
            accessToken: DUMMY_ACCESS_TOKEN,
            userData: DUMMY_USER_DATA,
        });
    }

}

module.exports = V1Auth;
