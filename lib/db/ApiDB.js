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

}

module.exports = ApiDB;
