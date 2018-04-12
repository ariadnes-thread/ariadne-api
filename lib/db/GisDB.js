/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const DB = require('./DB');

class GisDB extends DB {

    /**
     * @param {ApiConfig} config
     */
    constructor(config) {
        super({config, dbUrl: config.gisDbUrl});
    }

    fetchPointsOfInterest() {
        return this.pgpDb.manyOrNone(
            'SELECT name, ST_Y(the_geom) as latitude, ST_X(the_geom) as longitude ' +
            'FROM pointsofinterest ' +
            'WHERE name IS NOT NULL'
        );
    }

}

module.exports = GisDB;
