/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');

const RoutePlannerClient = require('./RoutePlannerClient');
const Server = require('./Server');
const Util = require('./Util');

class App {

    /**
     * @param {RawApiConfig} rawConfig
     */
    constructor(rawConfig) {
        /** @type {ApiConfig} */
        this.config = Util.validateAppConfig(rawConfig);
        this.logger = Util.createLogger(this.config.appName);

        this.config.logger = this.logger;
        this.routePlannerClient = new RoutePlannerClient(this.config);

        this.config.routePlannerClient = this.routePlannerClient;
        this.server = new Server(this.config);
    }

    start() {
        return Promise.resolve()
            .then(() => this.logger.info('Connecting to RoutePlanner over gRPC...'))
            .then(() => this.routePlannerClient.connect())
            .then(port => this.logger.info(`Connected over gRPC at port ${port}!`))
            .then(() => this.logger.info('Launching API...'))
            .then(() => this.server.start())
            .then(port => this.logger.info(`Server running on port ${port}!`))
            .then(() => this.logger.info('API is online!'))
            .catch(error => {
                this.logger.error(error);
                this.server.stop();
            });
    }

}

module.exports = App;
