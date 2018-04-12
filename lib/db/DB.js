/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');
const pgPromise = require('pg-promise')({promiseLib: Promise});

class DB {

    /**
     * @param {object} data
     * @param {ApiConfig} data.config
     * @param {string} data.dbUrl
     */
    constructor(data) {
        this.config = data.config;
        this.pgpDb = pgPromise(data.dbUrl);
    }

    checkConnection() {
        return this.pgpDb.query('SELECT 1');
    }

    closeConnection() {
        return this.pgpDb.end();
    }

}

module.exports = DB;
