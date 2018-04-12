/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');

const RoutePlannerClient = require('./RoutePlannerClient');
const Server = require('./Server');
const Util = require('./Util');
const ApiDB = require('./db/ApiDB');
const GisDB = require('./db/GisDB');

class App {

    /**
     * @param {RawApiConfig} rawConfig
     */
    constructor(rawConfig) {
        /** @type {ApiConfig} */
        this.config = Util.validateAppConfig(rawConfig);

        this.logger = Util.createLogger(this.config.appName);
        this.apiDb = new ApiDB(this.config);
        this.gisDb = new GisDB(this.config);

        this.config.logger = this.logger;
        this.config.apiDb = this.apiDb;
        this.config.gisDb = this.gisDb;

        this.routePlannerClient = new RoutePlannerClient(this.config);

        this.config.routePlannerClient = this.routePlannerClient;
        this.server = new Server(this.config);
    }

    start() {
        return Promise.resolve()
            .then(() => this.logger.info('Initialising Route Planner client over gRPC...'))
            .then(() => this.routePlannerClient.connect())
            .then(port => this.logger.info(`Connected gRPC server at port ${port}!`))

            .then(() => this.logger.info('Testing API database connection...'))
            .then(() => this.apiDb.checkConnection())
            .then(() => this.logger.info('Success!'))

            .then(() => this.logger.info('Testing GIS database connection...'))
            .then(() => this.gisDb.checkConnection())
            .then(() => this.logger.info('Success!'))

            .then(() => this.logger.info('Launching API...'))
            .then(() => this.server.start())
            .then(port => this.logger.info(`Server running on port ${port}!`))

            .then(() => this.logger.info('All service are online!'))
            .catch(error => {
                this.logger.error(error);

                this.server.stop();
                this.apiDb.closeConnection();
                this.gisDb.closeConnection();
            });
    }

}

module.exports = App;
