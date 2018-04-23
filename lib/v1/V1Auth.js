/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const httpErrors = require('http-errors');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


class V1Auth {

    /**
     * @param {ApiConfig} config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Returns an Express middleware that augments `req` object with a reference to V1Auth instance and some useful
     * helper methods.
     * @returns {Function}
     */
    getHelperMiddleware() {
        if (!this._helperMiddleware) {
            this._helperMiddleware = (req, res, next) => {

                /** @type {V1Auth} */
                req.auth = this;

                /**
                 * Check if the provided ID is equivalent to the ID of the currently authorised user.
                 *
                 * @param userId
                 * @returns {boolean}
                 */
                req.isSelf = userId => {
                    if (!req.userData || !req.userData.userId)
                        throw new httpErrors.Unauthorized('Server expected user to be authorized. Possible server' +
                            ' misconfiguration?');
                    return req.userData.userId === userId;
                };

                next();
            };
        }
        return this._helperMiddleware;
    }

    /**
     * @apiDefine v1AuthHeader
     * @apiHeader (Required headers) {string} Authorization Authorization header of form `Bearer <accessToken>`.
     */
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
                        // `tokenData` available is actually freshly-fetched from the database, so we don't
                        // care if the actual access taken had outdated information about the user.
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
     * @param {string} email
     * @param {string} password
     * @returns {Promise.<TokenData>}
     */
    authenticateStaffUser(email, password) {
        return Promise.resolve()
            .then(() => this.config.apiDb.findUserByEmail({email}))
            .then(user => {
                if (!user) throw new httpErrors.NotFound('User with that email was not found!');

                const hashValid = V1Auth.verifyHash(password, user.ariadnePasswordHash);
                if (!hashValid) throw new httpErrors.Unauthorized('Incorrect password.');

                return this.prepareAccessTokenData(user);
            });
    }

    /**
     * @param {object} user User object returned from the database
     * @returns {TokenData}
     */
    prepareAccessTokenData(user) {
        const userData = V1Auth.prepareUserData(user);
        return {
            accessToken: jwt.sign(userData, this.config.appSecret),
            userData,
        };
    }

    /**
     * This method is used by some user-facing endpoints (e.g. `/v1/users/.../profile`), make sure to not expose any
     * sensitive information here.
     *
     * @param {object} user User object returned from the database
     * @returns {UserData}
     */
    static prepareUserData(user) {
        return {
            userId: user.ariadneId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }

    /**
     * Returns a promise that return access token data if the token is valid, or rejects with an error otherwise.
     *
     * @param {string} token
     * @param {Request} req Instance of Express.Request object containing data about the request.
     * @returns {Promise.<TokenData>}
     */
    verifyAccessToken(token, req) {
        // Ideally, `req` should be used for some sort of "fingerprinting" of the request. For now we're just gonna
        // perform a trivial check.
        if (!req.get('User-Agent')) return Promise.reject(new httpErrors.BadRequest('User agent is not defined!'));

        return new Promise((resolve, reject) => {
            try {
                /** @type {UserData} */
                const userData = jwt.verify(token, this.config.appSecret);
                Promise.resolve()
                    .then(() => this.config.apiDb.findUserById({id: userData.userId}))
                    .then(user => {
                        if (!user) throw new httpErrors.NotFound('Access token references a non-existing user!');

                        resolve(this.prepareAccessTokenData(user));
                    })
                    .catch(reject);
            } catch (error) {
                reject(new httpErrors.Unauthorized('Access token is invalid!'));
            }
        });
    }

    /**
     * @param {string} password
     * @returns {string} Hash salt and the password hash, separated with a `$`
     */
    static hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');
        return [salt, hash].join('$');
    }

    /**
     * @param {string} password
     * @param {string} original String generated by `hashPassword()` method, of form `<salt>$<hash>`
     * @returns {boolean}
     */
    static verifyHash(password, original) {
        const [salt, originalHash] = original.split('$');
        const hash = crypto.pbkdf2Sync(password, salt, 2048, 32, 'sha512').toString('hex');

        return hash === originalHash;
    }


}

module.exports = V1Auth;
