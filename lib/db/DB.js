/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');
const pgPromiseRaw = require('pg-promise');

// The 2 functions below convert `snake_case` rows returned from the database into `camelCase`.
const camelize = (string) => string.replace(/_[a-z]/g, match => match[1].toUpperCase());
const camelizeColumns = (data) => {
    const template = data[0];
    for (let prop in template) {
        if (!template.hasOwnProperty(prop)) continue;
        const camel = camelize(prop);
        if (!(camel in template)) {
            for (let i = 0; i < data.length; i++) {
                let d = data[i];
                d[camel] = d[prop];
                delete d[prop];
            }
        }
    }
};
const pgPromise = pgPromiseRaw({promiseLib: Promise, receive: data => camelizeColumns(data)});

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
