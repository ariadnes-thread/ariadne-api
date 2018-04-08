/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const Promise = require('bluebird');

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
        this.server = new Server(this.config);
    }

    start() {
        // TODO: Do actual app initialisation here.
        return Promise.resolve()
            .then(() => this.logger.info('Launching API...'))
            .then(() => this.server.start())
            .then(() => this.logger.info('API is online!'))
            .catch(error => this.logger.error(error));
    }

}

module.exports = App;
