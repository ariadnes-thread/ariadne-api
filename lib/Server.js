/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

class Server {

    /**
     * @param {ApiConfig} config
     */
    constructor(config) {
        this.config = config;

        this.logger = this.config.logger;
    }

    start() {
        // TODO: Do actual server initialisation here.
        return Promise.resolve()
            .then(() => this.logger.info(`Server running on port ${this.config.port}!`));
    }

}

module.exports = Server;
