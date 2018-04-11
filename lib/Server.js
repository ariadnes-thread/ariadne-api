/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2018
 * @license GPL-3.0
 */

const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const {initBaseRouter} = require('./BaseRouter');

class Server {

    /**
     * @param {ApiConfig} config
     */
    constructor(config) {
        this.config = config;

        this.logger = this.config.logger;
        this.setupExpress();
    }

    setupExpress() {
        /** @var {Express} */
        this.expressApp = express();
        this.expressApp.use(compression());
        this.expressApp.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.expressApp.use(bodyParser.json({limit: '50mb'}));
        this.expressApp.use(cors());

        this.expressApp.use('/', initBaseRouter(this.config));
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        this.expressApp.use((err, req, res, next) => {
            this.logger.error({
                route: req.url,
                method: req.method,
                query: req.query,
                body: req.body,
                params: req.params,
            });
            this.logger.error(err);
            let statusCode = err.statusCode || 500;
            res.status(statusCode);
            let resJson = {
                error: {
                    status: statusCode,
                    name: err.name,
                },
            };

            // TODO: Ideally, 500 error messages should not be exposed to the client. Uncomment the
            //       conditional when when the whole app will be properly unit tested.
            /* if (err.expose) */
            resJson.error.message = err.message;

            if (err.detail) resJson.error.detail = err.detail;
            res.json(resJson);
            next();
        });
    }

    start() {
        return new Promise((resolve, reject) => {
            try {
                /** @type {http.Server} */
                this.httpServer = this.expressApp.listen(this.config.apiPort, () => {
                    resolve(this.config.apiPort);
                });
            } catch (error) {
                reject(error);
            }
        });

    }

    stop() {
        if (this.httpServer) {
            this.httpServer.close();
        }
    }

}

module.exports = Server;
