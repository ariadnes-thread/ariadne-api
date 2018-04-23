/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const DB = require('./DB');

class ApiDB extends DB {

    /**
     * @param {ApiConfig} config
     */
    constructor(config) {
        super({config, dbUrl: config.apiDbUrl});
    }

    /**
     * @param {object} data
     * @param {string} data.passwordHash
     * @param {string} data.firstName
     * @param {string} data.lastName
     * @param {string} data.email
     * @returns {Promise.<object>}
     */
    createStaffUser(data) {
        const values = [data.passwordHash, data.firstName, data.lastName, data.email];
        return this.pgpDb.one('INSERT INTO users (ariadne_password_hash, first_name, last_name, email)' +
            ' VALUES($1, $2, $3, $4) RETURNING *', values);
    }

    /**
     * @param {object} data
     * @param {string} data.id
     * @returns {Promise.<object>}
     */
    findUserById(data) {
        return this.pgpDb.oneOrNone('SELECT * FROM users WHERE ariadne_id = $1 LIMIT 1', [data.id]);
    }

    /**
     * @param {object} data
     * @param {string} data.email
     * @returns {Promise.<object>}
     */
    findUserByEmail(data) {
        return this.pgpDb.oneOrNone('SELECT * FROM users WHERE email = $1 LIMIT 1', [data.email]);
    }

}

module.exports = ApiDB;
